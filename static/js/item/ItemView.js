define(['tmpl!item/ItemView'], function (itemViewTmpl) {
  return Backbone.View.extend({
    tagName: 'li',
    events: {
      'click .edit-title': 'editTitle',
      'click .edit-point': 'editPoint'
    },
    initialize: function () {
      _.bindAll(this);
    },
    render: function () {
      $(this.el).html(itemViewTmpl(this.model.toJSON()));
      return this;
    },
    editTitle: function () {
      Backbone.Events.trigger('edit', this.model.get('title'), this.saveTitle);
    },
    editPoint: function (evt) {
      var $pt = $(evt.currentTarget).closest('.point');
      var indx = this.$('.point').index($pt);
      Backbone.Events.trigger('edit', this.model.get('points')[indx], this.savePoint);
    },
    savePoint: function (newPoint) {
      alert('save new point');
    },
    saveTitle: function (newTitle) {
      var self = this;
      this.model.save({
        title: newTitle
      }, {
        success: function (item, res) {
          self.render();
          Backbone.Events.trigger('closeEdit');
        },
        error: function (item, res) {
          alert('item ERROR save');
        }
      });
    }
  });
});