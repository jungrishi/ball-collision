const WRAPPERWIDTH = 700;
const WRAPPERHEIGHT = 500;
const BOXHEIGHT = 10;
const BOXWIDTH = 10;
const TOTALBOX = 5;
const GRAVITY = 9.81;

var wrapper = document.getElementById('app-wrapper');
wrapper.style.width = WRAPPERWIDTH + 'px';
wrapper.style.height = WRAPPERHEIGHT + 'px';
wrapper.style.position = 'relative';
wrapper.style.border = 'solid 1px black'; 

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}  

function Box(x, y, parentEle,xVel, yVel){
  console.log(x,y);
  this.x = x; //set left pos
  this.y = y; //set top pos
  this.element = null;
  this.xVel = xVel;
  this.yVel = yVel;
  console.log(x,y);

  this.init = function() {
    this.element = document.createElement('div');
    this.element.setAttribute('class', 'box');
    this.element.style.width = BOXWIDTH + 'px';
    this.element.style.height = BOXHEIGHT + 'px';
    this.element.style.backgroundColor = 'red';
    this.element.style.position = 'absolute';
    this.element.style.color = this.color;
    console.log(this.element);
    parentEle && parentEle.appendChild(this.element);
  }

  this.draw = function() {
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';
  }

  this.moveBox = function() {
    this.x += this.xVel;
    this.y += this.yVel;
  }

  this.update = function(x , y) {
    this.xVel = x;
    this.yVel = y;
  }

  this.checkCollision = function() {
    // console.log(this.x);
    // console.log(this.y);

    if (this.x + BOXWIDTH >= WRAPPERWIDTH || this.x-BOXWIDTH <= 0 ){
      this.xVel = -this.xVel ;
    }

    else if( this.y + BOXHEIGHT >= WRAPPERHEIGHT || this.y - BOXHEIGHT <= 0 ) {
      this.yVel = -this.yVel;
    }
  }
}

function Animation(parent) {
  var boxes = []; //private array 
  
  this.init = function() {
    for (var i=0; i<TOTALBOX; i++){
      var box= new Box(getRandomArbitrary(0, WRAPPERWIDTH-BOXWIDTH), getRandomArbitrary(0, WRAPPERHEIGHT-BOXHEIGHT),parent, getRandomArbitrary(1,0),getRandomArbitrary(1,0));
      boxes.push(box);
      box.init();
      box.draw();
    }
    setInterval(this.animate.bind(this), 10/60);
  }
  this.animate = function() {
    for (var i= 0; i < boxes.length; i++){
        var box = boxes[i];
        box.moveBox();
        box.checkCollision();
        boxes[i].draw();
      }
    }
  }

new Animation(wrapper).init();


  

