var testObj = {};
_.extend(testObj, Backbone.Events);



var Book = Backbone.Model.extend({
    defaults: {
        ID: "",
        BookName: ""
    },
    ShowMeWhenSomethingHappens:function() {
        console.log('ShowMeWhenSomethingHappens()');
    }
});


var book = new Book();

book.on('something', function() {
    console.log('on somthing');
});

book.trigger('something', 'Hello events - backbone model');