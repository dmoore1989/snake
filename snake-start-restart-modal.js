(function () {
  SG = window.SG = window.SG || {}

  StartModal = SG.StartModal = function ($el) {
    this.$el = $el;
    this.renderModal();
    this.bindEvents();
  };

  StartModal.prototype.bindEvents = function () {
    $(".start-button").on("click", this.startGame.bind(this));
  };

  StartModal.prototype.startGame = function () {
    a = new SG.View(this.$el);
  };

  StartModal.prototype.renderModal = function () {
    this.$el.empty();
    this.$el.append("<h2>WELCOME TO SNAKE</h2>");
    this.$el.append('<button class="start-button">Play Game</button>');
  };




})();
