(function(){
    SG = window.SG = window.SG || {}

    View =SG.View = function($el) {
      this.$el = $el;
      this.board = new Board(15);
      this.bindEvents();
      this.render();
      setInterval(function(){
        this.board.snake.move();
        this.render();
      }.bind(this), 500)
    }

    View.prototype.bindEvents = function(){
      $(window).on("keydown", this.handleKeydown.bind(this))
    };

    View.prototype.handleKeydown = function(e){
      key = View.DIRECTIONS[e.keyCode];
      this.board.snake.turn(key);
    };


    View.DIRECTIONS = {
      37:"W",
      38:"N",
      39:"E",
      40:"S"
    };

    View.prototype.render =function(){
      this.$el.empty();
      var renderedBoard = this.board.render();

      renderedBoard.forEach(function(line){
        this.$el.append("<p>", line);
      }.bind(this)

      )
    };
})();
