const WRAPPERWIDTH = 700;
const WRAPPERHEIGHT = 500;
const BOXHEIGHT = 35;
const BOXWIDTH = 35;
const TOTALBOX = 10;
const GRAVITY = 9.81;
const DIAGONAL =Math.sqrt(Math.pow(BOXWIDTH,2)+Math.pow(BOXHEIGHT,2));

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
    this.element.style.backgroundColor = 'black';
    this.element.style.position = 'absolute';
    console.log(this.element);
    parentEle && parentEle.appendChild(this.element);
  }

  this.draw = function() {
    console.log('in draw')
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';
 
  }

  this.moveBox = function() {
    this.x += this.xVel;
    this.y += this.yVel;
  }

  this.update = function(rawTheta) {
    this.xVel = this.xVel * Math.cos(rawTheta);
    this.yVel = this.yVel * Math.sin(rawTheta);
    console.log('update ' + xVel, yVel);
  }

  this.checkBoundaryCollision = function() {
    if (this.x + BOXWIDTH >= WRAPPERWIDTH || this.x-BOXWIDTH <= 0 ){
      this.xVel = -this.xVel ;
    }
    else if( this.y + BOXHEIGHT >= WRAPPERHEIGHT || this.y - BOXHEIGHT <= 0 ) {
      this.yVel = -this.yVel;
    }
  }
  this.angle = function() {
    return (-this.y) / this.x;
  }

  this.distance = function (v1,v2) {
    console.log('from distance cacl this' + this);
    return Math.sqrt(Math.pow((v2[1] - v1[1]),2) + Math.pow((v2[0]-v1[0]),2));
    
  }

  this.checkCollision = function(obj) {
    const VECTEXT1 = [[this.x , this.y] , [this.x +BOXWIDTH , this.y],
    [this.x , this.y+BOXHEIGHT],
     [this.x +BOXWIDTH, this.y+BOXHEIGHT]]

   
    const VECTEXT2 = [[obj.x , obj.y],
    [obj.x +BOXWIDTH , obj.y],
    [obj.x , obj.y+BOXHEIGHT],
     [obj.x +BOXWIDTH, obj.y+BOXHEIGHT]]
     var mag=[]

     for(var i in [0,1,2,3]){
mag.push(this.distance(VECTEXT1[i],VECTEXT2[i]));
    }
    console.log(mag);
    console.log(Math.min(...mag))
    
    if (Math.min(...mag)<DIAGONAL){
      console.log('collison mini')
      this.xVel = -this.xVel;
      this.yVel = -this.yVel;  
      obj.xVel = -obj.xVel;
      obj.yVel = -obj.yVel;
      return true;
    }
return false;
    // console.log('from check collision')
    // var dis = this.distance(obj);
    // var rawTheta = (this.x-obj.x)/dis;
    // console.log('befoe = ' +this.xVel);
    // // this.update(rawTheta);
    // // obj.update(rawTheta);
    // console.log('after = ' + this.xVel);

    // if (this.distance(obj) <= this.BOXWIDTH + obj.BOXWIDTH ) {
      
    // }

  }
}

function Animation(parent) {
  var boxes = []; //private array 
  
  this.init = function() {
    for (var i=0; i<TOTALBOX; i++){
      var box= new Box(getRandomArbitrary(0, WRAPPERWIDTH-BOXWIDTH), getRandomArbitrary(0, WRAPPERHEIGHT-BOXHEIGHT),parent, getRandomArbitrary(1,3),getRandomArbitrary(1,3));
      boxes.push(box);
      box.init();
      box.draw();
    }
    setInterval(this.animate.bind(this), 30);
    // requestAnimationFrame(() => this.animate());
  }
  this.animate = function() {
    for (var i= 0; i < boxes.length; i++){
      const box = boxes[i];
        box.moveBox();
        box.draw();
      for (var j =0; j < boxes.length; j++){  
          if ( i  != j ){
            box.checkCollision(boxes[j])
        }
        box.draw();
      }
        box.checkBoundaryCollision();
     
   
    }
  }
}
new Animation(wrapper).init();


  

