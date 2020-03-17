<template>
  <div class="todo-item">
    <li>
      <i v-if="completed" class="material-icons" @click="Check">check_box</i>
      <i v-else class="material-icons" @click="Check">check_box_outline_blank</i>
      <span>{{title}}</span>
      <i class="material-icons show-on-hover" @click="DeleteMe">close</i>
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
    },
    DeleteMe() {
      this.$emit("crossClicked", this.index);
    }
  }
};
</script>

<style scoped lang="scss">
i {
  cursor: pointer;
}

.show-on-hover {
  transform: scale(0.8);
  visibility: hidden;
  border-radius: 50%;
  transition: background-color 0.2s;
  padding: 6px;
}

li:hover .show-on-hover {
  visibility: visible;
}

.show-on-hover:hover {
  background-color: rgba($color: #000000, $alpha: 0.08);
}
</style>
