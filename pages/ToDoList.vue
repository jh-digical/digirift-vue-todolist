<template>
  <v-app class="todolist-page">
    <v-main class="body-section">
      <div class="title-wrap">
        <h1>Vue ToDo List</h1>
      </div>
      <v-card class="card-wrap rounded-0 mx-auto">
        <v-card-title class="grey lighten-3 justify-end pa-0 px-2">
          <v-chip class="ma-1" color="blue darken-2" text-color="white">
            Tasks
            <v-avatar right color="white">
              <span class="blue--text text--darken-2">1</span>
            </v-avatar>
          </v-chip>
          <v-chip class="ma-1" color="blue darken-2" text-color="white">
            Tasks Done
            <v-avatar right color="white">
              <span class="blue--text text--darken-2">0</span>
            </v-avatar>
          </v-chip>
          <v-hover v-slot="{ hover }">
            <v-btn
              class="del-btn text-capitalize px-2 ml-1 mr-2"
              height="32px"
              color="error"
              tile
              :class="{ 'on-hover': hover }"
            >
              <v-icon dark left>mdi-delete</v-icon>Tasks Done
            </v-btn>
          </v-hover>
          <v-hover v-slot="{ hover }">
            <v-btn
              class="del-btn text-capitalize px-2"
              height="32px"
              color="error"
              tile
              :class="{ 'on-hover': hover }"
            >
              <v-icon dark left>mdi-delete</v-icon>Tasks
            </v-btn>
          </v-hover>
        </v-card-title>
        <v-card-text class="pt-4">
          <v-hover v-slot="{ hover }">
            <div
              class="todo-item flex items-center"
              :class="{ 'on-hover': hover }"
            >
              <v-btn text icon color="green accent-4">
                <v-icon>mdi-check-circle</v-icon>
              </v-btn>
              <p>Do something awesome!</p>
              <v-btn
                v-show="hover"
                text
                icon
                color="red"
                class="del-btn ml-auto"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </v-hover>
        </v-card-text>
        <v-card-actions class="grey lighten-3 px-4 py-3">
          <div class="input-grp relative">
            <input type="text" placeholder="New task" />
            <v-hover v-slot="{ hover }">
              <v-btn
                color="blue darken-2"
                text
                icon
                x-large
                :class="{ 'on-hover': hover }"
                class="add-btn"
              >
                <v-icon>mdi-plus-circle</v-icon>
              </v-btn>
            </v-hover>
          </div>
        </v-card-actions>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
export default {}
</script>
