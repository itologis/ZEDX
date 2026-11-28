// Lessons for the SQL track. Same shape as the other language tracks.

export default {
  sql1: [
    {
      title: "Selecting columns",
      body: [
        `[[SELECT]] names the columns and [[FROM]] names the table. The result has one row per matching record and one column per expression.`,
        `List only what you need. The database reads less, the network carries less, and the result is easier to reason about.`,
      ],
      example: {
        code: `SELECT name, email
FROM users;`,
        caption: `Two columns, every row.`,
      },
      wrong: {
        code: `SELECT names, email
FROM users;`,
        why: `names is not a column in the table, so the database reports "no such column". Check the schema before guessing.`,
      },
    },
    {
      title: "Aliases and expressions",
      body: [
        `[[AS]] renames a column in the result. It does not rename the underlying column.`,
        `An alias with spaces or reserved words needs quoting: [[AS "total price"]].`,
      ],
      example: {
        code: `SELECT price * quantity AS total
FROM order_items;`,
        caption: `An expression with a readable name.`,
      },
      wrong: {
        code: `SELECT price * quantity AS total price
FROM order_items;`,
        why: `Without quotes the parser reads two aliases, so the statement is a syntax error. Use [[AS "total price"]].`,
      },
    },
    {
      title: "SELECT without a table",
      body: [
        `SQL can evaluate expressions without reading a table. [[SELECT 1 + 1;]] returns one row with the value 2.`,
        `[[SELECT *]] needs a FROM clause; the star means "all columns of that table".`,
      ],
      example: {
        code: `SELECT 1 + 1 AS result;`,
        caption: `A quick calculation, no table.`,
      },
      wrong: {
        code: `SELECT *;`,
        why: `There is no table to expand the star from, so the statement fails. Add a FROM clause.`,
      },
    },
  ],

  sql2: [
    {
      title: "Filtering rows",
      body: [
        `[[WHERE]] keeps only the rows where the condition is true. Text values go in single quotes.`,
        `Use [[=]], [[<>]], [[<]], [[>]], and the other comparison operators on values, not on column names.`,
      ],
      example: {
        code: `SELECT name
FROM users
WHERE active = 1;`,
        caption: `Only active users.`,
      },
      wrong: {
        code: `SELECT name
FROM users
WHERE name = "Ada";`,
        why: `Double quotes usually mean an identifier, not a string. The database looks for a column called Ada. Use single quotes.`,
      },
    },
    {
      title: "AND and OR precedence",
      body: [
        `[[AND]] binds tighter than [[OR]]. A condition without parentheses is evaluated as [[a OR (b AND c)]], not [[(a OR b) AND c]].`,
        `When a filter mixes both operators, add parentheses even if the precedence happens to match what you meant.`,
      ],
      example: {
        code: `SELECT *
FROM orders
WHERE (status = 'active' OR status = 'pending')
  AND paid = 1;`,
        caption: `The group is explicit.`,
      },
      wrong: {
        code: `SELECT *
FROM orders
WHERE status = 'active' OR status = 'pending'
  AND paid = 1;`,
        why: `This returns every active order, paid or not. The AND only applies to the pending branch.`,
      },
    },
    {
      title: "NULL is not a value",
      body: [
        `NULL means "unknown". Any comparison with NULL is unknown, and unknown rows are filtered out.`,
        `Test for it with [[IS NULL]] and [[IS NOT NULL]]. [[= NULL]] never matches.`,
      ],
      example: {
        code: `SELECT name
FROM users
WHERE email IS NOT NULL;`,
        caption: `Rows with a known email.`,
      },
      wrong: {
        code: `SELECT name
FROM users
WHERE email != NULL;`,
        why: `The comparison is unknown for every row, so the result is always empty. Use IS NOT NULL.`,
      },
    },
  ],

  sql3: [
    {
      title: "Sorting",
      body: [
        `[[ORDER BY]] sorts the result. [[ASC]] is the default; [[DESC]] reverses it.`,
        `Sort by several columns by separating them with commas: the second column breaks ties in the first.`,
      ],
      example: {
        code: `SELECT name, created_at
FROM users
ORDER BY created_at DESC;`,
        caption: `Newest first.`,
      },
      wrong: {
        code: `SELECT name
FROM users
ORDER BY name DESC ASC;`,
        why: `A column takes one direction, so two directions in a row is a syntax error.`,
      },
    },
    {
      title: "LIMIT and OFFSET",
      body: [
        `[[LIMIT]] caps the number of rows. [[OFFSET]] skips rows before starting. Together they paginate.`,
        `The clauses have a fixed order: WHERE, then ORDER BY, then LIMIT, then OFFSET.`,
      ],
      example: {
        code: `SELECT name
FROM users
ORDER BY created_at DESC
LIMIT 10 OFFSET 20;`,
        caption: `Rows 21–30 of the newest-first list.`,
      },
      wrong: {
        code: `SELECT name
FROM users
LIMIT 10 OFFSET 20
ORDER BY created_at DESC;`,
        why: `ORDER BY must come before LIMIT, so this is a syntax error.`,
      },
    },
    {
      title: "Stable ordering",
      body: [
        `Sorting by a column with ties leaves the order of tied rows unspecified. Two runs can return them in different orders.`,
        `Add a unique column as a tiebreaker — usually the primary key — so pagination does not repeat or skip rows.`,
      ],
      example: {
        code: `SELECT id, name
FROM users
ORDER BY created_at DESC, id DESC;`,
        caption: `Ties broken by id, so the order is total.`,
      },
      wrong: {
        code: `SELECT id, name
FROM users
ORDER BY created_at DESC
LIMIT 10 OFFSET 10;`,
        why: `Rows with the same timestamp can swap between pages, so a row may appear twice or never. Add a unique tiebreaker.`,
      },
    },
  ],

  sql4: [
    {
      title: "One row at a time",
      body: [
        `[[INSERT INTO table (columns) VALUES (values)]] adds a row. The value order matches the column order.`,
        `Name the columns explicitly so adding a column later does not break the statement.`,
      ],
      example: {
        code: `INSERT INTO users (name, email)
VALUES ('Ada', 'ada@example.com');`,
        caption: `Two columns, two values.`,
      },
      wrong: {
        code: `INSERT INTO users (name, email)
VALUES ('Ada');`,
        why: `The number of values must match the number of columns; this fails with a column-count error.`,
      },
    },
    {
      title: "Several rows",
      body: [
        `Separate value tuples with commas to insert several rows in one statement. One statement is faster than many.`,
        `Each tuple must have the same number of values as the column list.`,
      ],
      example: {
        code: `INSERT INTO tags (name)
VALUES ('sql'), ('database'), ('beginner');`,
        caption: `Three rows, one round trip.`,
      },
      wrong: {
        code: `INSERT INTO tags (name)
VALUES ('sql') ('database');`,
        why: `The tuples are missing the comma between them, so this is a syntax error.`,
      },
    },
    {
      title: "Defaults and required columns",
      body: [
        `A column with a default can be omitted from the insert. A NOT NULL column without a default must be supplied.`,
        `Explicitly inserting NULL into a NOT NULL column fails the constraint, which is the constraint doing its job.`,
      ],
      example: {
        code: `INSERT INTO users (name)
VALUES ('Ada');`,
        caption: `created_at and id take their defaults.`,
      },
      wrong: {
        code: `INSERT INTO users (name, email)
VALUES ('Ada', NULL);`,
        why: `If email is NOT NULL, the row is rejected. Supply a value or let a default fill it.`,
      },
    },
  ],

  sql5: [
    {
      title: "UPDATE",
      body: [
        `[[UPDATE table SET column = value]] changes matching rows. [[WHERE]] decides which rows.`,
        `Without WHERE, every row in the table is changed. SQL places SET first and WHERE afterwards; keep the condition in that final clause to limit which rows change.`,
      ],
      example: {
        code: `UPDATE users
SET active = 0
WHERE last_login < '2025-01-01';`,
        caption: `Only the old accounts.`,
      },
      wrong: {
        code: `UPDATE users
SET active = 0;`,
        why: `There is no WHERE, so every user is deactivated. This is the classic missing-clause mistake.`,
      },
    },
    {
      title: "DELETE",
      body: [
        `[[DELETE FROM table WHERE condition]] removes rows. The table and its structure remain.`,
        `[[DELETE FROM table]] with no WHERE empties it; [[DROP TABLE]] is a different statement and removes the table itself.`,
      ],
      example: {
        code: `DELETE FROM sessions
WHERE expires_at < CURRENT_TIMESTAMP;`,
        caption: `Only expired sessions.`,
      },
      wrong: {
        code: `DELETE * FROM sessions;`,
        why: `DELETE does not take a column list; the star is a syntax error. Use [[DELETE FROM sessions]].`,
      },
    },
    {
      title: "Check before you change",
      body: [
        `Run the same WHERE clause as a SELECT first. It shows exactly which rows the change will touch.`,
        `A WHERE that matches nothing is safe; a WHERE that matches everything is the danger. Test with COUNT(*) before deleting.`,
      ],
      example: {
        code: `SELECT COUNT(*)
FROM sessions
WHERE expires_at < CURRENT_TIMESTAMP;`,
        caption: `Count the rows, then run the DELETE with the same filter.`,
      },
      wrong: {
        code: `DELETE FROM users
WHERE last_login = NULL;`,
        why: `The comparison is unknown for every row, so nothing is deleted and the cleanup silently does nothing. Use IS NULL.`,
      },
    },
  ],

  sql6:     [
    {
      "title": "Create a table and choose column types",
      "body": "CREATE TABLE defines the structure of a table before rows are added. Each column needs a name and a data type that suits the values it stores. Keep names clear and choose types that match the information, such as an integer identifier, a text name, or a numeric age.",
      "example": {
        "code": "CREATE TABLE users (\n  id INTEGER,\n  name VARCHAR(100),\n  age INTEGER,\n  city VARCHAR(100)\n);"
      },
      "wrong": {
        "code": "CREATE TABLE users (\n  id INTEGER,\n  id TEXT\n);",
        "why": "Column names must be unique within one table. Giving two columns the same name makes the table definition invalid."
      }
    },
    {
      "title": "Identify rows with a primary key",
      "body": "A primary key identifies each row in a table. It must be unique and cannot be NULL. NOT NULL can also be used for other columns that require a value. These basic constraints help the database reject incomplete or duplicate records.",
      "example": {
        "code": "CREATE TABLE users (\n  id INTEGER PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  age INTEGER,\n  city VARCHAR(100)\n);"
      },
      "wrong": {
        "code": "CREATE TABLE users (\n  id INTEGER PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  another_id INTEGER PRIMARY KEY\n);",
        "why": "A table has one primary-key constraint. If more than one column is needed to identify a row, define a single composite primary key instead."
      }
    },
    {
      "title": "Review a complete table definition",
      "body": "A complete table definition brings its column names, data types, and basic constraints together. Check that every column has a suitable type, the primary key identifies one row, and required values use NOT NULL. The next Beginner SQL topic uses INSERT to add rows to this table.",
      "example": {
        "code": "CREATE TABLE users (\n  id INTEGER PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  age INTEGER,\n  city VARCHAR(100)\n);"
      },
      "wrong": {
        "code": "CREATE TABLE users (\n  id INTEGER PRIMARY KEY,\n  name VARCHAR(100) NOT NULL\n  age INTEGER\n);",
        "why": "Each column definition must be separated by a comma. The missing comma after the name column makes the table definition invalid."
      }
    }
  ],

  sql7: [
    {
      title: "LIKE patterns",
      body: [
        `[[LIKE]] compares text with wildcards: [[%]] matches any number of characters, [[_]] exactly one.`,
        `Case sensitivity depends on the database and collation. SQLite's LIKE is case-insensitive for ASCII by default; Postgres's is case-sensitive.`,
      ],
      example: {
        code: `SELECT name
FROM users
WHERE name LIKE 'A%';`,
        caption: `Names beginning with A.`,
      },
      wrong: {
        code: `SELECT name
FROM users
WHERE name = 'A%';`,
        why: `Without LIKE the percent sign is a literal character, so this matches only the exact text "A%".`,
      },
    },
    {
      title: "IN lists",
      body: [
        `[[IN (a, b, c)]] is shorthand for a chain of OR comparisons. The parentheses are part of the syntax.`,
        `IN also accepts a subquery, which is how a list of ids from another table is checked.`,
      ],
      example: {
        code: `SELECT *
FROM orders
WHERE status IN ('paid', 'shipped');`,
        caption: `Two acceptable statuses.`,
      },
      wrong: {
        code: `SELECT *
FROM orders
WHERE status IN 'paid', 'shipped';`,
        why: `The values must be wrapped in parentheses; without them this is a syntax error.`,
      },
    },
    {
      title: "BETWEEN",
      body: [
        `[[BETWEEN a AND b]] is inclusive on both ends: it means [[>= a AND <= b]].`,
        `For a date column that stores a time, an end date of '2026-01-31' excludes everything after midnight on that day.`,
      ],
      example: {
        code: `SELECT *
FROM orders
WHERE created_at >= '2026-01-01'
  AND created_at < '2026-02-01';`,
        caption: `Half-open range: all of January.`,
      },
      wrong: {
        code: `SELECT *
FROM orders
WHERE created_at BETWEEN '2026-01-01' AND '2026-01-31';`,
        why: `Rows timestamped 2026-01-31 09:00 are after the end value and are excluded. Use the next day as an exclusive bound.`,
      },
    },
  ],

  sql8: [
    {
      title: "COUNT, SUM, AVG",
      body: [
        `[[COUNT(*)]] counts rows. [[COUNT(column)]] counts rows where that column is not NULL.`,
        `[[SUM]] and [[AVG]] ignore NULLs too, so the average is over known values only.`,
      ],
      example: {
        code: `SELECT COUNT(*), COUNT(email)
FROM users;`,
        caption: `All rows, then only rows with an email.`,
      },
      wrong: {
        code: `SELECT COUNT(email) AS total_users
FROM users;`,
        why: `Users without an email are not counted, so total_users understates the table. Use COUNT(*) for the row count.`,
      },
    },
    {
      title: "MIN, MAX, and aliases",
      body: [
        `[[MIN]] and [[MAX]] return the smallest and largest value, ignoring NULLs.`,
        `Alias every aggregate. A result column called [[count(*)]] is awkward to read and awkward to reference.`,
      ],
      example: {
        code: `SELECT MIN(price) AS cheapest,
       MAX(price) AS priciest
FROM products;`,
        caption: `Two named results.`,
      },
      wrong: {
        code: `SELECT MAX(price) AS order
FROM products;`,
        why: `[[order]] is a reserved word, so the alias needs quotes or a different name: [[AS "order"]].`,
      },
    },
    {
      title: "Aggregates beside plain columns",
      body: [
        `An aggregate collapses many rows into one. Selecting a plain column beside it is only valid if that column is grouped.`,
        `Postgres rejects the query; MySQL may return an arbitrary row, which is worse because it looks like it worked.`,
      ],
      example: {
        code: `SELECT COUNT(*) AS total
FROM orders;`,
        caption: `One row, one number.`,
      },
      wrong: {
        code: `SELECT customer_id, COUNT(*) AS total
FROM orders;`,
        why: `customer_id is neither grouped nor aggregated, so the result is undefined or an error. Add GROUP BY customer_id.`,
      },
    },
  ],

  sql9: [
    {
      title: "GROUP BY",
      body: [
        `[[GROUP BY]] collects rows with the same value into one result row. Aggregates then run once per group.`,
        `Every plain column in the SELECT must appear in the GROUP BY.`,
      ],
      example: {
        code: `SELECT customer_id, COUNT(*) AS orders
FROM orders
GROUP BY customer_id;`,
        caption: `One row per customer.`,
      },
      wrong: {
        code: `SELECT customer_id, status, COUNT(*) AS orders
FROM orders
GROUP BY customer_id;`,
        why: `status is neither grouped nor aggregated, so the query is rejected or returns an arbitrary status per customer.`,
      },
    },
    {
      title: "WHERE or HAVING",
      body: [
        `[[WHERE]] filters rows before grouping. [[HAVING]] filters groups after aggregation.`,
        `An aggregate in WHERE is not allowed, because the groups do not exist yet.`,
      ],
      example: {
        code: `SELECT customer_id, COUNT(*) AS orders
FROM orders
WHERE status = 'paid'
GROUP BY customer_id
HAVING COUNT(*) > 5;`,
        caption: `Paid first, then only busy customers.`,
      },
      wrong: {
        code: `SELECT customer_id, COUNT(*) AS orders
FROM orders
WHERE COUNT(*) > 5
GROUP BY customer_id;`,
        why: `COUNT is not available in WHERE. Move the condition to HAVING.`,
      },
    },
    {
      title: "Grouping by expression",
      body: [
        `The group key can be an expression: [[DATE(created_at)]], [[substr(email, -4)]], a case expression.`,
        `Grouping by a raw timestamp creates one group per distinct timestamp, not one per day.`,
      ],
      example: {
        code: `SELECT DATE(created_at) AS day, COUNT(*) AS orders
FROM orders
GROUP BY DATE(created_at);`,
        caption: `One row per calendar day.`,
      },
      wrong: {
        code: `SELECT created_at, COUNT(*) AS orders
FROM orders
GROUP BY created_at;`,
        why: `Every order likely has a unique timestamp, so this returns one row per order instead of per day.`,
      },
    },
  ],

  sql10: [
    {
      title: "INNER JOIN",
      body: [
        `[[JOIN]] combines rows from two tables using a related column. [[ON]] states the relationship.`,
        `INNER JOIN keeps only rows with a match on both sides.`,
      ],
      example: {
        code: `SELECT users.name, orders.total
FROM users
JOIN orders ON orders.user_id = users.id;`,
        caption: `Only users who have orders, and only matched orders.`,
      },
      wrong: {
        code: `SELECT users.name, orders.total
FROM users
JOIN orders;`,
        why: `Without ON the join pairs every user with every order, producing a cross product.`,
      },
    },
    {
      title: "LEFT JOIN",
      body: [
        `LEFT JOIN keeps every row from the left table even when there is no match. The right columns become NULL.`,
        `A filter on the right table in WHERE removes the unmatched rows and turns the outer join back into an inner one.`,
      ],
      example: {
        code: `SELECT users.name, orders.total
FROM users
LEFT JOIN orders
  ON orders.user_id = users.id
 AND orders.status = 'paid';`,
        caption: `Every user, with paid orders where they exist.`,
      },
      wrong: {
        code: `SELECT users.name, orders.total
FROM users
LEFT JOIN orders ON orders.user_id = users.id
WHERE orders.status = 'paid';`,
        why: `Filtering the right table in WHERE drops users without a paid order. Move the condition into the ON clause.`,
      },
    },
    {
      title: "Self joins and aliases",
      body: [
        `A table can join itself when rows relate to other rows in the same table: employees and managers, for example.`,
        `Give each side a distinct alias, and qualify every ambiguous column with that alias.`,
      ],
      example: {
        code: `SELECT e.name AS employee,
       m.name AS manager
FROM employees e
LEFT JOIN employees m ON m.id = e.manager_id;`,
        caption: `The same table under two names.`,
      },
      wrong: {
        code: `SELECT name, manager_id
FROM employees e
JOIN employees m ON m.id = e.manager_id;`,
        why: `name exists on both sides, so the reference is ambiguous and the database rejects it. Use e.name.`,
      },
    },
  ],

  sql11: [
    {
      title: "Scalar subqueries",
      body: [
        `A subquery in parentheses can produce one value: [[(SELECT MAX(price) FROM products)]].`,
        `Used in a comparison or a column, it must return at most one row and one column.`,
      ],
      example: {
        code: `SELECT name, price
FROM products
WHERE price = (SELECT MAX(price) FROM products);`,
        caption: `The most expensive product.`,
      },
      wrong: {
        code: `SELECT name, price
FROM products
WHERE price = (SELECT price FROM products);`,
        why: `The subquery returns many prices, so the comparison cannot produce a single value. Use MAX or IN.`,
      },
    },
    {
      title: "IN and EXISTS",
      body: [
        `[[IN (subquery)]] checks membership in a list. [[EXISTS (subquery)]] checks whether any row matches.`,
        `NOT IN behaves strangely when the list contains NULL: the comparison becomes unknown and the result is empty.`,
      ],
      example: {
        code: `SELECT *
FROM users u
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.user_id = u.id
);`,
        caption: `Users with at least one order.`,
      },
      wrong: {
        code: `SELECT *
FROM users
WHERE id NOT IN (SELECT user_id FROM orders);`,
        why: `If any order has a NULL user_id, NOT IN returns no rows at all. Use NOT EXISTS instead.`,
      },
    },
    {
      title: "Correlated subqueries",
      body: [
        `A correlated subquery references the outer query. It runs conceptually once per outer row.`,
        `Alias both tables and reference the outer alias inside the subquery; without it the condition compares a table to itself.`,
      ],
      example: {
        code: `SELECT u.name
FROM users u
WHERE (
  SELECT COUNT(*) FROM orders o
  WHERE o.user_id = u.id
) > 5;`,
        caption: `Each user is checked against their own orders.`,
      },
      wrong: {
        code: `SELECT u.name
FROM users u
WHERE (
  SELECT COUNT(*) FROM orders o
  WHERE o.user_id = o.id
) > 5;`,
        why: `The subquery compares orders to themselves instead of to the outer user, so the result is unrelated to the filter.`,
      },
    },
  ],

  sql12: [
    {
      title: "What an index buys",
      body: [
        `An index is a sorted structure for one or more columns. It turns a full table scan into a targeted lookup.`,
        `Index columns that appear often in WHERE, JOIN, and ORDER BY. Every index also slows INSERT and UPDATE.`,
      ],
      example: {
        code: `CREATE INDEX idx_users_email
ON users (email);`,
        caption: `Lookups by email no longer scan the table.`,
      },
      wrong: {
        code: `SELECT *
FROM users
WHERE LOWER(email) = 'ada@example.com';`,
        why: `Wrapping the indexed column in a function stops the index from being used; the query scans every row. Store normalised email or index the expression.`,
      },
    },
    {
      title: "Composite indexes",
      body: [
        `An index on [[(a, b)]] helps queries that filter on a, or on a and b. It does not help a query that filters on b alone.`,
        `Order the columns by how the query uses them: equality columns first, range columns after.`,
      ],
      example: {
        code: `CREATE INDEX idx_orders_user_status
ON orders (user_id, status);`,
        caption: `Good for user_id, and for user_id plus status.`,
      },
      wrong: {
        code: `CREATE INDEX idx_orders_user_status
ON orders (user_id, status);

SELECT * FROM orders WHERE status = 'paid';`,
        why: `The index starts with user_id, so a query on status alone cannot use it. Add a separate index if that filter is common.`,
      },
    },
    {
      title: "Unique indexes and write cost",
      body: [
        `[[CREATE UNIQUE INDEX]] enforces uniqueness as well as speeding lookups. A failed insert is a constraint error, not a crash.`,
        `Indexes cost storage and write time. Five indexes on one table is a design decision, not a default.`,
      ],
      example: {
        code: `CREATE UNIQUE INDEX idx_users_email
ON users (email);`,
        caption: `One account per email, enforced by the database.`,
      },
      wrong: {
        code: `CREATE UNIQUE INDEX idx_users_email
ON users (email);

-- existing table already has duplicate emails`,
        why: `The index cannot be created while duplicates exist; the statement fails. Clean the duplicates first.`,
      },
    },
  ],

  sql13: [
    {
      title: "A view is a saved query",
      body: [
        `[[CREATE VIEW name AS SELECT ...]] stores a query under a name. Selecting from the view runs the query.`,
        `A view holds no rows of its own, so it is always current. It is not a cache.`,
      ],
      example: {
        code: `CREATE VIEW active_users AS
SELECT id, name
FROM users
WHERE active = 1;`,
        caption: `A named filter over the table.`,
      },
      wrong: {
        code: `CREATE VIEW newest_users AS
SELECT * FROM users
ORDER BY created_at DESC
LIMIT 10;

SELECT * FROM newest_users ORDER BY name;`,
        why: `A view's ORDER BY is not guaranteed to survive an outer query; the outer ORDER BY wins. Treat the view as a table.`,
      },
    },
    {
      title: "Views for simplicity and access",
      body: [
        `A view can hide joins and calculations behind a simple name. It can also expose only some columns to a reporting user.`,
        `A view is not a security boundary by itself: row-level access still belongs to the database's permission system.`,
      ],
      example: {
        code: `CREATE VIEW order_totals AS
SELECT o.id, SUM(i.price * i.quantity) AS total
FROM orders o
JOIN order_items i ON i.order_id = o.id
GROUP BY o.id;`,
        caption: `The join lives in one place.`,
      },
      wrong: {
        code: `CREATE VIEW user_names AS
SELECT id, name FROM users;

UPDATE user_names SET email = 'x@example.com';`,
        why: `email is not part of the view, so the update fails. Add the column to the view or update the base table.`,
      },
    },
    {
      title: "Updatable views and limits",
      body: [
        `Simple views over one table are often updatable. Views with joins, aggregates, or DISTINCT usually are not.`,
        `Check the database's rules before relying on writes through a view.`,
      ],
      example: {
        code: `CREATE VIEW paid_orders AS
SELECT * FROM orders WHERE status = 'paid';`,
        caption: `A filtered view of one table.`,
      },
      wrong: {
        code: `CREATE VIEW totals AS
SELECT user_id, SUM(total) AS spent
FROM orders
GROUP BY user_id;

UPDATE totals SET spent = 0;`,
        why: `An aggregate is not a stored column, so the view is not updatable. Change the underlying orders instead.`,
      },
    },
  ],

  sql14: [
    {
      title: "BEGIN and COMMIT",
      body: [
        `A transaction groups statements. [[BEGIN]] starts it, [[COMMIT]] saves everything, and nothing is visible to others until the commit.`,
        `SQLite and SQL Server spell it [[BEGIN TRANSACTION]]; MySQL and Postgres accept [[START TRANSACTION]] too.`,
      ],
      example: {
        code: `BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;`,
        caption: `Both writes become visible together.`,
      },
      wrong: {
        code: `BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;`,
        why: `Without COMMIT the work is left pending and is rolled back when the connection closes. The transfer never happens.`,
      },
    },
    {
      title: "ROLLBACK",
      body: [
        `[[ROLLBACK]] discards everything since BEGIN. It is the undo button for the current transaction.`,
        `It has no effect after a commit: the changes are already durable.`,
      ],
      example: {
        code: `BEGIN;
DELETE FROM orders WHERE created_at < '2020-01-01';
ROLLBACK;`,
        caption: `The delete is undone.`,
      },
      wrong: {
        code: `BEGIN;
DELETE FROM orders WHERE id = 42;
COMMIT;
ROLLBACK;`,
        why: `The commit already made the delete permanent; the later rollback does nothing.`,
      },
    },
    {
      title: "Isolation and lost updates",
      body: [
        `Two transactions can read the same value and write back based on the stale read. The second write silently overwrites the first.`,
        `Read and write in the same transaction, or use an atomic update like [[balance = balance - 100]] so the database does the arithmetic.`,
      ],
      example: {
        code: `UPDATE accounts
SET balance = balance - 100
WHERE id = 1 AND balance >= 100;`,
        caption: `One atomic statement, no read-modify-write gap.`,
      },
      wrong: {
        code: `-- transaction A
SELECT balance FROM accounts WHERE id = 1; -- 500
-- transaction B reads 500 too
UPDATE accounts SET balance = 400 WHERE id = 1;`,
        why: `Both transactions write 400, so one withdrawal disappears. Subtract in the UPDATE or lock the row.`,
      },
    },
  ],

  sql15: [
    {
      title: "OVER",
      body: [
        `A window function calculates across related rows without collapsing them. [[OVER ()]] defines the window.`,
        `Unlike GROUP BY, every original row stays in the result.`,
      ],
      example: {
        code: `SELECT name, salary,
       AVG(salary) OVER () AS company_avg
FROM employees;`,
        caption: `Every employee keeps their row and gains the average.`,
      },
      wrong: {
        code: `SELECT name, AVG(salary) AS avg_salary
FROM employees
WHERE AVG(salary) OVER () > 1000;`,
        why: `A window function is not allowed in WHERE; it is evaluated after filtering. Put it in a subquery and filter outside.`,
      },
    },
    {
      title: "PARTITION BY",
      body: [
        `[[PARTITION BY department]] restarts the calculation per group while keeping every row.`,
        `This is the tool for "compare each row to its group's average" — a question GROUP BY cannot answer without a join.`,
      ],
      example: {
        code: `SELECT name, department, salary,
       AVG(salary) OVER (PARTITION BY department) AS dept_avg
FROM employees;`,
        caption: `Each row against its own department average.`,
      },
      wrong: {
        code: `SELECT department, AVG(salary) OVER (PARTITION BY department)
FROM employees
GROUP BY department;`,
        why: `GROUP BY collapses the rows, so the per-row window has nothing to attach to. Remove GROUP BY for a window, or use a plain aggregate.`,
      },
    },
    {
      title: "ROW_NUMBER and RANK",
      body: [
        `[[ROW_NUMBER()]] numbers every row uniquely. [[RANK()]] gives tied rows the same rank and skips the next number.`,
        `Calculated columns cannot be filtered in the same WHERE; wrap the query and filter outside.`,
      ],
      example: {
        code: `SELECT *
FROM (
  SELECT name, salary,
         ROW_NUMBER() OVER (ORDER BY salary DESC) AS rn
  FROM employees
) ranked
WHERE rn <= 3;`,
        caption: `Top three, filtered outside the window query.`,
      },
      wrong: {
        code: `SELECT name,
       ROW_NUMBER() OVER (ORDER BY salary DESC) AS rn
FROM employees
WHERE rn <= 3;`,
        why: `rn does not exist until after WHERE runs, so the query fails. Use a subquery or a CTE.`,
      },
    },
  ],

  "sql16": [
  {
    "title": "Identify entities and attributes",
    "body": [
      "An entity represents a thing the database needs to store, such as a student or course. Attributes describe its properties, and a key identifies each entity instance.",
      "Choose attributes that describe one fact and give each entity a stable identifier. Avoid storing several unrelated values in one field."
    ],
    "example": {
      "code": "STUDENT(\n  student_id PRIMARY KEY,\n  name,\n  email\n)",
      "caption": "The student entity has a key and descriptive attributes."
    },
    "wrong": {
      "code": "STUDENT(\n  name_and_email\n)",
      "why": "Combining several independent facts into one field makes filtering and validation harder. Model attributes separately."
    }
  },
  {
    "title": "Model relationships",
    "body": [
      "A relationship describes how entities are associated. A one-to-many relationship can be represented by placing a foreign key on the many side; a many-to-many relationship usually needs a junction table.",
      "Use an ERD to show entities, keys, and relationship cardinality before implementation. The diagram helps find missing entities and ambiguous associations."
    ],
    "example": {
      "code": "STUDENT(student_id, name)\nCOURSE(course_id, title)\nENROLLMENT(student_id, course_id)",
      "caption": "ENROLLMENT connects students and courses."
    },
    "wrong": {
      "code": "STUDENT(student_id, course_id)\nCOURSE(course_id, title)",
      "why": "Storing one course field in STUDENT cannot represent a student enrolled in many courses cleanly. Use a junction table."
    }
  },
  {
    "title": "Normalize repeated information",
    "body": [
      "First normal form expects values to be atomic rather than repeating groups. Higher normal forms reduce dependencies that can create duplication and inconsistent updates.",
      "Normalization is a design tool, not a command to split every table endlessly. Identify functional dependencies and preserve relationships with keys."
    ],
    "example": {
      "code": "ENROLLMENT(\n  student_id,\n  course_id,\n  enrolled_at,\n  PRIMARY KEY (student_id, course_id)\n)",
      "caption": "The relationship has its own attributes and key."
    },
    "wrong": {
      "code": "STUDENT(\n  student_id,\n  course_1,\n  course_2,\n  course_3\n)",
      "why": "Repeating course columns are difficult to query and extend. Store each enrollment as a separate row."
    }
  }
],
  "sql17": [
  {
    "title": "Remove duplicate query rows",
    "body": [
      "DISTINCT asks the database to return unique combinations of the selected columns. If several selected columns are present, uniqueness is evaluated across that combination.",
      "Use DISTINCT when duplicates are not meaningful in the result. Do not use it as a substitute for understanding why a JOIN produces repeated rows."
    ],
    "example": {
      "code": "SELECT DISTINCT city\nFROM students;",
      "caption": "Each city appears once."
    },
    "wrong": {
      "code": "SELECT DISTINCT city, name\nFROM students;",
      "why": "This returns distinct city-and-name pairs, not one row per city. Select only the columns that define the desired uniqueness."
    }
  },
  {
    "title": "Combine queries with UNION",
    "body": [
      "UNION combines compatible result sets and removes duplicate rows. The queries need the same number of output columns with compatible types in corresponding positions.",
      "Column names come from the first query. Use aliases there to give the combined result clear names."
    ],
    "example": {
      "code": "SELECT student_id AS person_id FROM current_students\nUNION\nSELECT student_id FROM alumni;",
      "caption": "The result contains unique IDs across both sources."
    },
    "wrong": {
      "code": "SELECT student_id FROM current_students\nUNION\nSELECT student_id, name FROM alumni;",
      "why": "The queries return a different number of columns. Set-operation branches must have compatible result shapes."
    }
  },
  {
    "title": "Choose UNION ALL, INTERSECT, or MINUS",
    "body": [
      "UNION ALL keeps duplicates and can avoid the duplicate-elimination work. INTERSECT returns rows common to both results, while Oracle uses MINUS for rows in the first result but not the second.",
      "Set operations combine whole result rows, not related columns from separate tables. Use JOIN when rows should be matched through a relationship."
    ],
    "example": {
      "code": "SELECT student_id FROM current_students\nINTERSECT\nSELECT student_id FROM scholarship_holders;",
      "caption": "The result contains IDs present in both sets."
    },
    "wrong": {
      "code": "SELECT a.student_id, b.name\nFROM current_students a\nUNION\nSELECT student_id\nFROM alumni;",
      "why": "The branches have different output column counts. Use a JOIN for related columns or align the set-operation result shapes."
    }
  }
],
  "sql18": [
  {
    "title": "Use character and numeric functions",
    "body": [
      "Character functions such as UPPER(), LOWER(), SUBSTR(), and LENGTH() transform or inspect text. Numeric functions such as ROUND(), TRUNC(), and MOD() work with numbers.",
      "A single-row function is evaluated for each row in the query result. Combine functions when a value needs several transformations."
    ],
    "example": {
      "code": "SELECT UPPER(name), SUBSTR(name, 1, 3)\nFROM students;",
      "caption": "Each row returns an uppercase name and a prefix."
    },
    "wrong": {
      "code": "SELECT name, COUNT(*)\nFROM students;",
      "why": "The query mixes a regular column with an aggregate but has no GROUP BY for name."
    }
  },
  {
    "title": "Work with date values",
    "body": [
      "Oracle date functions include SYSDATE, ADD_MONTHS, MONTHS_BETWEEN, and LAST_DAY. Date arithmetic can calculate intervals and calendar boundaries.",
      "Use date values rather than storing dates as arbitrary text. Formatting a date for display is different from changing the underlying date value."
    ],
    "example": {
      "code": "SELECT ADD_MONTHS(SYSDATE, 1)\nFROM dual;",
      "caption": "The expression returns a date one month later."
    },
    "wrong": {
      "code": "SELECT SYSDATE + \"one month\"\nFROM dual;",
      "why": "Date arithmetic expects a numeric day interval, not descriptive text. Use date functions such as ADD_MONTHS()."
    }
  },
  {
    "title": "Convert and handle null values",
    "body": [
      "TO_CHAR(), TO_DATE(), and TO_NUMBER() convert values between dates, numbers, and text. NVL() and COALESCE() can provide a fallback for null values.",
      "Use explicit format masks when converting date text so interpretation does not depend on session settings. Avoid implicit conversions in important queries."
    ],
    "example": {
      "code": "SELECT TO_CHAR(order_date, 'YYYY-MM-DD')\nFROM orders;",
      "caption": "The date is formatted as text for display."
    },
    "wrong": {
      "code": "SELECT TO_DATE('2026-11-28')\nFROM dual;",
      "why": "Use an explicit format mask when the expected text format matters, such as TO_DATE('2026-11-28','YYYY-MM-DD')."
    }
  }
],
  "sql19": [
  {
    "title": "Write a searched CASE expression",
    "body": [
      "A searched CASE expression checks conditions from top to bottom. The result for the first true WHEN branch is returned, and ELSE supplies a fallback.",
      "Use END to close the expression and give it an alias when the result should have a readable column name."
    ],
    "example": {
      "code": "SELECT name,\n       CASE\n         WHEN score >= 75 THEN 'Pass'\n         ELSE 'Retry'\n       END AS result\nFROM students;",
      "caption": "Each row receives a result label."
    },
    "wrong": {
      "code": "SELECT name,\n       CASE WHEN score >= 75 THEN 'Pass'\nFROM students;",
      "why": "The CASE expression is missing END and has no complete alternative branch. Close it explicitly."
    }
  },
  {
    "title": "Use simple CASE and multiple branches",
    "body": [
      "A simple CASE compares one expression against several WHEN values. A searched CASE is more flexible because each branch can use a full condition.",
      "Order conditions from the most specific to the broader cases when they could overlap. The first matching branch wins."
    ],
    "example": {
      "code": "SELECT grade,\n       CASE grade\n         WHEN 'A' THEN 'Excellent'\n         WHEN 'B' THEN 'Good'\n         ELSE 'Review'\n       END AS description\nFROM results;",
      "caption": "One value is compared with several alternatives."
    },
    "wrong": {
      "code": "CASE grade\n  WHEN grade >= 90 THEN 'A'\nEND",
      "why": "The simple CASE form compares equality with values. Use searched CASE when each branch needs a range condition."
    }
  },
  {
    "title": "Use CASE in calculations and ordering",
    "body": [
      "CASE can appear in a SELECT list, ORDER BY, or an aggregate expression. It can convert categories into numeric values or apply conditional calculations.",
      "Keep output types compatible across branches. Databases may need to convert the result to a common type."
    ],
    "example": {
      "code": "SELECT SUM(\n  CASE WHEN status = 'Paid' THEN amount ELSE 0 END\n) AS paid_total\nFROM invoices;",
      "caption": "Only paid rows contribute their amount."
    },
    "wrong": {
      "code": "SELECT SUM(\n  CASE WHEN status = 'Paid' THEN amount ELSE '0' END\n) FROM invoices;",
      "why": "The branches mix number and text values. Return compatible numeric values."
    }
  }
],
  "sql20": [
  {
    "title": "Change a table structure",
    "body": [
      "ALTER TABLE can add, modify, rename, or drop columns and constraints, with syntax varying by database. In Oracle, ADD can introduce a new column or constraint.",
      "Plan schema changes carefully when a table already contains data. A new NOT NULL column may require a default or a staged migration to keep existing rows valid."
    ],
    "example": {
      "code": "ALTER TABLE students\nADD email VARCHAR2(255);",
      "caption": "The table gains an email column."
    },
    "wrong": {
      "code": "ALTER TABLE students\nADD COLUMN email VARCHAR2(255);",
      "why": "Oracle's ALTER TABLE ADD syntax does not use the optional COLUMN keyword. Follow the target database's dialect."
    }
  },
  {
    "title": "Enforce data rules with constraints",
    "body": [
      "PRIMARY KEY uniquely identifies each row. FOREIGN KEY enforces a reference, UNIQUE prevents duplicate values, NOT NULL requires a value, and CHECK enforces a condition.",
      "Constraints protect data regardless of which application inserts it. Choose names that make the rule identifiable during maintenance."
    ],
    "example": {
      "code": "ALTER TABLE students\nADD CONSTRAINT uq_students_email\nUNIQUE (email);",
      "caption": "The database rejects duplicate email values."
    },
    "wrong": {
      "code": "ALTER TABLE students\nADD CONSTRAINT uq_students_email\nCHECK (email);",
      "why": "CHECK expects a Boolean condition, not a column name by itself. Use UNIQUE for duplicate prevention."
    }
  },
  {
    "title": "Inspect and plan schema changes",
    "body": [
      "A schema migration should account for existing rows, dependent views or applications, and rollback planning. Test a schema change against representative data before deploying it.",
      "Avoid dropping or changing a column just because the application no longer displays it. Check dependencies and data-retention requirements first."
    ],
    "example": {
      "code": "ALTER TABLE students\nADD status VARCHAR2(20) DEFAULT 'Active';",
      "caption": "Existing rows receive a suitable default according to Oracle's behavior."
    },
    "wrong": {
      "code": "ALTER TABLE students\nDROP TABLE students;",
      "why": "This removes the entire table, not one column. Use DROP COLUMN only when removal is intended and dependencies have been reviewed."
    }
  }
],
  "sql21": [
  {
    "title": "Understand users and privileges",
    "body": [
      "A database user represents an identity that can connect or own database objects. Privileges describe permitted actions, such as creating a session or selecting rows from a table.",
      "Give accounts only the permissions needed for their tasks. Application accounts should not receive broad administrative privileges."
    ],
    "example": {
      "code": "CREATE USER analyst IDENTIFIED BY password_value;\nGRANT CREATE SESSION TO analyst;",
      "caption": "The user can connect after receiving a session privilege."
    },
    "wrong": {
      "code": "GRANT DBA TO application_user;",
      "why": "DBA is a broad administrative role. An application account should receive only the specific privileges it needs."
    }
  },
  {
    "title": "Grant and revoke object privileges",
    "body": [
      "GRANT assigns an object privilege such as SELECT, INSERT, UPDATE, or DELETE on a table. REVOKE removes a grant that is no longer needed.",
      "Grant access to named objects and specific actions. Review privileges when users change roles or applications no longer need access."
    ],
    "example": {
      "code": "GRANT SELECT ON students TO analyst;\nREVOKE SELECT ON students FROM analyst;",
      "caption": "The privilege is assigned and then removed."
    },
    "wrong": {
      "code": "GRANT SELECT ON students TO PUBLIC;",
      "why": "Granting to PUBLIC exposes the privilege broadly. Grant only to the intended user or role."
    }
  },
  {
    "title": "Use roles for permission groups",
    "body": [
      "A role groups multiple privileges under one name. Administrators can grant the role to users and manage the permissions in one place.",
      "Separate roles by job function, such as read-only reporting and data maintenance. Avoid granting every role to every account."
    ],
    "example": {
      "code": "CREATE ROLE report_reader;\nGRANT SELECT ON students TO report_reader;\nGRANT report_reader TO analyst;",
      "caption": "The role carries the read privilege to its user."
    },
    "wrong": {
      "code": "GRANT ALL PRIVILEGES TO analyst;",
      "why": "This grants far more access than a reporting user needs. Use a narrowly scoped role."
    }
  }
],
  "sql22": [
  {
    "title": "Recognize the block structure",
    "body": [
      "A PL/SQL block has an optional DECLARE section, a required BEGIN section, an optional EXCEPTION section, and END. The slash on a following line is a client command that submits the block in tools such as SQL*Plus.",
      "Declarations belong before BEGIN. Executable statements belong between BEGIN and EXCEPTION or END."
    ],
    "example": {
      "code": "DECLARE\n  v_total NUMBER := 0;\nBEGIN\n  v_total := 10 + 5;\nEND;\n/",
      "caption": "The variable is declared before executable statements."
    },
    "wrong": {
      "code": "BEGIN\n  DECLARE v_total NUMBER;\n  v_total := 10;\nEND;",
      "why": "The declaration section belongs before BEGIN in a standard anonymous block."
    }
  },
  {
    "title": "Declare variables and use conditions",
    "body": [
      "PL/SQL variables have data types such as NUMBER, VARCHAR2, and DATE. Assignment uses :=, which differs from SQL's comparison operator =.",
      "Use IF, ELSIF, and ELSE to select a branch. Initialize variables deliberately and choose types that fit the values they hold."
    ],
    "example": {
      "code": "DECLARE\n  v_score NUMBER := 82;\nBEGIN\n  IF v_score >= 75 THEN\n    DBMS_OUTPUT.PUT_LINE('Pass');\n  ELSE\n    DBMS_OUTPUT.PUT_LINE('Retry');\n  END IF;\nEND;\n/",
      "caption": "The branch depends on a numeric condition."
    },
    "wrong": {
      "code": "DECLARE\n  v_score NUMBER;\nBEGIN\n  v_score = 82;\nEND;\n/",
      "why": "PL/SQL assignment uses :=, not =."
    }
  },
  {
    "title": "Repeat work with loops",
    "body": [
      "PL/SQL supports basic LOOP, WHILE LOOP, and FOR LOOP constructs. A loop should have a clear termination condition unless repeated execution is intentionally controlled elsewhere.",
      "Use FOR loops for a known range and WHILE loops when repetition depends on a condition. Avoid loops that never update the state they test."
    ],
    "example": {
      "code": "BEGIN\n  FOR i IN 1..3 LOOP\n    DBMS_OUTPUT.PUT_LINE(i);\n  END LOOP;\nEND;\n/",
      "caption": "The loop runs for the values 1 through 3."
    },
    "wrong": {
      "code": "BEGIN\n  WHILE 1 = 1 LOOP\n    DBMS_OUTPUT.PUT_LINE('Again');\n  END LOOP;\nEND;\n/",
      "why": "The condition never becomes false, so the loop does not terminate. Add an exit condition."
    }
  }
],
  "sql23": [
  {
    "title": "Understand implicit and explicit cursors",
    "body": [
      "An implicit cursor is created by Oracle for SQL statements such as SELECT INTO and DML. An explicit cursor is declared when code needs to process a query result row by row.",
      "Use set-based SQL when it can perform the operation directly. An explicit cursor adds procedural control when each row genuinely requires separate handling."
    ],
    "example": {
      "code": "DECLARE\n  CURSOR c_students IS\n    SELECT student_id, name FROM students;\nBEGIN\n  FOR row_item IN c_students LOOP\n    DBMS_OUTPUT.PUT_LINE(row_item.name);\n  END LOOP;\nEND;\n/",
      "caption": "The cursor FOR loop opens, fetches, and closes the cursor."
    },
    "wrong": {
      "code": "DECLARE\n  CURSOR c_students IS SELECT name FROM students;\nBEGIN\n  DBMS_OUTPUT.PUT_LINE(c_students.name);\nEND;\n/",
      "why": "A cursor is not a row value. Fetch rows through a cursor loop or explicit OPEN, FETCH, and CLOSE."
    }
  },
  {
    "title": "Create procedures and functions",
    "body": [
      "A procedure performs an operation and can accept IN, OUT, or IN OUT parameters. A function returns a value and can be used in expressions where permitted.",
      "Choose a procedure for an action and a function for a calculation or value. Keep parameters and return types clear so callers know the contract."
    ],
    "example": {
      "code": "CREATE OR REPLACE FUNCTION tax_amount(p_price NUMBER)\nRETURN NUMBER IS\nBEGIN\n  RETURN p_price * 0.12;\nEND;\n/",
      "caption": "The function declares and returns a numeric value."
    },
    "wrong": {
      "code": "CREATE OR REPLACE FUNCTION tax_amount(p_price NUMBER)\nIS\nBEGIN\n  p_price * 0.12;\nEND;\n/",
      "why": "A function needs a RETURN type and a RETURN statement that supplies a value."
    }
  },
  {
    "title": "Use triggers carefully",
    "body": [
      "A trigger runs automatically when a defined event occurs, such as inserting or updating a table. It can validate data or record an audit event, depending on the design.",
      "Triggers can hide important behavior from the application code. Keep them focused, document their effects, and avoid using them as a substitute for ordinary business logic."
    ],
    "example": {
      "code": "CREATE OR REPLACE TRIGGER audit_student\nAFTER INSERT ON students\nFOR EACH ROW\nBEGIN\n  INSERT INTO student_audit(student_id, action)\n  VALUES (:NEW.student_id, 'INSERT');\nEND;\n/",
      "caption": "The row trigger records the inserted student's ID."
    },
    "wrong": {
      "code": "CREATE OR REPLACE TRIGGER audit_student\nAFTER INSERT ON students\nBEGIN\n  INSERT INTO student_audit(student_id)\n  VALUES (:NEW.student_id);\nEND;\n/",
      "why": "A statement-level trigger has no :NEW row record. Add FOR EACH ROW when referencing row values."
    }
  }
],
};
