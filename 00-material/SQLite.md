# SQLite

<details>
<summary>Index</summary>

## Index

- Introduction
- DDL (Data Definition Language)
- DML (Data Manipulation Language)
- DQL (Data Query Language)
- Filter
- Aggregations
- Alias
- Expressions
- SQL Functions
- CASE
- SET Operators
- Relational Database
- JOINS
- SubQueries
- Practice
- Documentation

</details>

---

<details>
<summary>Introduction</summary>

## Introduction

- **SQL** stands for **Structured Query Language**
- **DBMS** stands for **Database Management System**
- SQL is used to perform operations on Relational DBMS.
- Relational Database stores the data in the form of Tables.
- SQL provides multiple commands to perform various operations like `create`, `read`, `update` and `delete` the data.
- DBMS is a software that allows users to create, manage, and manipulate databases efficiently.
- DBMS Examples: `SQLite`, `MySQL`, and `PostgreSQL`

</details>

---

<details>
<summary>DDL (Data Definition Language)</summary>

## DDL (Data Definition Language)

- **DDL** stands for **Data Definition Language**
- DDL commands are used to define and manage database tables and table_indexes.
- DDL commands create, modify, and delete database tables and table_indexes but do not work directly with data
- Example : `CREATE`, `ALTER`, `DROP`
  1. **CREATE** : Used to create tables and indexes.
  2. **ALTER** : Modifies the structure of an existing table, for example, by adding or removing columns in a table.
  3. **DROP** : Deletes an entire database table or table_index.

### 1. CREATE TABLE

The CREATE TABLE command is used to create a table and define the type of data each column will store.

```sql
CREATE TABLE player(
    name VARCHAR(200),
    age INTEGER,
    score INTEGER
);
```

| Data Type | Description                                                                    |
| --------- | ------------------------------------------------------------------------------ |
| INTEGER   | Represents whole numbers without decimal points.                               |
| FLOAT     | Represents approximate numeric values with decimal points.                     |
| BOOLEAN   | Represents true or false values.                                               |
| VARCHAR   | Stores text data with a maximum length limit specified.                        |
| TEXT      | Stores large amounts of textual data.                                          |
| DATE      | Represents a date (year, month, and day).                                      |
| TIME      | Represents a time of day (hours, minutes, seconds, and fractions of a second). |
| DATETIME  | Represents a combination of date and time.                                     |

### 2. CREATE INDEX

- An **index** is used to speed up data reading from a table.
- It’s usually added to columns that are often searched or filtered.

```sql
CREATE INDEX idx_player_score ON player(score);
```

Example : Contacts App Analogy

- Without Index: Scrolling through all contacts to find a name.
- With Index: Tapping the first letter (e.g., “B”) to jump directly to names starting with "B".

Example : query plan

```sql
EXPLAIN ANALYZE SELECT * FROM products WHERE id = '34a4473c-52fc-41d5-ab59-c0d5e0035409';
```

### 3. ALTER Table

- `ALTER Table` clause is used to **add**, **delete**, or **modify** columns in an existing table.

```sql
ALTER TABLE
   player
ADD
   jersey_num INT
```

```sql
ALTER TABLE
    player RENAME COLUMN jersey_num TO jersey_number;
```

```sql
ALTER TABLE
    player DROP COLUMN jersey_num;
```

### DROP

- `DROP` clause is used to delete a table from the database.

```sql
DROP TABLE player;
```

</details>

---

<details>
<summary>DML (Data Manipulation Language)</summary>

## DML (Data Manipulation Language)

- **DML** stands for **Data Manipulation Language**
- DML is used to insert, update, and delete data in database tables.
- Example : `INSERT`, `UPDATE`, `DELETE`
  - **INSERT** : adds new rows to a table.
  - **UPDATE** : modifies existing data in table rows.
  - **DELETE** : deletes existing rows from a table.

### 1. INSERT

It is used to insert a row into table

```sql
INSERT INTO
     player(name, age, score)
VALUES
     ("Praveen", 29, 35),
     ("Sai", 28, 30);
```

