<template>
    <div>
      <h1>SQLite</h1>
      <v-btn @click="createAndLoadDatabase">Create and Load Database</v-btn>
    </div>
  </template>
  
  <script>
  import Database from 'tauri-plugin-sql-api';
  import { invoke } from '@tauri-apps/api/tauri';
  
  const ENCRYPT_DATA = 'encrypt_data';
  const DECRYPT_DATA = 'decrypt_data';
  
  export default {
    data() {
      return {
        loading: false,
        error: null,
        users: [],
      };
    },
    methods: {
      async createAndLoadDatabase() {
        try {
          this.loading = true;
          this.error = null;
  
          // Create a new SQLite database
          const db = await Database.load("sqlite:test.db");
  
          // Create a new table if it doesn't exist
          await db.execute(`
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY,
              name TEXT,
              email TEXT,
              encrypted TEXT
            )
          `);
          await db.execute(`
            INSERT INTO users (name, email, encrypted)
            VALUES ('John', 'john@example.com', 'encrypted_data_1')
          `);
          await db.execute(`
            INSERT INTO users (name, email, encrypted)
            VALUES ('Smith', 'jane@example.com', 'encrypted_data_2')
          `);
          console.log('Table created and data loaded successfully!');
          // Fetch the table data
          const result = await db.execute('SELECT id, name, email, encrypted FROM users');
          console.log('Result:', result);

          if (result && Array.isArray(result.rows)) {
  const users = result.rows.map(async (row) => {
    console.log('Original Data:', row.name, row.email);

    // Decrypt the data
    const decryptedData = await invoke(DECRYPT_DATA, {
      encryptedData: row.encrypted,
      masterPassword: 'richi',
    });
    console.log('Decrypted Data:', decryptedData);

    return {
      id: row.id,
      name: row.name,
      email: row.email,
      decrypted: decryptedData,
    };
  });

  this.users = await Promise.all(users);
} else {
  this.users = [];
}


        } catch (error) {
          console.error('Error creating and loading the table:', error);
          this.error = error.message;
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  