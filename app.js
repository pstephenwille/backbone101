// Filename: app.js
define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

    var Book = Backbone.Model.extend({
        defaults:{
            id:'woot',
            BookName:'woot'
        },
        initialize:function() {
            this.on('change', function() {
                if(this.hasChanged('id')) {
                    console.log('id changed ', this.id);
                }
            });

            this.on('invalid', function(model, error) {
                console.log('validate error ', model, error);
            })
        },
        idAttribute:'id',
        constructor:function() {
            Backbone.Model.apply(this, arguments);
        },
        validate:function(attr) {
            if(attr.id < 1) {
                return false;
            }
        }
    });

    var ChildrensBook = Book.extend({});

    var book = new Book();
    console.log('book ', book);


    /*
     * COLLECTIONS
     * * * */
    var BooksCollection = Backbone.Collection.extend({
        model:Book,
        initialize:function() {
            console.log('coll init');
            // This will be called when an item is added. pushed or unshifted
            this.on('add', function(model) {
                console.log('something got added');
            });
            // This will be called when an item is removed, popped or shifted
            this.on('remove', function(model) {
                console.log('something got removed');
            });
            // This will be called when an item is updated
            this.on('change', function(model) {
                console.log('something got changed', model);
            });
        }
    });
    console.log('collection ', BooksCollection);


    /*
     * VIEWS
     * * * */
    var bookView = Backbone.View.extend({
        tagName:"li",
        model:Book,
        events:{'click':'itemClicked'},
        itemClicked:function(elem) {
            console.log('bookview item clicked', elem.target.id);
        },
        initialize:function() {
            this.template = _.template($('#bookList').html());
        },
        render:function() {
            this.$el.html('<li id="' + this.model.get("id") + '">' + this.model.get("BookName") + '</li>');
            return this;
        }
    });

    var bookListView = Backbone.View.extend({
        model:BooksCollection,
        initialize:function() {

            this.listenTo(this.model, 'add', this.modelUpdated);
        },
        modelUpdated:function() {
            this.render();
        },
        render:function() {
            console.log('list ', this.model);
            this.$el.html(); // lets render this view

            var self = this;

            for(var i = 0; i < this.model.length; ++i) {
                // lets create a book view to render
                var m_bookView = new bookView({model:this.model.at(i)});

                // lets add this book view to this list view
                this.$el.append(m_bookView.$el);
                m_bookView.render(); // lets render the book
            }

            return this;
        }
    });


    var book1 = new Book({id:1, BookName:"Book 1"});
    var book2 = new Book({id:2, BookName:"Book 2"});
    var book3 = new Book({id:3, BookName:"Book 3"});
    var book4 = new Book({id:4, BookName:"Book 4"});
    var book5 = new Book({id:5, BookName:"Book 5"});

    var bookCollection = new BooksCollection([book1, book2, book3, book4, book5]);
    var bookList = null;


    /* START - view 2*/
    var bookView2 = Backbone.View.extend({
        model:Book,
        tagName:'li',
        template:'',

        initialize:function() {
            this.template = _.template($('#bookItem').html());
        },

        render:function() {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });
    var bookListView2 = Backbone.View.extend({
        model:BooksCollection,

        render:function() {
            this.$el.html(); // lets render this view

            for(var i = 0; i < this.model.length; ++i) {
                // lets create a book view to render
                var m_bookView = new bookView2({model:this.model.at(i)});

                // lets add this book view to this list view
                this.$el.append(m_bookView.$el);
                m_bookView.render(); // lets render the book
            }

            return this;
        }
    });
    /* END - view 2 */


    $(document).ready(function() {
        bookList = new bookListView({el:$("#bookList"), model:bookCollection});
        bookList.render();


        //blist2 = new bookListView({el:$('#bookItem'), model:bookCollection});
        //blist2.render();
    });


});