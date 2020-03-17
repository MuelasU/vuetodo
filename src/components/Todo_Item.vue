<template>
  <div class="todo-item">
    <li>
      <i v-if="completed" class="material-icons" @click="Check">check_box</i>
      <i v-else class="material-icons" @click="Check">check_box_outline_blank</i>
      <span>{{title}}</span>
    </li>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    title: String,
    index: Number,
    completed: Boolean
  },
  methods: {
    Check() {
      if (this.completed) {
        this.$emit("SetTodo", this.index, this.title);
      } else {
        this.$emit("SetDone", this.index, this.title);
      }
    }
  }
};
</script>

<style scoped lang="scss">
i {
  cursor: pointer;
}
</style>
