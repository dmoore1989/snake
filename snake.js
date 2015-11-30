(function(){
    SG = window.SG = window.SG || {};

    Snake = SG.Snake = function(start, board) {
      this.dir = "";
      this.start = start;
      this.segments = [this.start, this.start, this.start, this.start];
      this.board = board;
      this.turnInstructions = [];
    };

    Snake.prototype.resetSnake= function () {
      this.dir = "";
      this.segments = [this.start, this.start, this.start, this.start];
    }


    Coord = SG.Coord = function(x, y)  {
      this.x = x;
      this.y = y;
    };


    Coord.prototype.plus = function(coord2) {
      return new Coord((this.x + coord2.x), (this.y + coord2.y));
    };

    Coord.prototype.equals = function(coord2) {
      return (this.x == coord2.x) && (this.y == coord2.y);
    };

    Coord.prototype.isOpp = function(coord2) {
      return (this.x == (-1 * coord2.x)) && (this.y == (-1 * coord2.y));
    };

    Snake.prototype.addTurnInstructions = function (directions) {
      this.turnInstructions = this.turnInstructions.concat(directions);
    };

    Snake.prototype.move = function (directions) {
      this.addTurnInstructions(directions);
      if (this.turnInstructions.length > 0) {
        this.turn();
      } else if (this.dir=== "" ) {
        return;
      }
      var coord2 = this.generateMove(this.dir);
      var head = this.segments[0];
      var tail = this.segments[this.segments.length - 1];
      this.segments.unshift(head.plus(coord2));
      if (this.checkCollision(this.segments[0])){
        this.board.takeLife();
        this.resetSnake();
      } else if (this.board.snakeEatsApple()){
        this.eatApple();
        this.board.placeApple();
      }
      this.segments.pop(tail);
    };

    Snake.prototype.checkCollision = function (head) {
      if (head.x < 0 || head.y < 0 || head.x >= this.board.dim || head.y >= this.board.dim) {
        return true;
      }

      for (var i = 1; i < this.segments.length; i++ ){
        if (head.equals(this.segments[i])) {
          return true;
        }
      }
    };

    Snake.prototype.generateMove = function(dir){
      switch (dir) {
        case "N":
          return new Coord(-1, 0);
        case "E":
          return new Coord(0, 1);
        case "S":
          return new Coord(1, 0);
        case "W":
          return new Coord(0, -1);
      }
    };

    Snake.prototype.eatApple = function() {
      var head = this.segments[0];
      var eatenApple = new Coord(head[0], head[1]);
      this.segments.push(eatenApple);
      this.board.score += 10;
    };


    Snake.prototype.turn = function() {
      var oldCoord = this.generateMove(this.dir);
      if (!oldCoord || !oldCoord.isOpp(this.generateMove(this.turnInstructions[0]))) {
        this.dir = this.turnInstructions.shift();
        return;
      }
      for (var i = 0; i < this.turnInstructions.length; i++) {
        if (!oldCoord.isOpp(this.generateMove(this.turnInstructions[0]))) {
          this.turn();
          return;
        }
        this.turnInstructions.push(this.turnInstructions.shift());
      }
      this.turnInstructions = [];
    };

    Board = SG.Board = function(dim) {
      this.dim = dim;
      this.life = 3;
      var mid = Math.floor(this.dim/2);
      this.snake = new Snake(new Coord(mid, mid), this);
      this.placeApple();
      this.score = 0;
      this.over = false;
    };



    Board.prototype.render = function() {
      var grid = Board.emptyGrid(this.dim);
      this.snake.segments.forEach(function(el) {
        grid[el.x][el.y] = "S";
      }.bind(this));
      grid[this.apple.x][this.apple.y]= "A";
      var gridOutput = [];
      grid.forEach(function(row, i, arr) {
        gridOutput.push(row);
      });

      return gridOutput;
    };

    Board.prototype.takeLife = function () {
      this.life -= 1;
      if (this.life === 0) {
        this.over = true;
      }
    };

    Board.emptyGrid = function(dim) {
      var grid = [];
      for(var i = 0; i < dim; i++){
        var row = [];
        for (var j = 0; j < dim; j++){
          row.push(".");
        }
        grid.push(row);
      }
      return grid;
    };

    Board.prototype.placeApple = function(){
      var newApple;
      do{
        newApple = new Coord (Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
      } while (this.onSnake(newApple));
      this.apple = newApple;
    };

    Board.prototype.onSnake = function (coord) {
      for(var i = 0; i < this.snake.segments.length; i++){
        if (this.snake.segments[i].equals(coord)) {
          return true;
        }
      }
      return false;
    };

    Board.prototype.snakeEatsApple = function() {
      return (this.onSnake(this.apple));
    };



})();
