import { useCredentialStore } from '../../store/credential';
import { getDBInstance } from './database';


export async function saveCredentialToDatabase(csid) {
  try {
    const db = await getDBInstance();
    const credentialStore = useCredentialStore();
    const existingEntry = await db.select(`
        SELECT * FROM Credential
        WHERE cs_id = ?
      `, [csid]);
    if (existingEntry.length > 0) {
      for (const field of credentialStore.credData.fields) {
        await db.execute(`
            UPDATE Credential
            SET credential_value = ?,
                credential_label = ?
            WHERE credential_id = ?
          `, [field.value,field.label,field.id]);
      }
      await insertNewfield(csid)
      console.log('Updated the database entry successfully!');
    } else {
      for (const field of credentialStore.credData.fields) {
        await db.execute(`
            INSERT INTO Credential (cs_id, credential_label, credential_value, type)
            VALUES (?, ?, ?, ?)
          `, [csid, field.label, field.value, field.valueType]);
          field.id = field.lastInsertId;
      }
      console.log('Saved into the database successfully!');
    }
  } catch (error) {
    console.error('Error interacting with the database:', error);
  }
};
export async function insertNewfield(csid) {
  try {
    const db = await getDBInstance();
    const credentialStore = useCredentialStore();
    const newField = credentialStore.credData.newField;
    await db.execute(`
          INSERT INTO Credential (cs_id, credential_label, credential_value, type)
          VALUES (?, ?, ?, ?)
        `, [csid, newField.label, newField.value, newField.valueType]);
       
    console.log('Inserted into the database successfully!');
  } catch (error) {
    console.error('Error inserting into the database:', error);
  }
};

export async function loadCredentialData(csid) {
  try {
    const db = await getDBInstance();
    const credentialStore = useCredentialStore();
    const result = await db.select(`
        SELECT * FROM Credential WHERE cs_id = ?
      `, [csid]);

    const fields = result.map(row => ({
      id: row.credential_id,
      label: row.credential_label,
      value: row.credential_value,
      valueType: row.type,
    }));

    if (fields.length === 0) {
      credentialStore.credData.fields = [
        { label: 'User Name', value: '', valueType: 'text' },
        { label: 'Password', value: '', valueType: 'Password' },
      ];
    } else {
      credentialStore.credData.fields = fields;
    }
  } catch (error) {
    console.error('Error loading credential data:', error);
  }
};
export async function deleteFromDatabase(id) {
  try {
    const credentialStore = useCredentialStore()
    const db = await getDBInstance();
    await db.execute(`
        DELETE FROM Credential WHERE credential_id = ?;
      `, [id]);
    console.log('Item deleted successfully!');
    credentialStore.removeField(id)
  } catch (error) {
    console.error('Error deleting from the database:', error);
  }
}