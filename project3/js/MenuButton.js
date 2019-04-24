//MenuButton constructor
//
//builds a button for the menu
function MenuButton(x,y,width,heigth,animal,value,locusName,position,spot){
  this.x = x;
  this.y = y;
  this.value = value;
  this.width = width;
  this.heigth = heigth;
  this.animal = animal;
  this.locusName = locusName;
  this.position = position;
  this.spot = spot;
  this.idleFill = "#f4ffed";
  this.activeFill = this.animal.colorSet[3];
  this.currentFill = this.idleFill;
  this.textFill = 0;
  this.textSize = 12;
}

//display()
//
//displays the button as a square with a letter on it
//the button is off white if it's unselected and the same color as the oujabe head if it is selected
MenuButton.prototype.display = function(){
  push();
  fill(this.currentFill);
  noStroke();
  rect(this.x,this.y,this.width,this.heigth);
  pop();
  push();
  fill(this.textFill);
  textSize(this.textSize);
  textLeading(12);
  textAlign(LEFT, TOP);
  text(this.value, this.x+3, this.y);
  pop();
}

//clicked()
//
//this function checks if the button has been clicked and calls the proper function
MenuButton.prototype.clicked = function(){
  if(mouseX > this.x && mouseX < this.x+this.width && mouseY > this.y && mouseY < this.y+this.heigth){
    this.animal.parametersUpdate(this.locusName,this.position,this.value,this.spot);
  }
}

//newClicked()
//
//checks if the button has been clicked and calls the proper function - this one is for buttons that generate a new oujabe
MenuButton.prototype.newClicked = function(){
  if(mouseX > this.x && mouseX < this.x+this.width && mouseY > this.y && mouseY < this.y+this.heigth){
    this.animal.generateRandom();
  }
}

//setFill()
//
//set currentFill to either the head color of the animal or the idleFill (off white)
MenuButton.prototype.setFill = function(){
  this.activeFill = this.animal.colorSet[3];
  if(this.animal.genes[this.locusName][this.position] === this.value){
    this.currentFill = this.activeFill;
  }
  else{
    this.currentFill = this.idleFill;
  }
}

//changeColor()
//
//artificially set the button and text color to another color
MenuButton.prototype.changeStyle = function(buttonFill, textFill, textSize){
  this.currentFill = buttonFill;
  this.textFill = textFill;
  this.textSize = textSize;
}
