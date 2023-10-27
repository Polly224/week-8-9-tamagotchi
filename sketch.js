let tamagotchi = {happiness: 0, hunger: 0};
let money = 0;
let moneyImg;
let happyState = 0;
let chicaGifFrames = [];
let chicaFrames = [];
let currentScreen = "mainmenu";
let timerTime = [25, 0];
let timerIsGoing = false;
let startButton;
let stopButton;
let secondInput;
let minuteInput;
let hungerImg;
let happinessImg;
let textPos = 0.1;
let textUp = false;
let hungryState = 0;
let ogTime = [];
let saveData = [];
let happyTimer = 0;
let deathTimer = 1000;
let playImg;
let playIcons = [];
let trickTimer = 0;
let isDoingTrick = false;
let trickType;
let rotateVal = 0;
let spinSound;

function preload(){
  moneyImg = loadImage("assets/money.png");
  for (let i = 0; i < 6; i++) {
     chicaFrames.push(loadImage("assets/chica" + i.toString() + ".jpg"))
  }
  for (let i = 0; i < 6; i++){
    chicaGifFrames.push(loadImage("assets/petpet.gif"))
  }
  playImg = loadImage("assets/trick.png");
  hungerImg = loadImage("assets/hunger.png");
  happinessImg = loadImage("assets/happiness.png");
  foodAnimation[0] = loadImage("assets/burger.png");
  foodAnimation[1] = loadImage("assets/burger1.png");
  foodAnimation[2] = loadSound("assets/eating.mp3");
  pettingSound = loadSound("assets/petting.mp3");
  for(let i = 0; i < 3; i++){
    playIcons.push(loadImage("assets/trick" + (i + 1).toString() + ".png"));
  }
  spinSound = loadSound("assets/spin.mp3");
}

function setup() {
  // BUTTONS
  angleMode(DEGREES);
  createCanvas(800, 600);
  background(220);
  startButton = createButton("Start");
  startButton.position(435.5, 300);
  startButton.size(150, 50)
  startButton.mousePressed(timerStart);
  stopButton = createButton("Stop");
  stopButton.position(612.5, 300);
  stopButton.size(150, 50);
  stopButton.mousePressed(timerStop);
  push()
  rectMode(CENTER);
  minuteInput = createInput(25);
  minuteInput.position(545, 50);
  minuteInput.size(45);
  secondInput = createInput(0);
  secondInput.position(605, 50);
  secondInput.size(45);
  pop();

  if(getItem("happiness") == null){
    tamagotchi.happiness = 40;
  } else {
    tamagotchi.happiness = getItem("happiness");
  }
  if(getItem("hunger") == null){
    tamagotchi.hunger = 60;
  } else {
    tamagotchi.hunger = getItem("hunger");
  }
}

