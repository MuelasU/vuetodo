<template>
  <div class="todo">
    <input type="text" placeholder="I have to ..." v-model="title" @keyup.enter="AddItem" />
    <ul>
      <todo-item v-for="todo in todos" v-bind:key="todo" :title="todo"></todo-item>
    </ul>
  </div>
</template>

<script>
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
      if (this.title !== "") {
        this.todos.push(this.title);
        this.title = "";
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
