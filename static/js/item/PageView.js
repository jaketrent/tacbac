define(['tmpl!item/PageView'], function (pageViewTmpl) {
  return Backbone.View.extend({
    el: '#main',
    initialize: function () {
      _.bindAll(this, 'render');
      alert(pageViewTmpl());
    },
    render: function () {

      return this;
    }
  });
});