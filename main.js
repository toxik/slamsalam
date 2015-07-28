(function() {

  var gimmeRandom = function() {
    return Math.floor(Math.random() * 5000);
  };



  var Door = function($el) {

    this.$el = $el;
    this.openTimeoutId = null;
    this.showSalamTimeoutId = null;
    this.stopTimeoutId = null;

    this.close = function() {
      if (this.$el.hasClass('Door--salamWantsIn')) {
        var currentScore = parseInt($scoreHolder.html(), 10);
        $scoreHolder.html(currentScore + 1);
      }
      this.$el.removeClass('Door--open Door--salamWantsIn').addClass('Door--closed');
      clearTimeout(this.showSalamTimeoutId);
      clearTimeout(this.stopTimeoutId);
      //this.start();
    };

    this.start = function() {
      var that = this;
      this.openTimeoutId = setTimeout(this.open.bind(this), gimmeRandom());
    };

    this.open = function() {
      this.$el.removeClass('Door--closed').addClass('Door--open');
      this.showSalamTimeoutId = setTimeout(this.showSalam.bind(this), gimmeRandom());
      this.openTimeoutId = null;
    };

    this.showSalam = function() {
      this.$el.addClass('Door--salamWantsIn');
      this.stopTimeoutId = setTimeout(this.stop.bind(this), gimmeRandom());
      this.showSalamTimeoutId = null;
    };

    this.stop = function() {
      this.$el.removeClass('Door--open Door--salamWantsIn').addClass('Door--closed Door--salamIsIn');
      this.stopTimeoutId = null;
      clearAllTimeouts();
      $('.RightPane-message').html('Game over: Salam is in your house... :-(');
      $('.Door').off('click');
    };

    this.$el.on('click', this.close.bind(this));
  };



  var $leftPane = $('.LeftPane');
  var collection = [];
  var $scoreHolder = $('#scoreHolder');

  var clearAllTimeouts = function() {
    var model;
    for (var index = 0, length = collection.length; index < length; ++index) {
      model = collection[index];
      if (model.openTimeoutId) clearTimeout(model.openTimeoutId);
      if (model.showSalamTimeoutId) clearTimeout(model.showSalamTimeoutId);
      if (model.stopTimeoutId) clearTimeout(model.stopTimeoutId);
    };
  };



  for (var index = 0, length = 8; index < length; ++index) {

    var $door = $('<div />')
      .addClass('Door Door--closed')
      .append($('<div />').addClass('Door-left'))
      .append($('<div />').addClass('Door-placeholder'))
      .append($('<div />').addClass('Door-right'));

    $leftPane.append($door);

    var model = new Door($door);
    model.start();
    collection.push(model);

  }

})();
