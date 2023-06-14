import Database from "tauri-plugin-sql-api";

export async function loadDatabase() {
  try {
    const db = await Database.load("sqlite:test.db");

    // Create the "timetable" table if it doesn't exist
    await db.execute(`
      CREATE TABLE IF NOT EXISTS timetable (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        day TEXT,
        time TEXT
      )
    `);

    return db;
  } catch (error) {
    console.error("Error loading database:", error);
    throw error;
  }
}

export async function insertData(db) {
  try {
    const timetableData = [
      { day: "Monday", time: "9:00 AM" },
      { day: "Tuesday", time: "2:00 PM" },
      { day: "Wednesday", time: "11:00 AM" },
    ];

    for (const record of timetableData) {
      await db.execute(`
        INSERT INTO timetable (day, time)
        VALUES (?, ?)
      `, [record.day, record.time]);
    }

    console.log("Data inserted!");
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}
