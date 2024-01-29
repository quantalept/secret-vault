<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-list dense>
            <v-list-item-group v-if="items.length > 0">
              <v-list-item v-for="(item, index) in items" :key="index" :class="{ 'blue--text': index === lastClickedIndex }">
                <v-list-item-content @click="setLastClicked(index)">
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn @click="showDeleteDialog(index)" icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
            <v-list-item v-else>
              <v-list-item-content>No items</v-list-item-content>
            </v-list-item>
          </v-list>

          <v-dialog v-model="deleteDialog" max-width="400">
            <v-card>
              <v-card-title>Delete Item</v-card-title>
              <v-card-text>
                <v-select
                  v-model="selectedItemIndex"
                  :items="items.map((item, index) => ({ text: item, value: index }))"
                  label="Select item to delete"
                ></v-select>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="deleteItem" color="red darken-1">Delete</v-btn>
                <v-btn @click="closeDeleteDialog" color="blue darken-1">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-form @submit.prevent="addItem">
            <v-text-field v-model="newItem" label="Add an item"></v-text-field>
            <v-btn type="submit" :disabled="newItem === ''">Add</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      newItem: '',
      deleteDialog: false,
      selectedItemIndex: null,
      lastClickedIndex: null,
    };
  },
  methods: {
    addItem() {
      if (this.newItem !== '') {
        this.items.push(this.newItem);
        this.newItem = '';
        this.setLastClicked(this.items.length - 1);
      }
    },
    setLastClicked(index) {
      this.lastClickedIndex = index;
    },
    showDeleteDialog(index) {
      this.selectedItemIndex = index;
      this.deleteDialog = true;
    },
    deleteItem() {
      if (this.selectedItemIndex !== null) {
        this.items.splice(this.selectedItemIndex, 1);
        this.closeDeleteDialog();
      }
    },
    closeDeleteDialog() {
      this.selectedItemIndex = null;
      this.deleteDialog = false;
    },
  },
};
</script>

<style>
</style>
