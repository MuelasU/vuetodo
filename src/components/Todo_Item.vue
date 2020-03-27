<template>
  <div class="todo-item">
    <li v-if="completed">
      <i class="material-icons drag">drag_indicator</i>
      <i class="material-icons" @click="Check">check_box</i>
      <span>
        <strike>{{title}}</strike>
      </span>
      <i class="material-icons cross" @click="DeleteMe">close</i>
    </li>
    <li v-else>
      <i class="material-icons drag">drag_indicator</i>
      <i class="material-icons" @click="Check">check_box_outline_blank</i>
      <span>{{title}}</span>
      <i class="material-icons cross" @click="DeleteMe">close</i>
    </li>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    fireid: String,
    title: String,
    completed: Boolean
  },
  methods: {
    Check() {
      if (this.completed) {
        this.$emit("SetTodo", this.fireid);
      } else {
        this.$emit("SetDone", this.fireid);
      }
    },
    DeleteMe() {
      this.$emit("crossClicked", this.fireid);
    }
  }
};
</script>

<style scoped lang="scss">
.todo-item {
  list-style: none;
}

li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  cursor: text;
}

li span {
  margin-left: 10px;
}

i {
  cursor: pointer;
}

.cross {
  transform: scale(0.8);
  border-radius: 50%;
  transition: background-color 0.2s;
  padding: 6px;
  margin-left: auto;
}

.drag {
  cursor: move;
}

.cross,
.drag {
  visibility: hidden;
}

li:hover .cross,
li:hover .drag {
  visibility: visible;
}

.cross:hover {
  background-color: rgba(0, 0, 0, 0.08);
}
</style>
