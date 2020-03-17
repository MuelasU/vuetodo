<template>
  <div class="todo">
    <input type="text" placeholder="I have to ..." v-model="title" @keyup.enter="AddItem" />
    <draggable
      tag="ul"
      v-model="todos"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group>
        <todo-item
          v-for="(todo, index) in todos"
          :key="todo"
          :title="todo"
          :completed="false"
          :index="index"
          v-on:SetDone="setDone"
          v-on:crossClicked="DeleteTodo"
        ></todo-item>
      </transition-group>
    </draggable>
    <hr v-if="doneTodos.length && todos.length" />
    <draggable
      tag="ul"
      v-model="doneTodos"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group>
        <todo-item
          v-for="(doneTodo, index) in doneTodos"
          :key="doneTodo"
          :title="doneTodo"
          :completed="true"
          :index="index"
          v-on:SetTodo="setTodo"
          v-on:crossClicked="DeleteDone"
        ></todo-item>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "Todo",
  data() {
    return {
      title: "",
      drag: false,
      todos: ["Pratice more Vue.js", "Kill Corona virus"],
      doneTodos: ["Join unichamps"]
    };
  },
  methods: {
    AddItem() {
      if (this.title !== "") {
        this.todos.push(this.title);
        this.title = "";
      }
    },
    setTodo(index, title) {
      this.DeleteDone(index);
      this.todos.push(title);
    },
    setDone(index, title) {
      this.DeleteTodo(index);
      this.doneTodos.push(title);
    },
    DeleteTodo(index) {
      this.todos.splice(index, 1);
    },
    DeleteDone(index) {
      this.doneTodos.splice(index, 1);
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  components: {
    "todo-item": require("./Todo_Item").default,
    draggable
  }
};
</script>

<style scoped lang="scss">
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group-item {
  cursor: move;
}
</style>
