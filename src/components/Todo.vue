<template>
  <div class="todo">
    <input type="text" placeholder="I have to ..." v-model="title" @keyup.enter="AddItem" />
    <draggable
      tag="ul"
      handle=".drag"
      :group="{ put: false }"
      v-model="todos"
      v-bind="dragOptions"
      @change="ChangeByDrag"
    >
      <transition-group>
        <todo-item
          v-for="todo in todos"
          :key="todo.id"
          :index="todo.index"
          :title="todo.title"
          :completed="todo.completed"
          v-on:SetDone="SetDone"
          v-on:crossClicked="Delete"
        ></todo-item>
      </transition-group>
    </draggable>
    <div v-if="doneTodos.length && todos.length" class="list-divider">
      <hr />
      <span>Already done</span>
    </div>
    <draggable
      tag="ul"
      handle=".drag"
      :group="{ put: false }"
      v-model="doneTodos"
      v-bind="dragOptions"
      @change="ChangeByDrag"
    >
      <transition-group>
        <todo-item
          v-for="todo in doneTodos"
          :key="todo.id"
          :title="todo.title"
          :index="todo.index"
          :completed="todo.completed"
          v-on:SetTodo="SetTodo"
          v-on:crossClicked="Delete"
        ></todo-item>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { db } from "../firebase";
let collection = db.collection("activities");

export default {
  name: "Todo",
  data() {
    return {
      title: "",
      todos: [],
      doneTodos: []
    };
  },
  methods: {
    AddItem() {
      if (this.title !== "") {
        var data = {
          title: this.title,
          index: this.todos.length,
          completed: false,
          id: "changeme"
        };
        this.todos.push(data);
        collection.add(data).then(ref => {
          this.todos[data.index].id = ref.id;
          collection.doc(ref.id).update({ id: ref.id });
        });
        this.title = "";
      }
    },
    SetTodo(index) {
      this.doneTodos[index].completed = false;
      this.doneTodos[index].index = this.todos.length;
      this.todos.push(this.doneTodos[index]);
      this.doneTodos.splice(index, 1);
      collection.doc(this.todos[this.todos.length - 1].id).update({
        index: this.todos.length - 1,
        completed: false
      });
      this.doneTodos.slice(index).forEach(act => {
        act.index -= 1;
        collection.doc(act.id).update({ index: act.index });
      });
    },
    SetDone(index) {
      this.todos[index].completed = true;
      this.todos[index].index = this.doneTodos.length;
      this.doneTodos.push(this.todos[index]);
      this.todos.splice(index, 1);
      collection.doc(this.doneTodos[this.doneTodos.length - 1].id).update({
        index: this.doneTodos.length - 1,
        completed: true
      });
      this.todos.slice(index).forEach(act => {
        act.index -= 1;
        collection.doc(act.id).update({ index: act.index });
      });
    },
    Delete(index, completed) {
      if (completed) {
        collection.doc(this.doneTodos[index].id).delete();
        this.doneTodos.splice(index, 1);
        this.doneTodos.slice(index).forEach(act => {
          act.index -= 1;
          collection.doc(act.id).update({ index: act.index });
        });
      } else {
        collection.doc(this.todos[index].id).delete();
        this.todos.splice(index, 1);
        this.todos.slice(index).forEach(act => {
          act.index -= 1;
          collection.doc(act.id).update({ index: act.index });
        });
      }
    },
    ChangeByDrag(e) {
      if (e.moved.element.completed) {
        this.doneTodos[e.moved.newIndex].index = e.moved.newIndex;
        this.doneTodos[e.moved.oldIndex].index = e.moved.oldIndex;
        collection.doc(this.doneTodos[e.moved.newIndex].id).update({
          index: e.moved.newIndex
        });
        collection.doc(this.doneTodos[e.moved.oldIndex].id).update({
          index: e.moved.oldIndex
        });
      } else {
        this.todos[e.moved.newIndex].index = e.moved.newIndex;
        this.todos[e.moved.oldIndex].index = e.moved.oldIndex;
        collection.doc(this.todos[e.moved.newIndex].id).update({
          index: e.moved.newIndex
        });
        collection.doc(this.todos[e.moved.oldIndex].id).update({
          index: e.moved.oldIndex
        });
      }
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
  beforeCreate() {
    collection
      .where("completed", "==", false)
      .orderBy("index")
      .get()
      .then(querySnapshot => {
        this.todos = querySnapshot.docs.map(doc => {
          var data = doc.data();
          data.id = doc.id;
          return data;
        });
      });
    collection
      .where("completed", "==", true)
      .orderBy("index")
      .get()
      .then(querySnapshot => {
        this.doneTodos = querySnapshot.docs.map(doc => {
          var data = doc.data();
          data.id = doc.id;
          return data;
        });
      });
  },
  components: {
    "todo-item": require("./Todo_Item").default,
    draggable
  }
};
</script>

<style scoped lang="scss">
.todo {
  text-align: left;
  margin: auto;
  width: 30%;
  min-width: 400px;
  border: solid 1px rgba(0, 0, 0, 0.555);
  border-radius: 15px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.13);
  background-color: #fff;
  padding-top: 20px;
}

ul {
  padding: 0;
}

input {
  display: block;
  margin: auto;
  align-self: center;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.356);
  font-size: 18px;
  width: 270px;
  max-width: 96%;
}

input:focus {
  outline: none;
}

.list-divider {
  color: rgba(40, 42, 59, 0.678);
}

.list-divider span {
  cursor: default;
  margin-left: 30px;
}

hr {
  margin: 10px 20px;
}

.ghost {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.26);
}

.list-group-item {
  cursor: move;
}
</style>
