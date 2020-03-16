<template>
  <div class="todo">
    <input type="text" placeholder="I have to ..." v-model="title" @keyup.enter="AddItem" />
    <ul>
      <todo-item
        v-for="(todo, index) in todos"
        v-bind:key="index"
        v-bind:title="todo"
        v-bind:index="index"
        v-on:itemUp="ItemGoUp"
        v-on:itemDown="ItemGoDown"
      ></todo-item>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "Todo",
  data() {
    return {
      title: "",
      todos: ["Pratice more Vue.js"]
    };
  },
  methods: {
    AddItem() {
      this.todos.push(this.title);
      this.title = "";
    },
    ItemGoUp(index) {
      if (index !== 0) {
        var deCima = this.todos[index - 1];
        var esse = this.todos[index];
        Vue.set(this.todos, index, deCima);
        Vue.set(this.todos, index - 1, esse);
      }
    },
    ItemGoDown(index) {
      if (index !== this.todos.length - 1) {
        var deBaixo = this.todos[index + 1];
        var esse = this.todos[index];
        Vue.set(this.todos, index, deBaixo);
        Vue.set(this.todos, index + 1, esse);
      }
    }
  },
  components: {
    "todo-item": require("./Todo_Item").default
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
