var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    ArrayController = require("montage/ui/controller/array-controller").ArrayController,
    Todo = require("core/todo").Todo,
    LOCAL_STORAGE_KEY = "todos-montage";

exports.Main = Montage.create(Component, {

    todoListController: {
        serializable: false,
        value: null
    },

    didCreate: {
        value: function() {
            this.todoListController = ArrayController.create();
        }
    },

    createTodo: {
        value: function(title) {
            var todo = Todo.create().initWithTitle(title);
            this.todoListController.addObjects(todo);
            return todo;
        }
    }

});
