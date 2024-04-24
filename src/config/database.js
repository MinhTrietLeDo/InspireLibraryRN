// database.js
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const databaseName = 'MyDatabase.db';

let dbInstance = null;

export const initDB = async () => {
  if (dbInstance) return dbInstance; // Use existing db instance if already created

  try {
    dbInstance = await SQLite.openDatabase({
      name: databaseName,
      location: 'default',
    });
    console.log('Database opened:', dbInstance);

    // Create the Users table if it doesn't exist
    const query = `CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    );`;

    await dbInstance.executeSql(query);
    console.log('Table created');
    return dbInstance;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error; // or handle it as needed
  }
};

export const addUser = async (username, password) => {
  if (!dbInstance) {
    console.error('Database instance is not ready.');
    throw new Error('Database instance is not ready.');
  }

  try {
    const insertSQL = 'INSERT INTO Users (username, password) VALUES (?, ?)';
    const results = await dbInstance.executeSql(insertSQL, [
      username,
      password,
    ]);

    if (results[0].rowsAffected > 0) {
      console.log('User added successfully:', results[0].insertId);
      return results[0].insertId;
    } else {
      console.log('Failed to add user: no rows affected.');
      return null;
    }
  } catch (error) {
    console.error('Error adding user:', error);
    throw error; // or handle it as needed
  }
};

export const loginUser = async (username, password) => {
  if (!dbInstance) {
    return {
      success: false,
      message: 'Service currently unavailable. Please try again later.',
    };
  }

  if (!username || !password) {
    return {success: false, message: 'Username and password are required.'};
  }

  try {
    const selectSQL = 'SELECT * FROM Users WHERE username = ? LIMIT 1';
    const results = await dbInstance.executeSql(selectSQL, [username]);

    if (results[0].rows.length > 0) {
      const user = results[0].rows.item(0);
      const isPasswordCorrect = password === user.password; // Adjust to use password hashing

      if (isPasswordCorrect) {
        return {success: true, message: 'Login successful.'};
      } else {
        return {success: false, message: 'Incorrect password.'};
      }
    } else {
      return {success: false, message: 'Account does not exist.'};
    }
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Service currently unavailable. Please try again later.',
    };
  }
};

export const doesUserExist = async username => {
  const db = await initDB();

  const query = 'SELECT username FROM Users WHERE username = ?';
  const results = await db.executeSql(query, [username]);

  const userExists = results[0].rows.length > 0;
  return userExists;
};
