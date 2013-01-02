function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = A$(Ti.UI.createTabGroup({
        backgroundColor: "white",
        id: "index"
    }), "TabGroup", null);
    $.__views.homeTab = Alloy.createController("home", {
        id: "homeTab"
    });
    $.__views.tab1 = A$(Ti.UI.createTab({
        window: $.__views.homeTab.getViewEx({
            recurse: !0
        }),
        id: "tab1",
        title: "Home",
        icon: "53-house.png"
    }), "Tab", null);
    $.__views.index.addTab($.__views.tab1);
    $.__views.mapTab = Alloy.createController("map", {
        id: "mapTab"
    });
    $.__views.tab2 = A$(Ti.UI.createTab({
        window: $.__views.mapTab.getViewEx({
            recurse: !0
        }),
        id: "tab2",
        title: "Map",
        icon: "103-map.png"
    }), "Tab", null);
    $.__views.index.addTab($.__views.tab2);
    $.__views.nearbyTab = Alloy.createController("nearby", {
        id: "nearbyTab"
    });
    $.__views.tab3 = A$(Ti.UI.createTab({
        window: $.__views.nearbyTab.getViewEx({
            recurse: !0
        }),
        id: "tab3",
        title: "Nearby",
        icon: "166-newspaper.png"
    }), "Tab", null);
    $.__views.index.addTab($.__views.tab3);
    $.__views.aboutTab = Alloy.createController("about", {
        id: "aboutTab"
    });
    $.__views.tab4 = A$(Ti.UI.createTab({
        window: $.__views.aboutTab.getViewEx({
            recurse: !0
        }),
        id: "tab4",
        title: "About",
        icon: "123-id-card.png"
    }), "Tab", null);
    $.__views.index.addTab($.__views.tab4);
    $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;