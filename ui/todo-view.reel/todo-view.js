var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component;

exports.TodoView = Montage.create(Component, {

    todo: {
        value: null
    },

    editInput: {
        value: null
    },

    prepareForDraw: {
        value: function() {
            this.element.addEventListener("dblclick", this, false);
            this.element.addEventListener("blur", this, true);
            this.element.addEventListener("submit", this, false);
        }
    },

    captureDestroyButtonAction: {
        value: function() {
            this.dispatchEventNamed("destroyTodo", true, true, {todo: this.todo})
        }
    },

    handleDblclick: {
        value: function(evt) {
            this.isEditing = true;
        }
    },

    _isEditing: {
        value: false
    },

    isEditing: {
        get: function() {
            return this._isEditing;
        },
        set: function(value) {
            if (value === this._isEditing) {
                return;
            }

            this._isEditing = value;
            this.needsDraw = true;
        }
    },

    captureBlur: {
        value: function(evt) {
            if (this.isEditing && this.editInput.element === evt.target) {
                this._submitTitle();
            }
        }
    },

    handleSubmit: {
        value: function(evt) {
            if (this.isEditing) {
                evt.preventDefault();
                this._submitTitle();
            }
        }
    },

    _submitTitle: {
        value: function() {
            this.todo.title = this.editInput.value.trim();
            this.isEditing = false;
        }
    },

    draw: {
        value: function() {
            if (this.isEditing) {
                this.element.classList.add("editing");
                this.editInput.element.focus();
            } else {
                this.element.classList.remove("editing");
                this.editInput.element.blur();
            }
        }
    }

});
