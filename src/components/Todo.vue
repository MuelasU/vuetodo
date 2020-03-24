<template>
  <div class="todo">
    <input type="text" placeholder="I have to ..." v-model="title" @keyup.enter="AddItem" />
    <draggable
      tag="ul"
      handle=".drag"
      :group="{ put: false }"
      :list="todos"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group>
        <todo-item
          v-for="todo in todos"
          :key="todo.id"
          :fireid="todo.id"
          :title="todo.title"
          :completed="todo.completed"
          v-on:SetDone="setDone"
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
      :list="doneTodos"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group>
        <todo-item
          v-for="todo in doneTodos"
          :key="todo.id"
          :title="todo.title"
          :fireid="todo.id"
          :completed="todo.completed"
          v-on:SetTodo="setTodo"
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
      drag: false,
      todos: [],
      doneTodos: []
    };
  },
  firestore: {
    todos: collection.where("completed", "==", false),
    doneTodos: collection.where("completed", "==", true)
  },
  methods: {
    AddItem() {
      //OK
      if (this.title !== "") {
        collection
          .add({
            title: this.title,
            completed: false
          })
          .then(docRef => {
            console.log("added " + docRef.id);
          })
          .catch(err => {
            console.log(err);
          });
        this.title = "";
      }
    },
    setTodo(id) {
      //OK
      collection
        .doc(id)
        .update({ completed: false })
        .then(() => {
          console.log("updated " + id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    setDone(id) {
      //OK
      collection
        .doc(id)
        .update({ completed: true })
        .then(() => {
          console.log("updated " + id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    Delete(id) {
      //OK
      collection
        .doc(id)
        .delete()
        .then(() => {
          console.log("deleted " + id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    log: function(evt) {
      window.console.log(evt);
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
