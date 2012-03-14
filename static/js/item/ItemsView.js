define(['item/Items', 'item/ItemView'], function (Items, ItemView) {
  return Backbone.View.extend({
    el: '#cols',
    initialize: function () {
      _.bindAll(this, 'render');
      this.collection = new Items();
      this.collection.bind('reset', this.render);
      this.collection.bind('error', function (coll, res) {
        alert(res);
      });
      this.collection.fetch();
    },
    render: function (coll, res) {
      var frag = document.createDocumentFragment();

      _(coll.models).each(function (item) {
        var itemView = new ItemView({
          model: item
        });
        frag.appendChild(itemView.render().el);
      });

      $(this.el).html(frag);

      return this;
    }
  });
});