function draw() {
  
  if(tamagotchi.happiness == 0){
    deathTimer --;
  }
  if(tamagotchi.happiness > 100){
    tamagotchi.happiness = 100;
  }
  happyTimer++;
  // DRAW
  background(220);
  text("Minutes    Seconds", 560, 40);
  push();
  fill(255, 201, 251);
  circle(350, 550, 75);
  image(happinessImg, 320, 523, 60, 60);
  pop();
  push();
  fill(216, 97, 10);
  circle(50, 550, 75);
  image(hungerImg, 20, 520, 60, 60);
  pop();
  push();
  fill(145, 255, 209);
  circle(200, 550, 75);
  image(playImg, 170, 520, 60, 60);
  pop();
  strokeWeight(1);
  line(400, 0, 400, 600);
  image(moneyImg, 10, 10, 50, 50);
  happyState = floor(tamagotchi.happiness / 20);
  hungryState = ceil(tamagotchi.hunger / 20);
  push();  
  imageMode(CENTER);
  translate(200, 300)
  rotate(rotateVal);
  image(chicaFrames[happyState], 0, 0);
  pop();
  textSize(50);
  text(money, 75, 52);
  strokeWeight(5);
  circle(365, 35, 50);
  text("i", 360, 15, 50);
  textSize(10);
  text(day().toString() + "/" + month().toString() + " - " + hour().toString() + ":" + minute().toString() + ":" + second().toString(), 722, 590);

  // FEEDING CODE
  feedingTimer--;
  if(isFeeding){
    if(textUp){
      if(textPos < 20){
        textPos += 2;
      } else {
        textUp = false;
      }
    } else {
      if(textPos > 0){
        textPos -=2;
      } else{
        textUp = true;
      }
    }
    if(feedingTimer > 50){
      image(foodAnimation[0], 220, 320 - textUp, 50, 50);
    }
    if(feedingTimer > 0 && feedingTimer <= 50){
      image(foodAnimation[1], 220, 320 - textUp, 50, 50);
    }
    if(feedingTimer <= 0){
      if(tamagotchi.hunger <= 80){
        isFeeding = false;
        tamagotchi.hunger += 20;
      }
      if(tamagotchi.hunger > 80){
        tamagotchi.happiness += 10;
      }
    }
  }

  // TIMER CODE

  push()
  textSize(50)
  rectMode(CENTER);
  if(timerTime[1] < 10 && timerTime[0] > 9){
    text(timerTime[0] + ":0" + timerTime[1], 540, 200)
  } else{
    if(timerTime[1] > 9 && timerTime[0] < 10){
      text("0" + timerTime[0] + ":" + timerTime[1], 540, 200)
    } else {
      if(timerTime[0] > 9 && timerTime[1] > 9){
        text(timerTime[0] + ":" + timerTime[1], 540, 200);
      } else {
        text("0" + timerTime[0] + ":0" + timerTime[1], 540, 200);
      }
    }
  }
  pop()
  if(frameCount % 60 == 0){
    if(timerIsGoing){
      if(timerTime[1] > 0){
        timerTime[1] -= 1;
      } else{
        if(timerTime[0] > 0){
          timerTime[0] -= 1;
          timerTime[1] = 59;
        }
      }
   }
   if(tamagotchi.happiness > 0 && happyTimer % 500 == 0){
    if(tamagotchi.hunger == 0){
      tamagotchi.happiness -= 15
    }
    tamagotchi.happiness -= 5;
    storeItem('happiness', tamagotchi.happiness);
   }
   if(tamagotchi.hunger > 0 && happyTimer % 200 == 0){
    tamagotchi.hunger -= 5
   }
    
  }
  if(timerTime[1] == timerTime[0] && timerTime[0] == 0 && timerIsGoing){
    timerStop();
  }
  // TRICK SCREEN CODE

  if(currentScreen == "trickmenu"){
    push();
    fill(255);
    rectMode(CENTER);
    rect(200, 460, 350, 70);
    for(let i = 0; i < 3; i++){
      circle(66 + i * (400 /3), 460, 50);
      image(playIcons[i], 46 + i * (400 / 3), 440, 40, 40);
    }
    pop(); 
  }

  // TRICK CODE

  if(isDoingTrick && trickTimer > 0){
    trickTimer--;
    switch(trickType){
      case 1:
      rotateVal += 20;
    }
  }
  if(trickTimer == 0){
    rotateVal = 0;
    isDoingTrick = false;
  }

  // INFO SCREEN CODE

  if(currentScreen == "infomenu"){
    push();
    fill(255);
    rectMode(CENTER);
    rect(200, 300, 350 , 250);
    fill(0);
    textSize(20)
    text("Hunger", 50, 220)
    text("Happiness", 50, 330);
      push()
      textSize(10)
      if(textPos > 5){
        textUp = false;
      } else {
        if(textPos <= 0.1){
          textUp = true;
        }
      }
      if(textUp){
        textPos += 0.1 * textPos;
      } else {
        textPos -= 0.1 * textPos;
      }
      if(tamagotchi.happiness == 100){
        push();
        textSize(15);
        fill(255, 175, 248);
        text("Max happiness!!!", 200, 330 + textPos);
        pop();
      }
      if(hungryState == 5){
        push();
        textSize(15);
        fill(255, 114, 0);
        text("Totally full!", 200, 230 + textPos);
        pop();
      }
      pop();
    pop();
    push();
    rectMode(CORNER);
    image(happinessImg, 150, 305, 40, 40);
    image(hungerImg, 120, 190, 50, 50);
    fill(255, 114, 0);
    noStroke();
    rect(50, 250, hungryState * 60, 50);
    stroke(0);
    noFill();
    rect(50, 250, 300, 50);
    noStroke();
    fill(255, 109, 240)
    rect(50, 350, tamagotchi.happiness * 3, 50);
    noFill();
    stroke(0);
    rect(50, 350, 300, 50);
    pop();
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 2; j++){
        line(110 + i * 60, 250 + 100 * j, 110 + i * 60, 300 + 100 * j);
      }
    }
  }

  // PETTING CODE
  if(isPetting){
    image(chicaGifFrames[happyState], 100, 130, 200, 200);
    pettingTimer--;
    if(pettingTimer <= 0){
      isPetting = false;
      pettingSound.stop();
      if(tamagotchi.happiness <= 80){
        tamagotchi.happiness += 20;
      } else {
        tamagotchi.happiness = 100;
      }
    }
  }
  // SAVE DATA
  storeItem("hunger", tamagotchi.hunger);  
}