#### 2. UPDATE

Modifying existing data in a table rows.

```sql
-- Update All Rows
UPDATE
    player
SET
    score = 100;
```

```sql
-- Update Specific Rows
UPDATE
    player
SET
   score = 150
WHERE
   name = "Praveen";
```

#### DELETE

deleting existing rows data from a table.

```sql
-- delete all rows
DELETE FROM
    player;
```

```sql
-- delete specific rows

DELETE FROM
    player
WHERE
    name = "Praveen";
```

</details>

---

<details>
<summary>DQL (Data Query Language)</summary>

## DQL (Data Query Language)

- **DQL** stands for **Data Query Language**
- DQL is used to read data from the database.
- DQL is used to query the database and return requested data.
- Example : `SELECT`
  - **SELECT** : Fetches data from a database table.
  - Additional Features: **Filter**, **Order**

### SELECT

```sql
-- read all columns
SELECT *
FROM player;
```

```sql
-- read specific columns
SELECT
     name,
     age
FROM
     player;
```

```sql
-- read specific row
SELECT *
FROM player
WHERE name = "Praveen";
```

### Filter

1. WHERE
2. ORDER BY

#### 1. WHERE

- Ascending order or Descending order.

```sql
SELECT
  *
FROM
  player
WHERE
  name = "Praveen";
```

#### 2. ORDER BY

- Ascending order or Descending order.

```sql
SELECT
  *
FROM
  player
WHERE
  name = "Praveen"
ORDER BY
  score ASC,
  age DESC;
```

### Pagination

1. LIMIT
2. OFFSET

#### 1. LIMIT

**LIMIT** is used to get a specific number of rows from the result.

```sql
SELECT
  *
FROM
  player
LIMIT 2;
```

#### 2. OFFSET

**OFFSET** is used to skip a number of rows before starting to return the results.

```sql
SELECT
  *
FROM
  player
OFFSET 3;
```

</details>

---

<details>
<summary>Filter</summary>

## Filter

In databases, filtering means showing only the rows that match certain conditions. We usually do this using the **WHERE** clause in SQL.

1. Comparison
2. String Search
3. Logical

### Comparison Operators

- `__=__` Equal to
- `__<>__` Not Equal to
- `__<__` Less than
- `__>__` Greater than
- `__<=__` Less than or Equal to
- `__>=__` Greater than or Equal to

```sql
  SELECT *
  FROM player
  WHERE age > 20;
```

### String Search

- **LIKE** Operator is used to perform queries on strings that match the given pattern.

| Symbol           | Description                        | Example                          |
| ---------------- | ---------------------------------- | -------------------------------- |
| Percent sign (%) | Represents zero or more characters | ch% finds ch, chips, chocolate.. |
| Underscore (\_)  | Represents a single character      | \_at finds mat, hat, and bat     |

| Pattern          | Example                       | Description                                                                           |
| ---------------- | ----------------------------- | ------------------------------------------------------------------------------------- |
| Exact Match      | `WHERE name LIKE "mobiles"`   | Retrieves products whose name is exactly equal to "mobiles"                           |
| Starts With      | `WHERE name LIKE "mobiles%"`  | Retrieves products whose name starts with "mobiles"                                   |
| Ends With        | `WHERE name LIKE "%mobiles"`  | Retrieves products whose name ends with "mobiles"                                     |
| Contains         | `WHERE name LIKE "%mobiles%"` | Retrieves products whose name contains "mobiles" anywhere within it                   |
| Pattern Matching | `WHERE name LIKE "a_%"`       | Retrieves products whose name starts with "a" and has at least 2 characters in length |

```sql
SELECT
  *
FROM
  player
WHERE
  name LIKE "Praveen";
```

```sql
SELECT
  *
FROM
  product
WHERE
  name LIKE "%ve%";
```

Get all the players which have exactly 5 characters in brand from the player table.

```sql
SELECT
  *
FROM
  product
WHERE
  name LIKE "_____";
```

### Logical Operators

- with logical operators, we can combine multiple conditions.

