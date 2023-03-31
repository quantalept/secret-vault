<template>
  <v-container fluid class="fill-height">
    <v-row>
      <!-- column - 1 -->
      <v-col
        class="ma-1 pl-0"
        elevation-6
        style="background-color: #aa5000"
        align="center"
      >
        <v-card class="mx-auto" width="500" height="700">
          <v-list v-model:opened="open">
            <v-list-group value="allvaules">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-poker-chip"
                  title="AllVaults"
                ></v-list-item>
              </template>
              <v-divider /><v-divider /><v-divider />

              <v-list density="compact">
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  :value="item"
                  active-color="primary"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                  </template>

                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item>
              </v-list>

              <v-divider /><v-divider /><v-divider />

              <v-list-group value="Categories">
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props" title="Categories"></v-list-item>
                </template>

                <v-list-item
                  v-for="([title, icon], i) in categories"
                  :key="i"
                  :value="title"
                  :title="title"
                  :prepend-icon="icon"
                ></v-list-item>
              </v-list-group>
            </v-list-group>
          </v-list>
        </v-card>
      </v-col>

      <!-- column - 2 ******************************************************************* -->
      <v-col class="ma-1 pl-0" style="background-color: #ff5000" align="center">
        <v-card class="mx-auto" width="500" height="700" elevation="5">
          <v-text-field
            class="textSize"
            label="Search items"
            append-icon="manage_search"
            outlined
          >
          </v-text-field>
          <div>
            <v-btn
              variant="outlined"
              size="x-large"
              color="primary"
              height="70"
              width="450"
              prepend-icon="mdi-account"
            >
              NetFlix
            </v-btn>
          </div>
          <v-divider /> <v-divider /> <v-divider /> <v-divider /> <v-divider />
          <v-divider /> <v-divider /> <v-divider /> <v-divider /> <v-divider />
          <v-divider /> <v-divider /> <v-divider /> <v-divider /> <v-divider />
          <v-divider /> <v-divider /> <v-divider /> <v-divider /> <v-divider />

          <v-spacer />
          <v-btn
            variant="outlined"
            color="primary"
            height="70"
            width="450"
            prepend-icon="mdi-server"
          >
            Server DB
          </v-btn>
          <v-divider /> <v-divider /> <v-divider /> <v-divider /> <v-divider />
          <v-divider /><v-divider /> <v-divider /> <v-divider /> <v-divider />
          <v-divider /> <v-divider /> <v-divider /> <v-divider /> <v-divider />
          <v-divider /> <v-divider /> <v-divider /> <v-divider /> <v-divider />
          <v-spacer />
          <v-btn
            variant="outlined"
            color="primary"
            height="70"
            width="450"
            prepend-icon="mdi-google"
          >
            Google
          </v-btn>

          <v-divider /> <v-divider /> <v-divider /> <v-divider /> <v-divider />
          <v-divider /> <v-divider /> <v-divider /> <v-divider /> <v-divider />
          <v-divider /> <v-divider /> <v-divider /> <v-divider /> <v-divider />
          <v-divider /> <v-divider /> <v-divider /> <v-divider /> <v-divider />
          <v-spacer />
          <v-btn
            variant="outlined"
            color="primary"
            height="70"
            width="450"
            prepend-icon="mdi-circle"
          >
            API Token
          </v-btn>
        </v-card>
      </v-col>

      <!-- column - 3 -->
      <v-col
        class="ma-1 pl-0"
        cols="5"
        style="background-color: #ff5000"
        align="center"
      >
        <v-card class="mx-auto" width="740" height="700" elevation="5">
          <v-layout align-center>
            <v-flex row>
              <v-list-subheader>Title: </v-list-subheader>
              <v-spacer /> <v-spacer />
            </v-flex>
            <v-text-field
              v-model="title"
              label="Title"
              width="50"
              color="blue"
            ></v-text-field>            
            </v-layout>
            
            <v-layout>
            <v-flex row>
              <v-list-subheader>User Name: </v-list-subheader>
              <v-spacer /> <v-spacer />
            </v-flex>
            <v-text-field
              v-model="username"
              label="UserName"
              width="50"
              color="blue"
            ></v-text-field>
            </v-layout>
          <v-layout>
            <v-flex row>
              <v-list-subheader>Password: </v-list-subheader>
              <v-spacer /> <v-spacer />
            </v-flex>
            <v-text-field
              v-model="password"
              label="Password"
              width="50"
              color="blue"
            ></v-text-field>
            </v-layout>



        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
 <script>
export default {
  data() {
    return {
      open: ["Users"],
      items: [
        { text: "All Items", icon: "mdi-star" },
        { text: "Favorites", icon: "mdi-star" },
        { text: "Frequenty Used", icon: "mdi-heart" },
      ],

      categories: [
        ["Site Credentials"],
        ["Documents"],
        ["Form Data"],
        ["Tokens"],
      ],
    };
  },
};
</script>   
