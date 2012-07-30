var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component;

exports.TodoView = Montage.create(Component, {

    todo: {
        value: null
    }

});
