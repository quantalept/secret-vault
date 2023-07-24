<template>
  <v-card height="100%" color="primary">
    <v-form class="px-3" v-if="selectedCred">
      <v-card-text>
        <v-row>
          <v-label class="ml-16 mr-10">Title:</v-label>
          <v-col cols="12" sm="4">
            <v-text-field
              append-inner-icon="mdi-pencil"
              v-model="credData.title"
              class="mt-4"
              variant="solo"
              density="compact"
            />
          </v-col>
          <v-spacer></v-spacer>
          <v-btn class="mt-5 md-5" icon="mdi-plus" @click="addTextField()">
          </v-btn>
          <v-btn class="mt-5 md-5 ml-2" icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </v-row>
        <v-divider />
        <div
          v-for="(field, index) in credData.fields"
          :key="index"
          class="creds-view"
        >
          <secret-row
            :label="field.label"
            :value="field.value"
            :valueType="field.valueType"
          />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn>Cancel</v-btn>
        <v-btn>Save</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
import SecretRow from "./SecretRow.vue";

export default {
  props: {
    selectedCred: Object,
  },
  components: {
    SecretRow,
  },
  setup() {
    const credData = {
      title: "Netflix",
      fields: [
        {
          label: "User Name",
          value: "testuser",
          valueType: "text",
        },
        {
          label: "Password",
          value: "password",
          valueType: "password",
        },
        {
          label: "PIN",
          value: "600041",
          valueType: "password",
        },
      ],
    };

    return {
      credData,
      isFavorite: false,
    };
  },
};
</script>
<style scoped>.credential-pane {
}
.creds-view {
  margin-top: 20px;
}
</style>