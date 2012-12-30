function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = A$(Ti.UI.createTabGroup({
        id: "index"
    }), "TabGroup", null);
    $.__views.__alloyId2 = A$(Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Tab 1",
        id: "__alloyId2"
    }), "Window", null);
    $.__views.__alloyId3 = A$(Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "I am Window 1",
        id: "__alloyId3"
    }), "Label", $.__views.__alloyId2);
    $.__views.__alloyId2.add($.__views.__alloyId3);
    $.__views.__alloyId1 = A$(Ti.UI.createTab({
        window: $.__views.__alloyId2,
        title: "Tab 1",
        icon: "KS_nav_ui.png",
        id: "__alloyId1"
    }), "Tab", null);
    $.__views.index.addTab($.__views.__alloyId1);
    $.__views.__alloyId5 = A$(Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Tab 2",
        id: "__alloyId5"
    }), "Window", null);
    $.__views.__alloyId6 = A$(Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "I am Window 2",
        id: "__alloyId6"
    }), "Label", $.__views.__alloyId5);
    $.__views.__alloyId5.add($.__views.__alloyId6);
    $.__views.__alloyId4 = A$(Ti.UI.createTab({
        window: $.__views.__alloyId5,
        title: "Tab 2",
        icon: "KS_nav_views.png",
        id: "__alloyId4"
    }), "Tab", null);
    $.__views.index.addTab($.__views.__alloyId4);
    $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;