1. AND
2. OR
3. NOT

| Operator | Description                                                           |
| -------- | --------------------------------------------------------------------- |
| AND      | Used to fetch rows that satisfy two or more conditions.               |
| OR       | Used to fetch rows that satisfy at least one of the given conditions. |
| NOT      | Used to negate a condition in the WHERE clause.                       |

```sql
SELECT
  *
FROM
  player
WHERE
  age = 27
  AND score <= 50;
```

```sql
-- Ignore all the players with name containing "%ven%" from the rows of player.
SELECT
  *
FROM
  player
WHERE
  NOT name LIKE "%ven%";
```

![Logical Operators](./assets/logical-operators.png)

```sql
SELECT
  *
FROM
  player
WHERE
  age = 27
  AND score > 40
  OR name LIKE "%ven%";
```

Above query is equal to below code

```sql
SELECT
    *
FROM
    product
WHERE
    (age = 27
  AND score > 40)
    OR name LIKE "%ven%";
```

### IN operator

Retrieves the corresponding rows from the table if the value of column(c1) is present in the given values(v1,v2,..).
![IN Operator](./assets/in-operator.png)

```sql
SELECT
  *
FROM
  player
WHERE
  brand IN ( 25, 26, 27, 30);
```

### BETWEEN Operator

Retrieves all the rows from table that have cloumn(c1) value present between the given range(v1 and v2).
![BETWEEN Operator](./assets/between_operator.png)

```sql
SELECT
  *
FROM
  product
WHERE
  age BETWEEN 20
  AND 30;
```

Note : When using the BETWEEN operator, the first value should be less than second value. If not, we'll get an incorrect result depending on the DBMS.

</details>

---

<details>
<summary>Aggregations</summary>

## Aggregations

### Aggregation Functions

Combining multiple values into a single value is called aggregation.

| Aggregate Function | Description                          |
| ------------------ | ------------------------------------ |
| COUNT              | Counts the number of values          |
| SUM                | Adds all the values                  |
| MIN                | Returns the minimum value            |
| MAX                | Returns the maximum value            |
| AVG                | Calculates the average of the values |

![Aggregation SUM](./assets/aggregation_sum.gif)

```sql
SELECT
  SUM(score)
FROM
  player_match_details
WHERE
  name = "Ram";
```

```sql
SELECT
  MAX(score),
  MIN(score)
FROM
  player_match_details
WHERE
  year = 2011;
```

```sql
 SELECT COUNT(*)
 FROM player_match_details;
```

</details>

---

<details>
<summary>Alias</summary>

## Alias

Using the keyword `AS`, we can provide alternate temporary names to the columns in the output.

```sql
SELECT
  name AS player_name
FROM
  player;
```

</details>

---

<details>
<summary>Expressions</summary>

## Expressions

### Using Expressions in SELECT Clause

```sql
SELECT
    id, name, (collection_in_cr-budget_in_cr) as profit
FROM
    movie;
```

### Using Expressions in WHERE Clause

```sql
SELECT
   *
FROM
   movie
WHERE
   (collection_in_cr - budget_in_cr) >= 50;
```

### Using Expressions in UPDATE Clause

```sql
UPDATE movie
SET rating = rating/2;
```

### Expressions in HAVING Clause

```sql
SELECT
  genre
FROM
  movie
GROUP BY
  genre
HAVING
  AVG(collection_in_cr - budget_in_cr) >= 100;
```

</details>

---

<details>
<summary>SQL Functions</summary>

## SQL Functions

### 1. String Functions

String functions in SQL are used to manipulate and operate on string values or character data.

| SQL Function | Behavior                        |
| ------------ | ------------------------------- |
| UPPER()      | Converts a string to upper case |
| LOWER()      | Converts a string to lowercase  |

```sql
SELECT
  name
FROM
  movie
WHERE
  UPPER(name) LIKE UPPER("%avengers%");
```

</details>

---

<details>
<summary>CASE</summary>

## CASE Clause

- SQL provides **CASE** clause to perform conditional operations. This is similar to the switch case / if-else conditions in other programming languages.

