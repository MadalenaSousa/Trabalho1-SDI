let capture, cnv, total;
let prevFrame;
let w = innerWidth;
let h = innerHeight;

let threshold;

let show = false;
let title, div;

let arv = [];

function setup() {
    capture = createCapture(VIDEO);
    capture.size(640, 480);
    capture.hide();
    capture.center();

    cnv = createCanvas(w, h);
    cnv.center();
    cnv.position(0, 0, 'relative');

    threshold = 450000;

    for(i = 0; i < 6; i++) {
        arv[i] = new Tree((i + 1) * width/7, height - random(100), random(80, 300));
    }

}

function draw() {
    background(255);
    setGradient(0, 0, width, height, color(9,60,111), color(188,231,255));
    frameRate(10);

    //CHÃO
    push();
    noStroke();
    fill('#507C53');
    rotate(-PI/60);
    rect(-50, 3.5*height/4, width*2, height/4);
    pop();

    push();
    noStroke();
    fill('#9BB39D');
    rotate(PI/60);
    rect(0, 3*height/4, width*2, height/4);
    pop();

    //MOVIMENTO + ÁRVORES
    personMovement();
    for(let i = 0; i < arv.length; i++) {
        arv[i].show();
    }

    //BOTÃO PARA ABRIR A INFORMAÇÃO
    push();
    noFill();
    if(dist(mouseX, mouseY, width-50, 50) <= 25) {
      stroke(255);
    } else {
      stroke('#56a1c9');
    }
    strokeWeight(2);
    ellipse(width - 50, 50, 25, 25);
    textAlign(CENTER, CENTER);
    textFont('helvetica');
    textSize(18);
    strokeWeight(1);
    if(show) {
      text('X', width - 50, 50);
    } else {
      text('?', width - 50, 50);
    }
    pop();
}

function mousePressed() {

  //ABRIR E FECHAR O POP UP
  if(dist(mouseX, mouseY, width-50, 50) <= 25) {
    if(show == false){
      show = true;
      popUpInfo();
    } else {
      show = false;
      title.remove();
      div.remove();
    }
  }
}

//POP UP COM A INFORMAÇÃO
function popUpInfo() {
  div = createDiv('This work aims to bring awerness to the climate change problem. In this very simple sketch you can see tree trunks, however, if you move in front of the camera you will see that the trees grow. The idea is to show that the problem will not be solved if we don\'t move, we have to do something! So move and see what happens');
  div.position(width - width/3, 1.6*height/12, 'absolute');
  div.style('color', 'white');
  div.style('font-family', 'helvetica, sans-serif');
  div.style('width', 'calc(100%/4)');
  div.style('font-size', '14pt');
  div.style('background-color', '#245C5D');
  div.style('padding', '25px 25px 25px 25px');

  title = createDiv('Move to Make a Change');
  title.position(width - width/3, height/12, 'absolute');
  title.style('color', '#9BB39D');
  title.style('font-family', 'helvetica, sans-serif');
  title.style('width', 'calc(100%/4)');
  title.style('font-size', '24pt');
  title.style('font-weight', 'bold');
  title.style('background-color', '#245C5D');
  title.style('padding', '25px 25px 0px 25px');
}

//FUNDO
function setGradient(x, y, w, h, c1, c2) {
  push();
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1); //mapear a altura de 0 a 1
      let c = lerpColor(c1, c2, inter); //função de interpolar cores
      strokeWeight(1);
      stroke(c);
      line(x, i, x + w, i); //linhas horizontais com o gradiente
    }
  pop();
}

//DETEÇÃO DE MOVIMENTO
function personMovement() {
  capture.loadPixels();
  total = 0;
  if (capture.pixels.length > 0) {
      if (!prevFrame) {
          prevFrame = copyImage(capture.pixels, prevFrame);
      } else {
          for (let y = 0; y < capture.height; y++) {
              for (let x = 0; x < capture.width; x++) {
                  let index =  x + y * w;

                  //variação da cor de cada pixel
                  let rdif = Math.abs(capture.pixels[index] - prevFrame[index]);
                  let gdif = Math.abs(capture.pixels[index + 1] - prevFrame[index + 1]);
                  let bdif = Math.abs(capture.pixels[index + 2] - prevFrame[index + 2]);

                  //copiar frame atual para prevPixels
                  prevFrame[index] = capture.pixels[index];
                  prevFrame[index + 1] = capture.pixels[index + 1];
                  prevFrame[index + 2] = capture.pixels[index + 2];

                  let bright = (rdif + gdif + bdif) / 3; //faço a média dos 3 componentes porque isso dá-nos mais ou menos o valor do brilho
                  total = total + bright;
              }
          }
      }
  }
  if (total > 0) {
      console.log(total);
      capture.updatePixels();
  }
}

//COPIAR FRAME
function copyImage(src, destiny) {
    let n = src.length;
    if (!destiny || destiny.length !== n) {
        destiny = new src.constructor(n);
    }

    while (n--) {
        destiny[n] = src[n];
    }

    return destiny;
}
