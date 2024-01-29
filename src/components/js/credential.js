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
      // Entry exists, perform an update
      for (const field of credentialStore.credData.fields) {
        await db.execute(`
            UPDATE Credential
            SET credential_value = ?
            WHERE cs_id= ? AND credential_label = ?
          `, [field.value, csid, field.label]);

      }
      console.log('Updated the database entry successfully!');
    } else {
      //  perform an new insert
      for (const field of credentialStore.credData.fields) {
        await db.execute(`
            INSERT INTO Credential (cs_id, credential_label, credential_value, type)
            VALUES (?, ?, ?, ?)
          `, [csid, field.label, field.value, field.valueType]);
      }
      console.log('Inserted into the database successfully!');
    }
  } catch (error) {
    console.error('Error interacting with the database:', error);
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