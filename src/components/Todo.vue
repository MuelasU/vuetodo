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
          :fireid="todo.id"
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
          :fireid="todo.id"
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
      drag: false,
      todos: [],
      doneTodos: []
    };
  },
  firestore: {
    todos: collection.where("completed", "==", false).orderBy("index"),
    doneTodos: collection.where("completed", "==", true).orderBy("index")
  },
  methods: {
    AddItem() {
      //OK
      if (this.title !== "") {
        collection
          .add({
            title: this.title,
            index: this.todos.length,
            completed: false
          })
          .then(() => {
            this.Bind();
          })
          .catch(err => {
            console.log(err);
          });
        this.title = "";
      }
    },
    SetTodo(id) {
      collection
        .doc(id)
        .update({ completed: false, index: this.todos.length })
        .then(() => {
          this.Bind();
        })
        .catch(err => {
          console.log(err);
        });
    },
    SetDone(id) {
      collection
        .doc(id)
        .update({ completed: true, index: this.doneTodos.length })
        .then(() => {
          this.Bind();
        })
        .catch(err => {
          console.log(err);
        });
    },
    Delete(id) {
      //OK
      var delDoc = collection.doc(id);
      delDoc.get().then(doc => {
        var delDocData = doc.data();
        var arr = delDocData.completed ? this.doneTodos : this.todos;
        var i = delDocData.index;
        arr.forEach(act => {
          if (act.index > i) {
            var nextDoc = collection.doc(act.id);
            nextDoc.update({ index: act.index - 1 }).catch(err => {
              console.log(err);
            });
          }
        });
        delDoc
          .delete()
          .then(() => {
            this.Bind();
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    ChangeByDrag(e) {
      //OK
      collection
        .where("completed", "==", e.moved.element.completed)
        .where("index", "==", e.moved.newIndex)
        .get()
        .then(snap => {
          var movedDoc = collection.doc(e.moved.element.id);
          var forcedDoc = collection.doc(snap.docs[0].id);
          movedDoc
            .update({ index: e.moved.newIndex })
            .then(() => {
              forcedDoc
                .update({ index: e.moved.oldIndex })
                .then(() => {
                  this.Bind();
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        });
    },
    Bind() {
      this.$bind(
        "todos",
        collection.where("completed", "==", false).orderBy("index")
      );
      this.$bind(
        "doneTodos",
        collection.where("completed", "==", true).orderBy("index")
      );
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
