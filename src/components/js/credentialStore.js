import { getDBInstance } from './database';
import { usecatalogueStore } from '../../store/catalogueStore';
import { innerjoin } from './category';

export async function insertCatalogueToDatabase(selecteditem, selectCred, selectedid) {
  try {
    const db = await getDBInstance();
    const catalogueStore = usecatalogueStore();
    const row = await db.execute(`
          INSERT INTO Credential_Store (cs_name, secondary_info)
          VALUES (?, ?)
        `, [catalogueStore.newItem.title, catalogueStore.newItem.desc]);
    catalogueStore.newItem.id = row.lastInsertId;
    selecteditem.value = catalogueStore.newItem
    await selectCred(catalogueStore.newItem)
    await insertcred_category(catalogueStore.newItem.id, selectedid);

    console.log('Catalogue inserted into the database successfully!');


  } catch (error) {
    console.error('Error inserting Catalogue into the database:', error);
  }
};
export async function insertcred_category(lastInsertId, selectedid) {
  try {
    const db = await getDBInstance();
    await db.execute(`
          INSERT INTO Credential_Category ( cs_id, category_id)  
          VALUES (?,?)
      `, [lastInsertId, selectedid])
    await innerjoin();
    console.log('Cred_cate inserted into the database successfully!');

  } catch (error) {
    console.error('Error loading Catalogue into the database:', error);
  }
}
export async function loadcatalogues(csid) {
  try {
    const db = await getDBInstance();
    const catalogueStore = usecatalogueStore();
    let result;

    if (csid) {
      result = await db.select(`
        SELECT Category.category_name,Credential_Store.cs_name,Credential_Store.secondary_info
        FROM Credential_Category
        INNER JOIN Credential_Store ON  Credential_Category.cs_id=Credential_Store.cs_id
        INNER JOIN Category ON Credential_Category.category_id=Category.category_id
        WHERE Category.category_id = ?
      `, [csid]);
    } else {
      result = await db.select(`
        SELECT * FROM Credential_Store
       `);
    }
    const fields = result.map(row => ({
      title: row.cs_name,
      desc: row.secondary_info,
    }));
    catalogueStore.catalogueListed = fields
  } catch (error) {
    console.error('Error loading Catalogue into the database:', error);
  }
}
export async function deleteFromDatabase (selectedItem)  {
  try {
    const db = await getDBInstance();
    const result = await db.select(`
    SELECT cs_id FROM Credential_Store WHERE cs_name = ? 
    `, [selectedItem.title]);
    if (result.length === 1) {
      const cs_id = result[0].cs_id;
      await db.execute(`
        DELETE FROM Credential_Store WHERE cs_id = ?
      `, [cs_id]);
      console.log('Item deleted successfully!');
      await handleForeignKeyConstraints(cs_id)
      await loadcatalogues()


    } else {
      console.error('Invalid or missing data for selected item.');
    }
  } catch (error) {
    console.error('Error deleting from the database:', error);
  }
}
export async function handleForeignKeyConstraints(cs_id) {
  // Assuming there's another table with a foreign key reference
  // Modify the query and table name accordingly
  try {
    await db.execute(`
      DELETE FROM Credential WHERE cs_id = ?
    `, [cs_id]);
  } catch (error) {
    console.error('Error deleting from OtherTable:', error);
    throw error; // Propagate the error to the calling function
  }
}
