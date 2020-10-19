function Branch(start, end, thickness, initcolor, endcolor) {
    this.start = start;
    this.end = end;
    this.drawn = false;
    this.thickness = thickness;
    this.initcolor = initcolor;
    this.endcolor = endcolor;

    this.show = function() {
      stroke(this.initcolor); //desenha o ramo
      strokeWeight(this.thickness);
      line(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    this.branchLeft = function() {
      let prevVector = p5.Vector.sub(this.end, this.start);
      prevVector.rotate(random(PI/6, PI/4));
      prevVector.mult(random(0.4, 0.8)); //ramo anterior

      let newEnd = p5.Vector.add(this.end, prevVector);
      let newB = new Branch(this.end, newEnd, this.thickness * 0.8, lerpColor(this.initcolor, this.endcolor, 0.2), color(36, 92, 93)); //novo ramo com base no anterior

      return newB;
    }

    this.branchRight = function() {
      let prevVector = p5.Vector.sub(this.end, this.start);
      prevVector.rotate(random(-PI/4, -PI/6));
      prevVector.mult(random(0.4, 0.8)); //ramo anterior

      let newEnd = p5.Vector.add(this.end, prevVector);
      let newB = new Branch(this.end, newEnd, this.thickness * 0.8, lerpColor(this.initcolor, this.endcolor, 0.2), color(36, 92, 93)); //novo ramo com base no anterior

      return newB;
    }
}
