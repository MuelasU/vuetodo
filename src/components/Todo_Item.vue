<template>
  <div class="todo-item">
    <li>
      <i class="material-icons" @click="Check">check_box_outline_blank</i>
      <span>{{title}}</span>
    </li>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    title: String
  },
  data() {
    return {
      completed: false
    };
  },
  methods: {
    Check(e) {
      if (this.completed) {
        e.target.innerText = "check_box_outline_blank";
        this.completed = false;
      } else {
        e.target.innerText = "check_box";
        this.completed = true;
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
