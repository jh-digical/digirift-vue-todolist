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
              <span class="blue--text text--darken-2">{{
                totalItems ? totalItems : 0
              }}</span>
            </v-avatar>
          </v-chip>
          <v-chip class="ma-1" color="blue darken-2" text-color="white">
            Tasks Done
            <v-avatar right color="white">
              <span class="blue--text text--darken-2">{{
                tasksDone ? tasksDone : 0
              }}</span>
            </v-avatar>
          </v-chip>
          <v-hover v-slot="{ hover }">
            <v-btn
              v-show="hasDone"
              class="del-btn text-capitalize px-2 ml-1 mr-2"
              height="32px"
              color="error"
              tile
              :class="{ 'on-hover': hover }"
              @click="deleteAllDone"
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
              @click="deleteAllItems"
            >
              <v-icon dark left>mdi-delete</v-icon>Tasks
            </v-btn>
          </v-hover>
        </v-card-title>
        <v-card-text class="todo-list pt-4">
          <template v-for="(item, index) in todos">
            <v-hover v-slot="{ hover }" :key="index">
              <div
                class="todo-item flex items-center"
                :class="{ 'on-hover': hover }"
              >
                <v-btn
                  text
                  icon
                  :color="
                    item.status.done ? 'grey lighten-1' : 'green accent-4'
                  "
                  @click="updateItemStatus(item)"
                >
                  <v-icon>mdi-check-circle</v-icon>
                </v-btn>
                <p
                  :class="{
                    'text-decoration-line-through': item.status.done,
                    'grey--text text-lighten-1': item.status.done,
                  }"
                >
                  {{ item.name }}
                </p>
                <v-btn
                  v-show="hover"
                  text
                  icon
                  color="red"
                  class="del-btn ml-auto"
                  @click="deleteItem(item.id)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-hover>
          </template>
        </v-card-text>
        <v-card-actions class="grey lighten-3 px-4 py-3">
          <div class="input-grp relative">
            <input v-model="newTaskName" type="text" placeholder="New task" />
            <v-hover v-slot="{ hover }">
              <v-btn
                color="blue darken-2"
                text
                icon
                x-large
                :class="{ 'on-hover': hover }"
                class="add-btn"
                @click="addNewTask"
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
import { mapState, mapActions } from 'vuex'
import _some from 'lodash/some'
import _filter from 'lodash/filter'
import _size from 'lodash/size'
import _remove from 'lodash/remove'
import _maxBy from 'lodash/maxBy'
import { todoData } from '@/services/data'

export default {
  data() {
    return {
      highestIdValue: 0,
      newTaskName: '',
    }
  },

  computed: {
    ...mapState({
      todos: (state) => state.data,
      totalItems: (state) => state.totalItems,
      hasDone: (state) => state.hasDone,
      tasksDone: (state) => state.tasksDone,
      lastId: (state) => state.lastId,
    }),
  },

  mounted() {
    try {
      if (todoData.data.length) {
        this.setData(todoData.data)
        this.setTotalItems(todoData.data.length)
        this.toggleHasDone(_some(todoData.data, { status: { done: true } }))

        // filter items with status.done: true
        const doneItems = _filter(todoData.data, { status: { done: true } })
        this.setTotalTasksDone(_size(doneItems))

        // find item with the highest id
        this.setLastId(this.getHighestIdValue(todoData.data))
      } else throw new Error('No data found')
    } catch (error) {
      window.alert(error)
    }
  },

  methods: {
    ...mapActions([
      'setData',
      'setTotalItems',
      'toggleHasDone',
      'setTotalTasksDone',
      'setLastId',
    ]),

    updateItemStatus(item) {
      const itemIndex = this.$store.state.data.findIndex(
        (i) => i.id === item.id
      )
      // deep copy
      const updatedItem = JSON.parse(
        JSON.stringify(this.$store.state.data[itemIndex])
      )
      updatedItem.status.done = !updatedItem.status.done

      // deep copy
      const updatedItems = JSON.parse(JSON.stringify(this.$store.state.data))
      updatedItems[itemIndex] = updatedItem
      this.$store.dispatch('updateData', updatedItems)
      this.updateStateCounters(updatedItems)
    },

    deleteItem(id) {
      // deep copy
      const updatedItems = JSON.parse(JSON.stringify(this.$store.state.data))
      // delete the item with the specified id
      _remove(updatedItems, { id })

      this.$store.dispatch('updateData', updatedItems)
      this.updateStateCounters(updatedItems)
    },

    deleteAllDone() {
      // deep copy
      const updatedItems = JSON.parse(JSON.stringify(this.$store.state.data))
      // delete all done items
      _remove(updatedItems, (item) => item.status.done)

      this.$store.dispatch('updateData', updatedItems)
      this.updateStateCounters(updatedItems)
    },

    deleteAllItems() {
      const updatedItems = []
      this.$store.dispatch('updateData', updatedItems)
      this.updateStateCounters(updatedItems)
    },

    addNewTask() {
      if (!this.newTaskName) {
        window.alert('Please enter a task name.')
        return
      }

      // deep copy
      let updatedItems = JSON.parse(JSON.stringify(this.$store.state.data))

      const newId = this.lastId + 1

      const newItem = {
        id: newId,
        name: this.newTaskName,
        status: {
          done: false,
        },
      }

      updatedItems = [...updatedItems, newItem]
      this.$store.dispatch('updateData', updatedItems)
      this.updateStateCounters(updatedItems)
      this.setLastId(newId)
      this.newTaskName = ''
    },

    updateStateCounters(updatedItems) {
      this.setTotalItems(_size(updatedItems))
      this.toggleHasDone(_some(updatedItems, { status: { done: true } }))
      const doneItems = _filter(updatedItems, { status: { done: true } })
      this.setTotalTasksDone(_size(doneItems))
    },

    getHighestIdValue(items) {
      // find item with the highest id
      const maxIdItem = _maxBy(items, 'id')
      const highestId = maxIdItem ? maxIdItem.id : null
      return highestId
    },
  },
}
</script>
