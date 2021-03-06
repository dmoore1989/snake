(function () {
  SG = window.SG = window.SG || {}

  StartModal = SG.StartModal = function ($el) {
    this.$el = $el;
    this.highScore = 0;
    this.renderStartModal();
    this.bindEvents();
  };

  StartModal.prototype.bindEvents = function () {
    $(".start-button").on("click", this.startGame.bind(this));
  };

  StartModal.prototype.startGame = function () {
    a = new SG.View(this.$el, this);
  };

  StartModal.prototype.renderStartModal = function () {
    this.$el.empty();
    this.$el.append('<h2 class="faded">Controls: Use the Arrows to move the snake.  Eat as many apples you can without hitting a wall or yourself</h3>');
    this.$el.append('<button class="start-button faded">PLAY!!!</button>');
    this.$el.addClass('message');
    setTimeout(function () {
      $(".faded").removeClass("faded");
    },100);
  };

  StartModal.prototype.renderRestartModal = function (score) {
    this.$el.empty();
    this.$el.append("<h2>GAME OVER</h2>");
    this.$el.append("<h4>Your Score Was:  " + score +"</h4>");
    if (this.highScore < score) {
      this.highScore = score;
      this.$el.append("<h2>NEW HIGH SCORE!!!</h2>");
    }
    this.$el.append('<button class="start-button">Play Again?</button>');
    this.$el.addClass('message');
    this.bindEvents();
    setTimeout(function () {
      $(".faded").removeClass("faded");
    },3000);
  };



})();
