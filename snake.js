(function(){
    SG = window.SG = window.SG || {};

    Snake = SG.Snake = function(start) {
      this.dir = "";
      this.segments = [start];
    }

    Coord = SG.Coord = function(x, y)  {
      this.x = x;
      this.y = y;
    }

    Coord.prototype.plus = function(coord2) {
      return new Coord((this.x + coord2.x), (this.y + coord2.y));
    }

    Coord.prototype.equals = function(coord2) {
      return (this.x == coord2.x) && (this.y == coord2.y);
    }

    Coord.prototype.isOpp = function(coord2) {
      return (this.x == (-1 * coord2.x)) && (this.y == (-1 * coord2.y));
    }



    Snake.prototype.move = function(){
      if (this.dir==="" ){
        return
      }
      coord2 = this.generateMove();
      head = this.segments[0]
      tail = this.segments[this.segments.length - 1]
      this.segments.unshift(head.plus(coord2))
      this.segments.pop(tail)
    };

    Snake.prototype.generateMove = function(){
      switch (this.dir) {
        case "N":
          return new Coord(-1, 0)
        case "E":
          return new Coord(0, 1)
        case "S":
          return new Coord(1, 0)
        case "W":
          return new Coord(0, -1)
      }
    }

    Snake.prototype.turn = function(newDir) {
      this.dir = newDir;
    }

    Board = SG.Board = function(dim) {
      this.dim = dim;
      var mid = Math.floor(this.dim/2)
      this.snake = new Snake(new Coord(mid, mid));
      this.apples = [];

    }



    Board.prototype.render = function() {
      var grid = Board.emptyGrid(this.dim);
      this.snake.segments.forEach(function(el) {
        grid[el.x][el.y] = "S";
      }.bind(this));

      var gridOutput = [];
      grid.forEach(function(row, i, arr) {
        gridOutput.push(row.join(" "));
      });


      return gridOutput


    }

    Board.emptyGrid = function(dim) {
      var grid = []
      for(var i = 0; i < dim; i++){
        var row = []
        for (var j = 0; j < dim; j++){
          row.push(".");
        };
        grid.push(row);
      };

      return grid;

    }


})();
