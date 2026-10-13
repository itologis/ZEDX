// SQL reference content for ZEDX.
//
// Same shape as every other language module (see javascript.js):
//   intro  -> shown on the Intro screen
//   levels -> L1 / L2 / L3, each with a list of topics
//
// Topic ids are prefixed with "sql" (sql1, sql2, ...). They must be unique
// across ALL languages because practice.js and bookmarks look topics up by id.
//
// The examples share one small imaginary database:
//   users(id, name, email, age, city)   orders(id, user_id, total)
//   accounts(id, balance)
//
// The snippets below are plain text shown inside the app. They are never run,
// and SQL differs a little between databases (MySQL, PostgreSQL, SQLite,
// SQL Server). Where it matters, the topic description says so.
export default {
  intro: {
    title: "SQL",
    tagline: "Ask questions of your data.",
    description:
      "SQL (Structured Query Language) is the standard language for storing, querying, and managing data in relational databases such as MySQL, PostgreSQL, SQLite, and SQL Server.",
    useCases: [
      "Querying and reporting on data",
      "Managing relational databases",
      "Data storage for web and mobile apps",
      "Data analysis and business intelligence",
    ],
  },
  levels: [
    {
      level: "L1",
      label: "Beginner",
      topics: [
        {
          id: "sql1",
          title: "SELECT",
          syntax: `SELECT name, age\nFROM users;\n\nSELECT * FROM users;`,
          description:
            "SELECT retrieves data from a table. List the columns you want, or use * to get every column.",
        },
        {
          id: "sql2",
          title: "WHERE",
          syntax: `SELECT * FROM users\nWHERE age >= 18\n  AND city = 'London';\n\nSELECT * FROM users\nWHERE city = 'Paris'\n   OR city = 'Tokyo';`,
          description:
            "WHERE filters rows by a condition. Combine conditions with AND, OR, and NOT, and wrap text values in single quotes.",
        },
        {
          id: "sql3",
          title: "ORDER BY & LIMIT",
          syntax: `SELECT name, age\nFROM users\nORDER BY age DESC\nLIMIT 5;`,
          description:
            "ORDER BY sorts the results (ASC is the default, DESC reverses it). LIMIT caps how many rows come back; SQL Server uses TOP instead, and standard SQL uses FETCH FIRST.",
        },
        {
          id: "sql4",
          title: "INSERT",
          syntax: `INSERT INTO users (name, age, city)\nVALUES ('Alice', 22, 'London');\n\nINSERT INTO users (name, age, city)\nVALUES ('Bob', 30, 'Paris'),\n       ('Cara', 27, 'Tokyo');`,
          description:
            "INSERT INTO adds new rows. Name the columns, then give matching values in the same order. Several rows can be added in one statement.",
        },
        {
          id: "sql5",
          title: "UPDATE & DELETE",
          syntax: `UPDATE users\nSET age = 23, city = 'Paris'\nWHERE name = 'Alice';\n\nDELETE FROM users\nWHERE name = 'Bob';`,
          description:
            "UPDATE changes existing rows and DELETE removes them. Always include a WHERE clause, or the statement affects every row in the table.",
        },
      ],
    },
    {
      level: "L2",
      label: "Intermediate",
      topics: [
        {
          id: "sql6",
          title: "CREATE TABLE",
          syntax: `CREATE TABLE users (\n  id INTEGER PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  email VARCHAR(255) UNIQUE,\n  age INTEGER CHECK (age >= 0),\n  city VARCHAR(100) DEFAULT 'Unknown'\n);\n\nCREATE TABLE orders (\n  id INTEGER PRIMARY KEY,\n  user_id INTEGER NOT NULL,\n  total DECIMAL(10, 2),\n  FOREIGN KEY (user_id) REFERENCES users (id)\n);`,
          description:
            "CREATE TABLE defines a table's columns, data types, and rules called constraints. PRIMARY KEY identifies each row, and FOREIGN KEY links a row to another table. Auto-numbering syntax differs between databases.",
        },
        {
          id: "sql7",
          title: "LIKE, IN & BETWEEN",
          syntax: `SELECT * FROM users\nWHERE name LIKE 'A%';\n\nSELECT * FROM users\nWHERE city IN ('London', 'Paris');\n\nSELECT * FROM users\nWHERE age BETWEEN 18 AND 30;`,
          description:
            "LIKE matches text patterns, where % means any number of characters and _ means exactly one. IN checks a list of values, and BETWEEN checks an inclusive range.",
        },
        {
          id: "sql8",
          title: "Aggregate Functions",
          syntax: `SELECT COUNT(*) AS total_users,\n       AVG(age) AS average_age,\n       MIN(age) AS youngest,\n       MAX(age) AS oldest,\n       SUM(age) AS combined_age\nFROM users;`,
          description:
            "Aggregate functions such as COUNT, SUM, AVG, MIN, and MAX calculate a single value from many rows. AS gives a result column a readable name.",
        },
        {
          id: "sql9",
          title: "GROUP BY & HAVING",
          syntax: `SELECT city, COUNT(*) AS total\nFROM users\nWHERE age >= 18\nGROUP BY city\nHAVING COUNT(*) > 5\nORDER BY total DESC;`,
          description:
            "GROUP BY collects rows into groups so aggregates run once per group. WHERE filters rows before grouping, and HAVING filters the groups afterward.",
        },
        {
          id: "sql10",
          title: "JOINs",
          syntax: `SELECT users.name, orders.total\nFROM users\nINNER JOIN orders\n  ON orders.user_id = users.id;\n\nSELECT users.name, orders.total\nFROM users\nLEFT JOIN orders\n  ON orders.user_id = users.id;`,
          description:
            "JOINs combine rows from two tables using a related column. INNER JOIN keeps only matching rows, while LEFT JOIN keeps every row from the left table even without a match.",
        },
      ],
    },
    {
      level: "L3",
      label: "Advanced",
      topics: [
        {
          id: "sql11",
          title: "Subqueries",
          syntax: `SELECT name, age\nFROM users\nWHERE age > (SELECT AVG(age) FROM users);\n\nSELECT name\nFROM users\nWHERE id IN (SELECT user_id FROM orders);`,
          description:
            "A subquery is a query nested inside another query. It can return a single value, a list of values, or a temporary table for the outer query to use.",
        },
        {
          id: "sql12",
          title: "Indexes",
          syntax: `CREATE INDEX idx_users_city\nON users (city);\n\nCREATE INDEX idx_orders_user\nON orders (user_id);\n\n-- Composite index on two columns\nCREATE INDEX idx_users_city_age\nON users (city, age);`,
          description:
            "Indexes make searches on a column faster at the cost of extra storage and slower writes. Add them to columns used often in WHERE, JOIN, and ORDER BY. A UNIQUE index also blocks duplicate values.",
        },
        {
          id: "sql13",
          title: "Views",
          syntax: `CREATE VIEW adult_users AS\nSELECT id, name, age\nFROM users\nWHERE age >= 18;\n\nSELECT * FROM adult_users;\n\nDROP VIEW adult_users;`,
          description:
            "A view is a saved query that behaves like a virtual table. It simplifies complex queries and can limit which columns people are allowed to see.",
        },
        {
          id: "sql14",
          title: "Transactions",
          syntax: `START TRANSACTION;\n\nUPDATE accounts\nSET balance = balance - 100\nWHERE id = 1;\n\nUPDATE accounts\nSET balance = balance + 100\nWHERE id = 2;\n\nCOMMIT;\n-- Undo everything instead:\n-- ROLLBACK;`,
          description:
            "A transaction groups statements so they all succeed or all fail together. COMMIT saves the changes and ROLLBACK undoes them. SQLite and SQL Server use BEGIN TRANSACTION to start one.",
        },
        {
          id: "sql15",
          title: "Window Functions",
          syntax: `SELECT name,\n       age,\n       ROW_NUMBER() OVER (ORDER BY age DESC) AS row_num,\n       AVG(age) OVER () AS average_age\nFROM users;\n\nSELECT city,\n       name,\n       RANK() OVER (PARTITION BY city ORDER BY age DESC) AS city_rank\nFROM users;`,
          description:
            "Window functions calculate across a set of related rows without collapsing them like GROUP BY does. OVER defines the window, and PARTITION BY splits it into groups.",
        },
      ],
    },
  ],
};
