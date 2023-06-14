<template>
    <div>
      <h2>Timetable</h2>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in timetableData" :key="record.id">
            <td>{{ record.day }}</td>
            <td>{{ record.time }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="loadTimetable">Load Timetable</button>
    </div>
  </template>
  
  <script>
  import { loadDatabase, insertData } from "./database";
  
  export default {
    data() {
      return {
        timetableData: [],
      };
    },
    methods: {
      async loadTimetable() {
        try {
          const db = await loadDatabase();
          await insertData(db);
          const result = await db.execute(`SELECT * FROM timetable`);
          this.timetableData = result.rows;
        } catch (error) {
          console.error("Error loading timetable:", error);
        }
      },
    },
  };
  </script>
  