```sql
SELECT id, name,
  CASE
    WHEN collection_in_cr - budget_in_cr <= 100 THEN collection_in_cr - budget_in_cr * 0.1
    WHEN (collection_in_cr - budget_in_cr > 100
    AND collection_in_cr - budget_in_cr < 500) THEN collection_in_cr - budget_in_cr * 0.15
    ELSE collection_in_cr - budget_in_cr * 0.18
  END AS tax_amount
FROM
  movie;
```

</details>

---

<details>
<summary>SET Operators</summary>

## SET Operators

The SQL Set operation is used to combine the two or more SQL queries.

1. INTERSECT
2. MINUS
3. UNION
4. UNION ALL

```sql
SELECT actor_id
FROM cast
WHERE movie_id=6

INTERSECT

SELECT actor_id
FROM cast
WHERE movie_id=15;
```

```sql
SELECT actor_id
FROM cast
WHERE movie_id=6

EXCEPT

SELECT actor_id
FROM cast
WHERE movie_id=15;
```

```sql
SELECT actor_id
FROM cast
WHERE movie_id=6

UNION

SELECT actor_id
FROM cast
WHERE movie_id=15
ORDER BY 1 DESC;
```

</details>

---

<details>
<summary>Relational Database</summary>

## Relational Database

### Customer Table

```sql
CREATE TABLE customer (
   id INTEGER NOT NULL PRIMARY KEY,
   name VARCHAR(250),
   age INT
);
```

### Product Table

```sql
CREATE TABLE product (
  id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(250),
  price INT,
  brand VARCHAR(250),
  category VARCHAR(250)
);
```

### Cart Table

```sql
CREATE TABLE cart(
  id INTEGER NOT NULL PRIMARY KEY,
  customer_id INTEGER NOT NULL UNIQUE,
  total_price INTEGER,
  FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE
);
```

### cart_product Table (Junction Table)

```sql
CREATE TABLE cart_product(
  id INTEGER NOT NULL PRIMARY KEY,
  cart_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);
```

</details>

---

<details>
<summary>JOINS</summary>

## JOINS

JOINS are used to combining the tables.

### Natural JOIN

`NATURAL JOIN` combines the tables based on the common columns.

![NATURAL JOIN](./assets/natural_join.gif)

```sql
SELECT course.name,
  instructor.full_name
FROM course
  NATURAL JOIN instructor
WHERE instructor.full_name = "Alex";
```

### INNER JOIN

`INNER JOIN` combines rows from both the tables if they meet a specified condition.

![INNER JOIN](./assets/inner_join.gif)

```sql
SELECT student.full_name,
   review.content,
   review.created_at
FROM
   student INNER JOIN review
       ON student.id = review.student_id
WHERE review.course_id = 15;
```

### LEFT JOIN

In `LEFT JOIN`, for each row in the left table, matched rows from the right table are combined. If there is no match, NULL values are assigned to the right half of the rows in the temporary table.

![LEFT JOIN](./assets/left_join.gif)

```sql
SELECT student.full_name
FROM
    student LEFT JOIN student_course
        ON student.id = student_course.student_id
WHERE student_course.id IS NULL;
```

### Joins on Multiple Tables

We can also perform join on a combined table.

```sql
SELECT T.name AS course_name,
   student.full_name
FROM
    (course INNER JOIN student_course
         ON course.id = student_course.course_id) AS T
    INNER JOIN student
         ON T.student_id = student.id
WHERE course.instructor_id = 102;
```

### RIGHT JOIN

`RIGHT JOIN` or `RIGHT OUTER JOIN` is vice versa of LEFT JOIN.
I.e., in RIGHT JOIN, for each row in the right table, matched rows from the left table are combined. If there is no match, NULL values are assigned to the left half of the rows in the temporary table.

![RIGHT JOIN](./assets/right_join.gif)

```sql
SELECT course.name,
    instructor.full_name
FROM
    course RIGHT JOIN instructor
        ON course.instructor_id = instructor.instructor_id;
```

