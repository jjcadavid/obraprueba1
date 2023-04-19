//******************************************//
//  PROGRAMA REALIZADO POR LOS DOCENTES:    //
//  ESTEBAN GUTIÉRREZ JIMÉNEZ Y             //
//  JOSÉ JULIÁN CADAVID SIERRA              //
//  En el marco del curso Arte Digital en   //
//  la Esfera Pública, de la Maestría en    //
//  Artes Digitales del ITM.                //
//  Si este código va a ser usado, hacer    //
//  reconocimiento de los créditos.         //
//******************************************//

/*  1. Juan      
    2. Jose      https://editor.p5js.org/joserojo9315/full/a9GyIyl70
    3. Natalia   https://editor.p5js.org/natybecquer/full/3_APEGVGd
    4. Daniel    https://editor.p5js.org/AtaraxiaCOL/full/J-vNAaUuP
    5. Sebastián https://editor.p5js.org/jsbenjumea/full/puwgigiBw
    6. Sala      https://www.spatial.io/s/El-tiempo-643de857e51b878c1d9abebf?share=3841139334892818885  

Nota: si es la obra personal, coloar el link del spatial personal
*/
let w;
let h;
let prendedor1;
let botonInteractivo1;
let cantBotones = 6;
let botonesMenu = [];
let titulosBotones = [" ", "Jose", "Nata", "Dani", "Sebas", "Sala"];
let URLS = [
  "https://centropixels.com/arte-digital/",
  "https://editor.p5js.org/joserojo9315/full/a9GyIyl70",
  "https://editor.p5js.org/natybecquer/full/3_APEGVGd",
  "https://editor.p5js.org/AtaraxiaCOL/full/J-vNAaUuP",
  "https://editor.p5js.org/jsbenjumea/full/puwgigiBw",
  "https://www.spatial.io/s/El-tiempo-643de857e51b878c1d9abebf?share=3841139334892818885",
];
let imagenFondo = null;
let nAccesos = 2;
let accesos = [];

function setup() {
  createCanvas(1080, 2700);
  w = width;
  h = height;
  imagenFondo = loadImage("imagenes/backgroundWebCasa.png"); // CARGA DE IMAGEN DE FONDO DE PANTLLA
  accesos[0] = new BotonMAD(w * 0.8, h * 0.8, " ", 100, false);
  accesos[0].imag = loadImage("imagenes/prendedor1.png");
  accesos[0].imagFondoEmergente = loadImage("imagenes/prendedor1Emergente.png");
  accesos[0].sonido = loadSound("audios/estomago.mp3");

  accesos[1] = new BotonMAD(w * 0.8, h * 0.85, " ", 100, false);
  accesos[1].imag = loadImage("imagenes/prendedor2.png");

  accesos[2] = new BotonMAD(w * 0.5, h * 0.5, " ", 100, false);
  accesos[2].imag = loadImage("imagenes/prendedor2.png");

  //***********************CREACIÓN Y CONFIGURACIÓN DE BOTONES DE NAVEGACIÓN
  for (let i = 0; i < cantBotones; i++) {
    botonesMenu.push(
      new BotonMAD(
        (w / (cantBotones + 2)) * i + w / cantBotones,
        50,
        titulosBotones[i],
        w * 0.085,
        true
      )
    );
    botonesMenu[i].url = URLS[i];
    botonesMenu[i].setColorTextoBoton(255, 255, 255);
  }
    botonesMenu[0].imag=loadImage("/imagenes/prendedor1.png");
    botonesMenu[5].imag=loadImage("/imagenes/prendedor2.png");

  //************************************************************************
}

function draw() {
  background(220);
  if (imagenFondo != null) {
    //pinta una imagen de fondo siempre y cuando se cargue
    imageMode(CENTER);
    image(imagenFondo, w / 2, h / 2, w, h);
  }

  for (let i = 0; i < cantBotones; i++) {
    botonesMenu[i].show();
  }
  mostrarAccesos();
}

//*****************************NO HACER CAMBIOS EN ESTA SECCIÓN*************
function verificador() {
  let check = false;
  for (let i = 0; i <= nAccesos; i++) {
    if (accesos[i].active) {
      check = true;
      for (let j = 0; j <= nAccesos; j++) {
          accesos[j].interactuable = false;
          accesos[j].mostrar=false;
      }
      accesos[i].emergente();
    }
    if (!check) {
      for (let i = 0; i <= nAccesos; i++) {
        accesos[i].interactuable = true;
        accesos[i].mostrar=true;
      }
    }
  }
}

function mostrarAccesos() {
  for (let i = 0; i <= nAccesos; i++) {
    accesos[i].show();
  }
  verificador();
}

