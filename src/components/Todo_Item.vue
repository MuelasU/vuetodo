<template>
  <div class="todo-item">
    <li>
      <span>{{title}}</span>
      <i class="material-icons" @click="GoUp">keyboard_arrow_up</i>
      <i class="material-icons" @click="GoDown">keyboard_arrow_down</i>
    </li>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    title: String,
    index: Number
  },
  methods: {
    GoUp() {
      this.$emit("itemUp", this.index);
    },
    GoDown() {
      this.$emit("itemDown", this.index);
    }
  }
};
</script>

<style scoped lang="scss">
i {
  cursor: pointer;
}
</style>
