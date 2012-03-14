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
      var self = this;
      var $pt = $(evt.currentTarget).closest('.point');
      var indx = this.$('.point').index($pt);
      Backbone.Events.trigger('edit', this.model.get('points')[indx].body, function (newPointBody) {
        self.savePoint(newPointBody, indx);
      });
    },
    savePoint: function (newPointBody, index) {
      var points = this.model.get('points');
      points[index].body = newPointBody;
      this.model.save({
        points: points
      }, {
        success: this.saveSuccess,
        error: this.saveError
      });
    },
    saveTitle: function (newTitle) {
      this.model.save({
        title: newTitle
      }, {
        success: this.saveSuccess,
        error: this.saveError
      });
    },
    saveSuccess: function (item, res) {
      this.render();
      Backbone.Events.trigger('closeEdit');
    },
    saveError: function (item, res) {
      alert('item ERROR save');
    }
  });
});