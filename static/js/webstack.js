define(
  [ 'order!vendor/underscore-min',
    'order!vendor/backbone',
    'order!handlebars',
    'order!handlebars-ext',
    'vendor/jsHtmlToText'
  ], function(){

    Backbone.View.prototype.close = function() {
      //this.remove();
      this.unbind();
      if (this.onClose){
        this.onClose();
      }
    };

    return { version: "1.0" };
});

