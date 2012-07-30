var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    ArrayController = require("montage/ui/controller/array-controller").ArrayController,
    Todo = require("core/todo").Todo,
    LOCAL_STORAGE_KEY = "todos-montage";

exports.Main = Montage.create(Component, {

    newTodoForm: {
        value: null
    },

    newTodoInput: {
        value: null
    },

    todoListController: {
        serializable: false,
        value: null
    },

    didCreate: {
        value: function() {
            this.todoListController = ArrayController.create();
        }
    },

    prepareForDraw: {
        value: function() {
            this.newTodoForm.identifier = "newTodoForm";
            this.newTodoForm.addEventListener("submit", this, false);

            this.addEventListener("destroyTodo", this, true);
        }
    },

    captureDestroyTodo: {
        value: function(evt) {
            this.destroyTodo(evt.detail.todo);
        }
    },

    handleNewTodoFormSubmit: {
        value: function(evt) {
            evt.preventDefault();

            if ("" === this.newTodoInput.value) {
                return;
            }

            this.createTodo(this.newTodoInput.value);
            this.newTodoInput.value = null;
        }
    },

    createTodo: {
        value: function(title) {
            var todo = Todo.create().initWithTitle(title);
            this.todoListController.addObjects(todo);
            return todo;
        }
    },

    destroyTodo: {
        value: function(todo) {
            this.todoListController.removeObjects(todo);
            return todo;
        }
    }

});
