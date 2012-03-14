define(['tmpl!item/ItemView'], function (itemViewTmpl) {
  return Backbone.View.extend({
    tagName: 'li',
    initialize: function () {
      _.bindAll(this);
    },
    render: function () {
      $(this.el).html(itemViewTmpl(this.model.toJSON()));
      return this;
    }
  });
});