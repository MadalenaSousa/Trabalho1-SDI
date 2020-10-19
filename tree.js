function Tree(x, y, trunkLength) {
  let init = createVector(x, y); //tronco
  let end = createVector(x, y - trunkLength);
  let tree = [];
  tree[0] = new Branch(init, end, random(5, 10), color(75, 57, 54), color(36, 92, 93));

  this.show = function() {
    for(let i = 0; i < tree.length; i++) { //desenha a árvore
        tree[i].show();
    }

    if(total > threshold && tree.length < 10000) { //se se tiver a mexer e não estiverem já 1000 ramos
      for (var i = tree.length - 1; i >= 0; i--) {
        if(!tree[i].drawn) { //se ainda não foi desenhada
          tree.push(tree[i].branchRight()); //então adiciona os ramos à árvore
          tree.push(tree[i].branchLeft());
        }
        tree[i].drawn = true; //ramo passa a estar desenhado
      }
    } else if(total < threshold && tree.length > 1) { //se não se estiver a mexer e ainda houver pelo menos um ramo
      for (var i = tree.length - 1; i >= 0; i--) {
        if(tree[i].drawn) { //se já foi desenhada
          tree.pop(tree[i].branchRight()); //então remove os ramos à árvore
          tree.pop(tree[i].branchLeft());
        }
        tree[i].drawn = false; //ramo passa a não estar desenhado
      }
    }
  }
}
