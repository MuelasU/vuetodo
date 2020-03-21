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
    <div v-if="doneTodos.length && todos.length" class="list-divider">
      <hr />
      <span>Already done</span>
    </div>
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
.todo {
  text-align: left;
  margin: auto;
  width: 30%;
  min-width: 400px;
  border: solid 1px rgba(0, 0, 0, 0.555);
  border-radius: 15px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.13);
  background-color: #fff;
  padding-top: 20px;
}

ul {
  padding: 0;
}

input {
  display: block;
  margin: auto;
  align-self: center;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.356);
  font-size: 18px;
  width: 270px;
  max-width: 96%;
}

input:focus {
  outline: none;
}

.list-divider {
  color: rgba(40, 42, 59, 0.678);
}

.list-divider span {
  cursor: default;
  margin-left: 30px;
}

hr {
  margin: 10px 20px;
}

.ghost {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.26);
}

.list-group-item {
  cursor: move;
}
</style>
