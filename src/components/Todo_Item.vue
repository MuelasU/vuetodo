<template>
  <div class="todo-item">
    <li>
      <span>{{title}}</span>
    </li>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    title: String
  }
};
</script>

<style scoped lang="scss">
</style>
