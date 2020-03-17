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
        <todo-item v-for="todo in todos" :key="todo" :title="todo">{{ todo }}</todo-item>
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
      todos: ["Pratice more Vue.js"],
      drag: false
    };
  },
  methods: {
    AddItem() {
      this.todos.push(this.title);
      this.title = "";
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
