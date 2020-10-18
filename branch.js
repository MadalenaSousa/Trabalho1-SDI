function Branch(start, end) {
    this.start = start;
    this.end = end;
    this.drawn = false;
    this.thickness = 1;

    this.show = function() {
      stroke('#9BB39D'); //desenha o ramo
      strokeWeight(this.thickness);
      line(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    this.branchLeft = function() {
      let prevVector = p5.Vector.sub(this.end, this.start);
      prevVector.rotate(PI/6);
      prevVector.mult(0.66); //ramo anterior

      let newEnd = p5.Vector.add(this.end, prevVector);
      let newB = new Branch(this.end, newEnd); //novo ramo com base no anterior

      return newB;
    }

    this.branchRight = function() {
      let prevVector = p5.Vector.sub(this.end, this.start);
      prevVector.rotate(-PI/6);
      prevVector.mult(0.66); //ramo anterior

      let newEnd = p5.Vector.add(this.end, prevVector);
      let newB = new Branch(this.end, newEnd); //novo ramo com base no anterior

      return newB;
    }
}