class BotonMAD {
  constructor(posx, posy, name, tam, isButton) {
    this.positionx = posx;
    this.positiony = posy;
    this.imag = loadImage("imgBoton.png");
    this.tam = tam;
    this.url;
    this.sonido = loadSound("sonidoInterfaz.mp3");
    this.active = false;
    this.name = name;
    this.textSi;
    this.colR = 200;
    this.colG = 200;
    this.colB = 200;
    this.colLnR = 0;
    this.colLnG = 0;
    this.colLnB = 0;
    this.colorTextBotonR = 0;
    this.colorTextBotonG = 0;
    this.colorTextBotonB = 0;
    this.colEmergenteR = 150;
    this.colEmergenteG = 150;
    this.colEmergenteB = 150;
    this.colTextEmergenteR = 0;
    this.colTextEmergenteG = 0;
    this.colTextEmergenteB = 0;
    this.alphEmergente = 180;
    this.tamCerrar = 30;
    this.isButton = isButton;
    this.imagEmergente = "null";
    this.textEmergente = "null";
    this.imagFondoEmergente = loadImage("imgFondoEmergente.png");
    this.wEmergente = 1000;
    this.interactuable = true;
    this.mostrar = true;
  }
  show() {
    this.mostrarBoton();
  }

  mostrarBoton() {
    if (this.mostrar) {
      push();
      translate(this.positionx, this.positiony);
      rectMode(CENTER);
      imageMode(CENTER);
      textAlign(CENTER, CENTER);

      if (
        mouseX > this.positionx - this.tam / 2 &&
        mouseX < this.positionx + this.tam / 2 &&
        mouseY > this.positiony - this.tam / 2 &&
        mouseY < this.positiony + this.tam / 2 &&
        !this.active &&
        this.interactuable
      ) {
        stroke(this.colLnR - 50, this.colLnG - 50, this.colLnB - 50);
        fill(this.colR - 50, this.colG - 50, this.colB - 50);
        rect(0, 0, this.tam, this.tam);
        if (!this.isButton) {
          this.active = true;
          if (!this.sonido.isPlaying()) this.sonido.play();
        }
        if (mouseIsPressed && this.isButton) window.open(this.url);
      } else {
        fill(this.colR, this.colG, this.colB);
        stroke(this.colLnR, this.colLnG, this.colLnB);
      }

      //rect(0, 0, this.tam, this.tam);
      image(this.imag, 0, 0, this.tam, this.tam);
      fill(this.colorTextBotonR, this.colorTextBotonG, this.colorTextBotonB);
      textSize(0.3 * this.tam);
      text(this.name, 0, 0);
      pop();
    }
  }
  emergente() {
    if (this.active) {
      noStroke();
      fill(
        this.colEmergenteR,
        this.colEmergenteG,
        this.colEmergenteB,
        this.alphEmergente
      );
      push();
      rectMode(CENTER);
      imageMode(CENTER);
      translate(w / 2, h / 2);

      rect(0, 0, this.wEmergente, this.wEmergente);
      if (this.imagFondoEmergente != "null") {
        image(this.imagFondoEmergente, 0, 0, this.wEmergente, this.wEmergente);
      }
      pop();
      if (this.imagEmergente != "null" && this.textEmergente != "null") {
        imageMode(CENTER);
        image(this.imagEmergente, w / 2, h / 2 - h * 0.15);
        textSize(0.3 * this.tam);
        textAlign(LEFT, CENTER);
        fill(
          this.colTextEmergenteR,
          this.colTextEmergenteG,
          this.colTextEmergenteB
        );
        text(this.textEmergente, h * 0.1, h * 0.5, w * 0.8, h / 2 - h * 0.15);
      } else if (this.imagEmergente == "null" && this.textEmergente != "null") {
        imageMode(CENTER);
        textSize(0.3 * this.tam);
        textAlign(LEFT, CENTER);
        fill(
          this.colTextEmergenteR,
          this.colTextEmergenteG,
          this.colTextEmergenteB
        );
        text(this.textEmergente, w * 0.15, h * 0.2, w * 0.69, h / 2 - h * 0.2);
      } else if (this.imagEmergente != "null" && this.textEmergente == "null") {
        imageMode(CENTER);
        image(this.imagEmergente, w / 2, h / 2, h * 0.8, h * 0.8);
      } else {
      }
    }
    this.cerrar();
  }
  cerrar() {
    let wEmergente = constrain(h * 0.9, 500, w - w * 0.1);
    if (
      dist(mouseX, mouseY, w * 0.5 + wEmergente / 2, h * 0.5 - wEmergente / 2) <
      this.tamCerrar
    ) {
      fill(220, 0, 0);
      if (mouseIsPressed) {
        this.active = false;
        this.sonido.stop();
      }
    } else {
      fill(200, 0, 0);
    }
    circle(w * 0.5 + wEmergente / 2, h * 0.5 - wEmergente / 2, this.tamCerrar);
    fill(0);
    textSize(0.02 * w);
    textAlign(CENTER, CENTER);
    text("x", w * 0.5 + wEmergente / 2, h * 0.5 - wEmergente / 2);
  }
  setColorTextoBoton(r, g, b) {
    this.colorTextBotonR = r;
    this.colorTextBotonG = g;
    this.colorTextBotonB = b;
  }
  setColorTextoEmergente(r, g, b) {
    this.colTextEmergenteR = r;
    this.colTextEmergenteG = g;
    this.colTextEmergenteB = b;
  }
  setColorTextoBoton(r, g, b) {
    this.colorTextBotonR = r;
    this.colorTextBotonG = g;
    this.colorTextBotonB = b;
  }
}
