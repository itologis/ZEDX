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
            id: "sql6",
            title: "CREATE TABLE",
            syntax: `CREATE TABLE users (\n  id INTEGER PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  age INTEGER,\n  city VARCHAR(100)\n);`,
            description:
              "CREATE TABLE defines a table's columns and data types. PRIMARY KEY identifies each row, and NOT NULL requires a value. This Beginner example uses one table; relationships and advanced constraints come later.",
          },
        {
            id: "sql4",
            title: "INSERT",
            syntax: `INSERT INTO users (name, age, city)\nVALUES ('Alice', 22, 'London');\n\nINSERT INTO users (name, age, city)\nVALUES ('Bob', 30, 'Paris'),\n       ('Cara', 27, 'Tokyo');`,
            description:
              "INSERT INTO adds new rows. Name the columns, then give matching values in the same order. Several rows can be added in one statement.",
          },
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
            id: "sql5",
            title: "UPDATE & DELETE",
            syntax: `UPDATE users\nSET age = 23, city = 'Paris'\nWHERE name = 'Alice';\n\nDELETE FROM users\nWHERE name = 'Bob';`,
            description:
              "UPDATE changes existing rows and DELETE removes them. Always include a WHERE clause, or the statement affects every row in the table.",
          }
      ],
    },
    {
      level: "L2",
      label: "Intermediate",
      topics: [
        {
            "id": "sql16",
            "title": "Database Design, ERDs & Normalization",
            "syntax": "STUDENT(student_id, name)\nCOURSE(course_id, title)\nENROLLMENT(student_id, course_id, enrolled_at)",
            "description": "Database design models entities, attributes, relationships, and keys before tables are created. Entity relationship diagrams help communicate the structure, while normalization reduces avoidable duplication and update anomalies."
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
        {
            "id": "sql17",
            "title": "DISTINCT & Set Operations",
            "syntax": "SELECT DISTINCT city FROM students;\nSELECT student_id FROM current_students\nUNION\nSELECT student_id FROM alumni;",
            "description": "DISTINCT removes duplicate rows from a query result. Set operations such as UNION, UNION ALL, INTERSECT, and MINUS combine compatible result sets."
          },
        {
            "id": "sql18",
            "title": "Single-Row & Date Functions",
            "syntax": "SELECT UPPER(name), LENGTH(name), ROUND(amount, 2)\nFROM orders;\n\nSELECT CURRENT_DATE FROM dual;",
            "description": "Single-row functions transform one value at a time and return one result for each input row. Common groups include character, numeric, date, conversion, and general functions."
          },
        {
            "id": "sql19",
            "title": "CASE Expressions",
            "syntax": "SELECT name,\n       CASE\n         WHEN score >= 75 THEN 'Pass'\n         ELSE 'Retry'\n       END AS result\nFROM students;",
            "description": "CASE expressions add conditional logic to SQL results. They can return different values depending on conditions, making them useful for labels, categories, and conditional calculations."
          }
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


          {
            "id": "sql20",
            "title": "ALTER TABLE & Constraints",
            "syntax": "ALTER TABLE students\nADD email VARCHAR2(255);\n\nALTER TABLE students\nADD CONSTRAINT uq_students_email UNIQUE (email);",
            "description": "ALTER TABLE changes an existing table's structure. Constraints enforce rules such as primary keys, foreign keys, uniqueness, required values, and checks at the database level."
          },
          {
            "id": "sql21",
            "title": "DCL: Users, Roles & Privileges",
            "syntax": "CREATE USER analyst IDENTIFIED BY password_value;\nGRANT CREATE SESSION TO analyst;\nGRANT SELECT ON students TO analyst;\nREVOKE SELECT ON students FROM analyst;",
            "description": "Data Control Language manages database privileges. GRANT assigns permissions and REVOKE removes them, while roles group privileges for easier administration."
          },
          {
            "id": "sql22",
            "title": "PL/SQL Blocks, Variables & Control Flow",
            "syntax": "DECLARE\n  v_total NUMBER := 0;\nBEGIN\n  v_total := 10 + 5;\n  DBMS_OUTPUT.PUT_LINE(v_total);\nEND;\n/",
            "description": "PL/SQL is Oracle's procedural extension to SQL. A block can declare variables, run SQL statements, use conditions and loops, and handle exceptions."
          },
          {
            "id": "sql23",
            "title": "Cursors, Procedures, Functions & Triggers",
            "syntax": "CREATE OR REPLACE PROCEDURE show_total IS\n  v_total NUMBER;\nBEGIN\n  SELECT SUM(amount) INTO v_total FROM orders;\n  DBMS_OUTPUT.PUT_LINE(v_total);\nEND;\n/",
            "description": "Cursors process query result rows. Procedures perform named operations, functions return values, and triggers run automatically in response to database events."
          }

],
    },
  ],
};
