/*
* SEE bbroutes  PROJECT 
* * * */

var View1 = Backbone.View.extend({
    

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this.model.get('Message') + " from the View 1");
        return this;
    }
});

var View2 = Backbone.View.extend({

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this.model.get('Message') + " from the View 2");
        return this;
    }
});

var View3 = Backbone.View.extend({

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this.model.get('Message') + " from the View 3");
        return this;
    }
});

var ContainerView = Backbone.View.extend({
    myChildView: null,

    render: function() {
        this.$el.html("Greeting Area");

        this.$el.append(this.myChildView.$el);
        return this;
    }
});

var GreetModel = Backbone.Model.extend({
    defaults:{
        id:'',
        Message:''
    },
    initialize: function() {
        this.render();
    }
});

var greeting = new GreetModel({ Message: "Hello world" });

var container = new ContainerView({ el: $("#AppContainer"), model: greeting });
var view1 = null;
var view2 = null;
var view3 = null;

function showView1() {
    if (view1 == null) {
        view1 = new View1({ model: greeting });
    }
    container.myChildView = view1;
    container.render();
}

function showView2() {
    if (view2 == null) {
        view2 = new View2({ model: greeting });
    }

    container.myChildView = view2;
    container.render();
}

function showView3() {
    if (view3 == null) {
        view3 = new View3({ model: greeting });
    }

    container.myChildView = view3;
    container.render();
}


var myRouter = Backbone.Router.extend({

    greeting: null,
    container: null,
    view1: null,
    view2: null,
    view3: null,

    initialize: function() {
        this.greeting = new GreetModel({ Message: "Hello world" });
        this.container = new ContainerView({ el: $("#rAppContainer"), model: this.greeting });
    },

    routes: {
        "": "handleRoute1",
        "view1": "handleRoute1",
        "view2": "handleRoute2",
        "view3": "handleRoute3"
    },

    handleRoute1: function () {
        if (this.view1 == null) {
            this.view1 = new View1({ model: this.greeting });
        }

        this.container.myChildView = this.view1;
        this.container.render();
    },

    handleRoute2: function () {
        if (this.view2 == null) {
            this.view2 = new View2({ model: this.greeting });
        }

        this.container.myChildView = this.view2;
        this.container.render();
    },

    handleRoute3: function () {
        if (this.view3 == null) {
            this.view3 = new View3({ model: this.greeting });
        }

        this.container.myChildView = this.view3;
        this.container.render();
    }
});

var myRouter = Backbone.Router.extend({

    greeting: null,
    container: null,
    view1: null,
    view2: null,
    view3: null,

    initialize: function () {
        this.greeting = new GreetModel({ Message: "Hello world" });
        this.container = new ContainerView({ el: $("#rAppContainer"), model: this.greeting });
    },

    routes: {
        "": "handleRoute1",
        "view/:viewid": "handleRouteAll"
    },

    handleRouteAll: function (viewid) {

        if (viewid == 1) {
            this.handleRoute1();
        }
        else if (viewid == 2) {
            this.handleRoute2();
        }
        else if (viewid == 3) {
            this.handleRoute3();
        }
    },

    handleRoute1: function () {
        if (this.view1 == null) {
            this.view1 = new View1({ model: this.greeting });
        }

        this.container.myChildView = this.view1;
        this.container.render();
    },

    handleRoute2: function () {
        if (this.view2 == null) {
            this.view2 = new View2({ model: this.greeting });
        }

        this.container.myChildView = this.view2;
        this.container.render();
    },

    handleRoute3: function () {
        if (this.view3 == null) {
            this.view3 = new View3({ model: this.greeting });
        }

        this.container.myChildView = this.view3;
        this.container.render();
    }
});


var myRouter = Backbone.Router.extend({

    routes: {
        "": "handleRoute1",
        "view1": "handleRoute1",
        "view2": "handleRoute2",
        "view3": "handleRoute3",
        "view/:viewid(/:msg)": "handleRouteAll"
    },

    handleRouteAll: function (viewid, msg) {

        if (msg) {
            alert(msg);
        }
    }
});