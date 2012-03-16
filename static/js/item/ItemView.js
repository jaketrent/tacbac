define(['tmpl!item/ItemView', 'tmpl!item/AddPointView'], function (itemViewTmpl, addPointViewTmpl) {
  return Backbone.View.extend({
    tagName: 'li',
    className: 'item',
    events: {
      'click .edit-title': 'editTitle',
      'click .edit-point': 'editPoint',
      'click .add-point': 'addPoint'
    },
    initialize: function () {
      _.bindAll(this);
    },
    render: function () {
      $(this.el).html(itemViewTmpl(this.model.toJSON())).append(addPointViewTmpl());
      return this;
    },
    editTitle: function (evt) {
      Backbone.Events.trigger('edit', this.model.get('title'), this.saveTitle, $(evt.currentTarget).closest('.item'));
    },
    editPoint: function (evt) {
      var self = this;
      var $pt = $(evt.currentTarget).closest('.point');
      var indx = this.$('.point').index($pt);
      Backbone.Events.trigger('edit', this.model.get('points')[indx].body, function (newPointBody) {
        self.savePoint(newPointBody, indx);
      }, $(evt.currentTarget).closest('.item'));
    },
    addPoint: function (evt) {
      Backbone.Events.trigger('edit', '', this.savePointAdd, $(evt.currentTarget).closest('.item'));
    },
    savePointAdd: function (newPointTitle) {
      var points = this.model.get('points');
      points.push({
        title: newPointTitle,
        body: ''
      });
      this.model.save({
        points: points
      }, {
        success: this.saveSuccess,
        error: this.saveError
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