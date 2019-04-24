//button constructor
//
function Button(x,y,width,height,buttonText,oujabe){
  this.x = x;
  this.y = y;
  this.buttonText = buttonText;
  this.oujabe = oujabe;
  this.width = width;
  this.height = height;
  this.fill = "#93a586";
}

Button.prototype.display = function(){
  push();
  noStroke();
  fill(this.fill);
  rect(this.x,this.y,this.width,this.height);
  pop();
  push();
  textAlign(LEFT, TOP);
  fill(255);
  textSize(18);
  text(this.buttonText, this.x+5, this.y);
  pop();
}

Button.prototype.clicked = function(){
  if(mouseX > this.x && mouseX < this.x+this.width && mouseY > this.y && mouseY < this.y+this.height){
    if(this.oujabe.length > 1){
      for(let i = 0; i < this.oujabe.length; i++){
        this.oujabe[i].breed(mother, father);
      }
    }
    else{
      this.oujabe.breed(mother,father);
    }
  }
}
