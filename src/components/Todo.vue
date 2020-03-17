<template>
  <div class="todo">
    <input type="text" placeholder="I have to ..." v-model="title" @keyup.enter="AddItem" />
    <ul>
      <todo-item
        v-for="(todo, index) in todos"
        :key="todo"
        :title="todo"
        :completed="false"
        :index="index"
        v-on:SetDone="setDone"
        v-on:crossClicked="DeleteTodo"
      ></todo-item>
    </ul>
    <hr v-if="doneTodos.length && todos.length" />
    <ul class="done">
      <todo-item
        v-for="(doneTodo, index) in doneTodos"
        :key="doneTodo"
        :title="doneTodo"
        :completed="true"
        :index="index"
        v-on:SetTodo="setTodo"
        v-on:crossClicked="DeleteDone"
      ></todo-item>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Todo",
  data() {
    return {
      title: "",
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
  components: {
    "todo-item": require("./Todo_Item").default
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
