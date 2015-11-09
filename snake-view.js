(function(){
    SG = window.SG = window.SG || {}

    View =SG.View = function($el) {
      this.$el = $el;
      this.board = new Board(25);
      this.bindEvents();
      this.firstRender();
      setInterval(function(){
        this.board.snake.move();
        this.render();
      }.bind(this), 100)
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

    View.prototype.firstRender =function(){
      this.$el.empty();
      var renderedBoard = this.board.render();

      renderedBoard.forEach(function(line, i){
        line.forEach(function(item,j){
          id = i + " " + j
          this.$el.append($("<div>").attr("id", id))
          if (item === "S"){
            var snake = this.$el.find("div:last")
            snake.addClass("snake")
          }
        }.bind(this))
        this.$el.append("<br>")
      }.bind(this))

    };

    View.prototype.render = function(){
      this.$el.children().removeClass();
      var renderedBoard = this.board.render();
      renderedBoard.forEach(function(line, i){
        line.forEach(function(item,j){
          if (item === "S"){
            var id = i + " " + j
            snake = $("div[id='" + id + "']")
            snake.addClass("snake")
          }
        }.bind(this))
      }.bind(this))
    };
})();
