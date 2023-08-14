import Database from 'tauri-plugin-sql-api';

let dbInstance = null;

export async function getDBInstance() {
  if (!dbInstance) {
    dbInstance = await Database.load("sqlite:store.db");
    
  }
  return dbInstance;
}

export async function createAndLoadDatabase() {
  const db = await getDBInstance();

  // Create tables and load the database (if not already done)
  await db.execute(`
    CREATE TABLE IF NOT EXISTS Vault (
      vault_id INTEGER PRIMARY KEY,
      vault_name TEXT,
      vault_config TEXT
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS Category (
      category_id INTEGER PRIMARY KEY,
      category_name TEXT,
      category_icon TEXT
    )
  `);

  await db.execute(`
  CREATE TABLE IF NOT EXISTS Credential_Store (
    cs_id INTEGER PRIMARY KEY,
    cs_name TEXT,
    secondary_info TEXT
  )
`);

await db.execute(`
  CREATE TABLE IF NOT EXISTS Credential (
    credential_id INTEGER PRIMARY KEY,
    cs_id INTEGER,
    credential_label TEXT,
    credential_value TEXT,
    type TEXT,
    FOREIGN KEY (cs_id) REFERENCES Credential_Store(cs_id)
  )
`);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS Credential_Category (
      id INTEGER PRIMARY KEY,
      cs_id INTEGER,
      category_id INTEGER,
      FOREIGN KEY (cs_id) REFERENCES Credential_Store(cs_id),
      FOREIGN KEY (category_id) REFERENCES Category(category_id)
    )
  `);

  console.log('Tables created and data loaded successfully!');
}