function keyPressed(){
  if(key == "ArrowRight" && tamagotchi.happiness <= 80){
    tamagotchi.happiness += 20;
  } else {
    if(key == "ArrowRight"){
      tamagotchi.happiness = 100;
    }
  }
  if(key == "ArrowLeft" && tamagotchi.happiness >= 20){
    tamagotchi.happiness -= 20;
  } else {
    if(key == "ArrowLeft"){
    tamagotchi.happiness = 0;
    }
  }
}

function mouseClicked(){
  let stopItRightThere = false;
  if(!isFeeding){
    if(mouseX > 340 && mouseX < 390 && mouseY > 5 && mouseY < 60){
      if((currentScreen == "mainmenu" || currentScreen == "trickmenu") && !isFeeding && !isPetting){
        currentScreen = "infomenu"
        stopItRightThere = true;
      } 
      if(currentScreen == "infomenu" && stopItRightThere == false){
        currentScreen = "mainmenu"
      }
    }
    if(mouseX > 160 && mouseX < 240 && mouseY > 510 && mouseY < 590){
      // if(currentScreen == "mainmenu" || currentScreen == "infomenu" && !isFeeding && !isPetting){
      //   currentScreen = "trickmenu";
      //   stopItRightThere = true;
      // }
      // if(currentScreen == "trickmenu" && stopItRightThere == false){
      //   currentScreen = "mainmenu";
      // }
      trick(1)
    }
  }
  if(mouseX > 10 && mouseX < 90 && mouseY > 510 && mouseY < 590 && (currentScreen == "mainmenu" || currentScreen == "trickmenu") && !isDoingTrick){
    feed();
  }
  if(mouseX > 310 && mouseX < 390 && mouseY > 510 && mouseY < 590 && (currentScreen == "mainmenu" || currentScreen == "trickmenu") && !isDoingTrick){
    pet();
  }
  console.log(mouseX, mouseY);
}

function timerStart(){
  timerTime[0] = minuteInput.value();
  timerTime[1] = secondInput.value();
  ogTime[0] = timerTime[0];
  ogTime[1] = timerTime[1];
  timerIsGoing = true;
}

function timerStop(){
  timerIsGoing = false;
  if(ogTime[1] > timerTime[1]){
    money += (ogTime[0] - timerTime[0]);
  } else {
    money += (ogTime[0] - timerTime[0] - 1);
  }
  ogTime[0] = timerTime[0]
  ogTime[1] = timerTime[1];
}

let isFeeding = false;
let feedingTimer = 100;
let foodAnimation = [];

function feed(){
  if(hungryState < 5){
    if(!isFeeding){
      isFeeding = true;
      foodAnimation[2].play();
      feedingTimer = 100;
    }
  } else if(!isFeeding){
    if(tamagotchi.happiness > 10){
      tamagotchi.happiness -= 10;
    alert("Your chica is already full!");
    } else {
        tamagotchi.happiness = 0;
        alert("Your chica is already full! And she doesn't look very happy with you...")
    }
  }
}

let isPetting = false;
let pettingSound;
let pettingTimer = 200;

function pet(){
  if(!isPetting){
    isPetting = true;
    pettingSound.play();
    pettingTimer = 200;
  }
}

function trick(tVal){
  switch(tVal){
    case 1:
      isDoingTrick = true;
      trickTimer = 300;
      trickType = 1;
      spinSound.play();
      break;
  }
}