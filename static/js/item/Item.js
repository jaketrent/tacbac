define(function () {
  return Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
      cat: '2012',
      points: []
    }
  });
});