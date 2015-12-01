(function(){
    SG = window.SG = window.SG || {}

    View =SG.View = function ($el, modal) {
      this.modal = modal
      this.$el = $el;
      this.board = new Board(25);
      this.directions = [];
      this.bindEvents();
      this.firstRender();
      this.currentScore = this.board.score;
      this.currentLife = this.board.life;
      game = setInterval(function(){
        if (!this.board.over) {
          this.render();
          this.board.snake.move(this.directions);
          this.directions = [];
        } else {
          clearInterval(game);
          this.modal.renderRestartModal(this.board.score)
        }
      }.bind(this), 100);

    };

    View.prototype.bindEvents = function () {
      $(window).on("keydown", this.handleKeydown.bind(this));
    };

    View.prototype.handleKeydown = function (e) {
      e.preventDefault();
      var key = View.DIRECTIONS[e.keyCode];
      if (typeof key !== "undefined") {
        this.directions.push(key);
     }
    };

    View.DIRECTIONS = {
      37:"W",
      38:"N",
      39:"E",
      40:"S"
    };

    View.prototype.firstRender =function () {
      this.$el.empty();
      var renderedBoard = this.board.render();

      renderedBoard.forEach(function (line, i) {
        line.forEach (function(item,j) {
          var id = i + " " + j;
          this.$el.append($("<div>").attr("id", id));
          if (item === "S"){
            var snake = this.$el.find("div:last");
            snake.addClass("snake");
          } else if (item === "A"){
            var apple= this.$el.find("div:last");
            apple.addClass("apple");
          }
        }.bind(this));
        this.$el.append("<br>");
      }.bind(this));
      $(".score").append(this.board.score);
      $(".life").append(this.board.life);

    };

    View.prototype.render = function () {
      this.$el.children().removeClass();
      var renderedBoard = this.board.render();
      renderedBoard.forEach(function (line, i) {
        line.forEach(function (item,j) {
          var id = i + " " + j;
          if (item === "S"){
            snake = $("div[id='" + id + "']");
            snake.addClass("snake");
          } else if (item === "A"){
            apple = $("div[id='"+ id + "']");
            apple.addClass("apple");
          }
        }.bind(this));
      }.bind(this));
      if (this.board.score !== this.currentScore) {
        $(".score").replaceWith('<span class="score">' + this.board.score + "</span>");
        this.currentScore = this.board.score;
      } else if (this.board.life !== this.currentLife) {
        $(".life").replaceWith('<span class="life">' + this.board.life+ "</span>");
        this.currentLife = this.board.life;
      }
    };
})();
