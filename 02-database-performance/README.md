# Database Performance

- Index

### Index

- Indexes improve query performance by allowing the database to quickly locate rows instead of scanning the entire table.
- When you create an index on a column, the database can use it to avoid full table scans for matching queries.
- You can use EXPLAIN ANALYZE to inspect how a query is executed and determine whether the database is using an index or performing a full table scan.

```sql
EXPLAIN ANALYZE SELECT * FROM products WHERE id = 'some-uuid';
```

✅ Index Scan → Fast, index is used.
❌ Seq Scan → Slow, full table scan.
