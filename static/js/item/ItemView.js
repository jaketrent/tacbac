define(['tmpl!item/ItemView', 'tmpl!item/AddPointView', 'vendor/jquery.touchwipe.1.1.1'], function (itemViewTmpl, addPointViewTmpl) {
  return Backbone.View.extend({
    tagName: 'li',
    className: 'item',
    events: {
      'click .edit-title': 'editTitle',
      'click .edit-point': 'editPoint',
      'click .add-point': 'addPoint',
      'click .body.rich': 'toggleEditableBody',
      'blur .body.plain': 'blurEditableBody',
      'blur .is-contenteditable': 'saveItem'
    },
    initialize: function () {
      _.bindAll(this);
    },
    render: function () {
      $(this.el).html(itemViewTmpl(this.model.toJSON())).append(addPointViewTmpl());
      this.$('.slider').touchwipe({
        wipeLeft: this.scrollToRight,
        wipeRight: this.scrollToLeft
      });
      Backbone.Events.trigger('ensureEditMode', this.ensureEditMode);
      return this;
    },
    scrollToRight: function () {
      this.scroll(1);
    },
    scrollToLeft: function () {
      this.scroll(-1);
    },
    scroll: function (direction) {
      var itemWidth = $(this.el).width();
      var extraWidthEach = 1; /*border*/
      var itemIndex = $('.item').index($(this.el));
      var startingPosX = itemIndex * (itemWidth + extraWidthEach);
      var winWidth = $(window).width();
      var itemsInWindow = Math.floor(winWidth / itemWidth); /*no border on single-col device scrn */
      $('body').animate({ scrollLeft: (startingPosX + (direction * itemsInWindow * (itemWidth + extraWidthEach))) });
    },
    editTitle: function (evt) {
      Backbone.Events.trigger('edit', this.model.get('title'), this.saveTitle, $(evt.currentTarget).closest('.item'));
    },
    getPointIndexForEvt: function (evt) {
      var self = this;
      var $pt = $(evt.currentTarget).closest('.point');
      return this.$('.point').index($pt);
    },
    editPoint: function (evt) {
      var indx = this.getPointIndexForEvt(evt);
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
    },
    saveItem: function () {
      var points = [];
      _(this.$('.point.saveable')).each(function (pt) {
        var $pt = $(pt);
        points.push({
          title: $pt.find('.save-pt-title').text(),
          body: $pt.find('.save-pt-body').html()
        });
      });
      this.model.save({
        title: this.$('.save-title').text(),
        points: points
      }, {
        success: this.saveSuccess,
        error: this.saveError
      });
    },
    toggleEditableBody: function (evt) {
      var index = this.getPointIndexForEvt(evt);
      this.$('.body.rich').eq(index).toggle();
      this.$('.body.plain').eq(index).toggle();
    },
    blurEditableBody: function (evt) {
      var index = this.getPointIndexForEvt(evt);
      var $body = this.$('.point').eq(index).find('.save-pt-body');
      $body.html(htmlToText($body.html()));
    }
  });
});