<template>
  <h1>SQLite</h1>
  <v-btn @click="createAndLoadDatabase">Create and Load Database</v-btn>
</template>

<script>

import Database from 'tauri-plugin-sql-api';

export default {
  data() {
    return {
      loading: false,
      error: null,
      users: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' }
      ]
    };
  },
  methods: {
    async createAndLoadDatabase() {
      try {
        this.loading = true;
        this.error = null;

        // Create a new SQLite database
        const db = await Database.load("sqlite:test.db");
        console.log('db obj',db)


        // Create a new table if it doesn't exist
        await db.execute(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT,
            email TEXT
          )
        `);
        await db.execute(`
          INSERT INTO users (name, email)
          VALUES ('John ', 'john@example.com')
        `);
        await db.execute(`
          INSERT INTO users (name, email)
          VALUES ('Smith', 'jane@example.com')
        `);
        await db.execute(`
          INSERT INTO users (name, email)
          VALUES ('mike', 'mike@example.com')
        `);
        await db.execute(`
          INSERT INTO users (name, email)
          VALUES ('will', 'will@example.com')
        `);
        await db.execute(`
          INSERT INTO users (name, email)
          VALUES ('jane', 'jane@example.com')
        `);
        await db.execute(`
          INSERT INTO users (name, email)
          VALUES ('lucus', 'lucus@example.com')
        `);
        await db.execute(`
          INSERT INTO users (name, email)
          VALUES ('dustin', 'dustin@example.com')
        `);
        await db.execute(`
          INSERT INTO users (name, email)
          VALUES ('nancy', 'nancy@example.com')
        `);
        await db.execute(`
          INSERT INTO users (name, email)
          VALUES ('jay', 'jayy@example.com')
        `);


        console.log('Table created and data loaded successfully!');

        // Fetch the table data
        const result = await db.execute('SELECT id, name, email FROM users');
        console.log('Result:', result);

        if (result && Array.isArray(result.rows)) {
          const users = result.rows.map((row) => ({
            id: row.id,
            name: row.name,
            email: row.email
          }));

          this.users = users;
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
  },

};

</script>
