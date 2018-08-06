$( document ).ready(function() {  


var restart_area = $('.game-end');
var restart_button = $('#restart-game');
var display_score = $('.display-score');
var scoreDiv = $('.score');

var c1 = $('#c1');
var c2 = $('#c2');
var c3 = $('#c3');
//var c4 = $('#c4');

var rd1 = $('#rd1');
var rd2 = $('#rd2');
var rd3 = $('#rd3');
//var rd4 = $('#rd4');

var road = $('.road');
var car = $('#myCar');


var road_height =parseInt (road.css('height'));
var road_width =parseInt (road.css('width'));
var road_left= parseInt(road.css('left'));
var car_width =parseInt (car.css('width'));
var car_height =parseInt (car.css('height'));


var gameOver = false;
var score = 0;
var speed = 2;
var rdSpeed =3;
var randPlace=-200;
var count=0;
var scoreInc=1;
var rdSpeedInc=0.01;
var speedInc=0.001;

var move_left = false;
var move_right = false;
var move_up = false;
var move_down = false;

var mobCom=0;

start();

function start(){
  randomCar(c1);
  randomCar(c2);
  randomCar(c3);
  //randomCar(c4);
}

function randomCar(thisCar){
  randVal = parseInt(Math.random()*(road_width-car_width));
  thisCar.css('left',randVal);
  var x=parseInt(thisCar.css('top'));
  thisCar.css('top',x-500);
}
/* moving cars down */
move_all_cars = requestAnimationFrame(move_cars);

function move_cars(){
  if(gameOver==false){
    
    count++;
    if(count > 10){
      score+=scoreInc;
      rdSpeed+=rdSpeedInc;
      speed+=speedInc;
      count=0;
      scoreInc +=0.01;
      rdSpeedInc+=0.001;
      speedInc+=0.001;
      scoreDiv.html(parseInt(score));
    }
    
    
    carsDown(c1);
    carsDown(c2);
    carsDown(c3);
    //carsDown(c4);
    move_all_cars = requestAnimationFrame(move_cars);
  }
  
}

function carsDown(thisCar){
  if (parseInt(thisCar.css('top')) > (road_height)){
    thisCar.css('top', -200);
    randVal = parseInt(Math.random()*(road_width-car_width));
    //console.log(randVal);
    thisCar.css('left',randVal);
    
  }
  thisCar.css('top',parseInt(thisCar.css('top'))+speed);
}


/* moving line down */
move_all_dividers = requestAnimationFrame(move_lines);

function move_lines(){
  if(gameOver==false){

    //if(iscollide(car,c1) || iscollide(car,c2) || iscollide(car,c3) ||iscollide(car,c4)){
    if(iscollide(car,c1) || iscollide(car,c2) || iscollide(car,c3)){
    
      resetGame();
    }
    lineDown(rd1);
    lineDown(rd2);
    lineDown(rd3);
    //lineDown(rd4);
    move_all_dividers = requestAnimationFrame(move_lines);

  }
  
}

function lineDown(thisLine){
  if (parseInt(thisLine.css('top')) > (road_height)){
    thisLine.css('top', -90);
  }
  thisLine.css('top',parseInt(thisLine.css('top'))+rdSpeed);
}


/************************** */
/***************************************************************** 
              DEVICE ORIENTATION 
************************************************************************************ */
if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", function(event) {
      var leftToRight = event.gamma;
      var frontToBack = event.beta;
      handleOrientationEvent(frontToBack, leftToRight);
  }, true);
}

var handleOrientationEvent = function(frontToBack, leftToRight) {
  if(gameOver==false){
    mobCom=3;
    if(leftToRight < -10){ move_left = requestAnimationFrame(left); }
    else if (leftToRight > 10){ move_right = requestAnimationFrame(right); }
    else{
      move_left = cancelAnimationFrame(move_left);
      move_left=false;
      move_right = cancelAnimationFrame(move_right);
      move_right=false;
      
    }

    if(frontToBack < -10){ move_up = requestAnimationFrame(up); }
    else if ( frontToBack > 10){ move_down = requestAnimationFrame(down); }
    else{
      move_up = cancelAnimationFrame(move_up);
      move_up=false;
      move_down = cancelAnimationFrame(move_down);
      move_down=false;
      
    }
  }
};

$(document).on("keydown",function(e){

  mobCom = 0;

  if(gameOver == false){
    var pressedKey = e.keyCode;
    //console.log(pressedKey);
    if(pressedKey == 37 && move_left==false){
      move_left = requestAnimationFrame(left);
    }

    else if(pressedKey == 38 && move_up==false){
      move_up = requestAnimationFrame(up);
    }

    else if(pressedKey == 39 && move_right==false){
      move_right = requestAnimationFrame(right);
    }

    else if(pressedKey == 40 && move_down==false){
      move_down = requestAnimationFrame(down);
    }
  }

});
$(document).on("keyup",function(e){
  

  if(gameOver == false){
    var pressedKey = e.keyCode;
    
    if(pressedKey == 37 ){
      move_left = cancelAnimationFrame(move_left);
      move_left=false;
    }

    else if(pressedKey == 38 ){
      move_up = cancelAnimationFrame(move_up);
      move_up=false;
    }

    else if(pressedKey == 39 ){
      move_right = cancelAnimationFrame(move_right);
      move_right=false;
    }

    else if(pressedKey == 40 ){
      move_down = cancelAnimationFrame(move_down);
      move_down=false;
    }
  }

});

function left(){
  if (gameOver == false && parseInt(car.css('left'))>7){
    car.css('left', parseInt(car.css('left'))-5+mobCom)
    move_left=requestAnimationFrame(left);
  }
}

function up(){
  if (gameOver == false && (parseInt(car.css('top')))>0 ){
    car.css('top', parseInt(car.css('top'))-5+mobCom)
    move_up=requestAnimationFrame(up);
  }
}

function right(){
  if (gameOver == false &&  ((parseInt(car.css('left'))+car_width) <road_width-5)){
    car.css('left', parseInt(car.css('left'))+5-mobCom)
    move_right=requestAnimationFrame(right);
  }
}

function down(){
  if (gameOver == false && ((parseInt(car.css('top'))+car_height) <road_height-2) ){
    car.css('top', parseInt(car.css('top'))+5-mobCom)
    move_down=requestAnimationFrame(down);
  }
}

function iscollide(car1,car2){
  l1= parseInt(car1.css('left'));
  l2= parseInt(car2.css('left'));
  t1= parseInt(car1.css('top'));
  t2= parseInt(car2.css('top'));

  if (  (l2 > (l1-car_width)) && (l2 < (l1+car_width)) && (t2+car_height)>t1+5 && t2 < (t1+car_height)){
    return true;
  }
  return false;
}

function resetGame(){
  gameOver=true;
  restart_area.css('display','block');
  restart_button.focus();
  display_score.html(parseInt(score));
  cancelAnimationFrame(up);
  cancelAnimationFrame(down);
  cancelAnimationFrame(right);
  cancelAnimationFrame(left);
  cancelAnimationFrame(move_lines);
  cancelAnimationFrame(move_cars);
  
  
  
}

restart_button.click(function(){
  location.reload();
});

});
