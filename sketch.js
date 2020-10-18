let capture, cnv, total;
let prevFrame;
let w = 640;
let h = 480;
let theta;
let threshold;

let arv = [];

function setup() {
    capture = createCapture(VIDEO);
    capture.size(w, h);
    capture.hide();
    capture.center();

    cnv = createCanvas(w, h);
    cnv.center();

    threshold = 400000;

    arv[0] = new Tree(width/2, height, 100);
    arv[1] = new Tree(width/4, height, 50);
    arv[2] = new Tree(3*width/4, height, 80);
}

function draw() {
    background('#475B5A');
    frameRate(10);

    personMovement();

    for(let i = 0; i < arv.length; i++) {
        arv[i].show();
    }

}

//DETEÇÃO DE MOVIMENTO
function personMovement() {
  capture.loadPixels();
  total = 0;
  if (capture.pixels.length > 0) { // don't forget this!
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

                  let bright = (rdif + gdif + bdif) / 3;
                  total = total + bright;
              }
          }
      }
  }
  // need this because sometimes the frames are repeated
  if (total > 0) {
      console.log(total);
      capture.updatePixels();
  }
}

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
