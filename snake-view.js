(function(){
    SG = window.SG = window.SG || {}

    View =SG.View = function ($el) {
      this.$el = $el;
      this.board = new Board(25);
      this.turnInstructions = [];
      this.bindEvents();
      this.firstRender();
      setInterval(function(){
        this.board.snake.turn(this.turnInstructions);
        this.board.snake.move();
        this.render();
        this.turnInstructions = [];
      }.bind(this), 100);
    };

    View.prototype.bindEvents = function () {
      $(window).on("keydown", this.handleKeydown.bind(this));
    };

    View.prototype.handleKeydown = function (e) {
      e.preventDefault();
      var key = View.DIRECTIONS[e.keyCode];
      if (typeof key !== "undefined") {
        this.turnInstructions.push(key);
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
    };
})();
