import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("todos.db");

export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                text TEXT,
                category TEXT,
                completed BOOLEAN
              );`
    );
  });
};

export const insertTodo = (text, category, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO todos (text, category, completed) VALUES (?, ?, ?)`,
      [text, category, false],
      (_, result) => callback(result),
      (_, error) => console.log("Error inserting todo:", error)
    );
  });
};

export const toggleTodoInDB = (id, completed, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE todos SET completed = ? WHERE id = ?;",
      [completed, id],
      (_, result) => {
        callback(result);
      },
      (tx, error) => {
        console.error("Error toggling todo", error);
      }
    );
  });
};

export const deleteTodoFromDB = (id, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `DELETE FROM todos WHERE id = ?`,
      [id],
      (_, result) => callback(result),
      (_, error) => console.log("Error deleting todo:", error)
    );
  });
};

export const getTodos = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM todos`,
      [],
      (_, { rows }) => callback(rows._array),
      (_, error) => console.log("Error fetching todos:", error)
    );
  });
};