### FULL JOIN

`FULL JOIN` or `FULL OUTER JOIN` is the result of both RIGHT JOIN and LEFT JOIN

![FULL JOIN](./assets/full-join.gif)

```sql
SELECT course.name,
    instructor.full_name
FROM
    course FULL JOIN instructor
       ON course.instructor_id = instructor.instructor_id;
```

### CROSS JOIN

In `CROSS JOIN`, each row from the first table is combined with all rows in the second table.
Cross Join is also called as CARTESIAN JOIN

![CROSS JOIN](./assets/cross_join.gif)

```sql
SELECT
    course.name AS course_name,
    instructor.full_name AS instructor_name
FROM
    course CROSS JOIN instructor;
```

### SELF JOIN

So far, we have learnt to combine different tables. We can also combine a table with itself. This kind of join is called SELF-JOIN.

```sql
SELECT sc1.student_id AS student_id1,
  sc2.student_id AS student_id2, sc1.course_id
FROM
   student_course AS sc1
   INNER JOIN student_course AS sc2 ON sc1.course_id = sc2.course_id
WHERE
    sc1.student_id < sc2.student_id;
```

### Summary

| Join Type    | Use Case                                                                     |
| ------------ | ---------------------------------------------------------------------------- |
| Natural Join | Joins based on common columns                                                |
| Inner Join   | Joins based on a given condition                                             |
| Left Join    | Retrieves all rows from the left table and matched rows from the right table |
| Right Join   | Retrieves all rows from the right table and matched rows from the left table |
| Full Join    | Retrieves all rows from both tables                                          |
| Cross Join   | Generates all possible combinations of rows from both tables                 |

</details>

---

<details>
<summary>SubQueries</summary>

## SubQueries

We can write nested queries, i.e., a query inside another query.

```sql
SELECT
   name,
   (
       SELECT AVG(rating)
       FROM product
       WHERE category = "WATCH"
   ) - rating AS rating_variance
FROM product
WHERE category = "WATCH";
```

```sql
SELECT
  order_id
FROM
  order_details
WHERE
  order_id IN (
    SELECT
      order_id
    FROM
      order_product
    WHERE
      product_id IN (291, 292, 293, 294, 296)
  )
  AND NOT order_id IN (
    SELECT
      order_id
    FROM
      order_product
    WHERE
      product_id IN (227, 228, 229, 232, 233)
  );
```

</details>

---

<details>
<summary>Practice</summary>

## Practice

```sql
-- 01 create table
-- CREATE TABLE mytable(
--     id INTEGER NOT NULL PRIMARY KEY,
--     name VARCHAR(200),
--     place VARCHAR(200),
--     salary INTEGER
-- );

-- 02 insert data
-- INSERT INTO
--     mytable(id, name, place, salary)
--     VALUES(1, "Praveen", "Hyderabad", 50000),
--           (2, "Navya", "Bangalore", 80000),
--           (3, "Swathi", "Chennai", 70000);

-- 03 select

-- all columns
-- SELECT * FROM mytable;

-- specific column
-- SELECT name FROM mytable;

-- specific row
-- SELECT name
-- FROM mytable
-- WHERE name LIKE "Praveen";

-- 04 update

-- update all rows
-- UPDATE mytable
-- SET salary = 40000;

-- update specific row
-- UPDATE mytable
-- SET salary = 80000
-- WHERE name LIKE "Praveen";

-- delete

-- delete all rows
-- DELETE FROM mytable;

-- delete specific row
-- DELETE FROM mytable
-- WHERE name LIKE "Navya";

-- drop

-- DROP TABLE mytable;

--  order
-- SELECT *
-- FROM mytable
-- ORDER BY
--     salary DESC;

-- pagination
-- SELECT *
-- FROM mytable
-- ORDER BY
--     salary DESC
-- LIMIT 1
-- OFFSET 1;
```

</details>

---

<details>
<summary>Documentation</summary>

## Documetation

- Official Documentation : [https://www.sqlite.org/docs.html]
</details>

---
