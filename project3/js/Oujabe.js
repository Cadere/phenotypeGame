//some variables for the oujabe constructor
let sex = ["m","f"];
let spotColor = ["#f5eb4e","#e1e593","#e5efc0"];

//Oujabe constructor
//
//this is both responsible for creating the little animals
//and holds all the complicated genetics behind
function Oujabe(){
  this.sex = "";
  //this holds the phenotype characteristics that affect the colors
  this.phenotype = "";
  //this holds the phenotype characteristics that do not affect the colors
  this.pattern = "";
  this.letality = false;
  this.albino = false;
  this.genes = {};
  //these variables will be used to display the proper images to reflect the pattern genes present
  this.red = true;
  this.mask = false;
  this.violet = false;
  this.colorSet;
  this.spot = true;
  this.bodySpots = [];
  this.headSpots =  [];
  //parameters for displaying - only set in display
  this.width;
  this.height;
}

//parametersReset();
//
//sets the parameters back to the default values
//this method exists to prevent characteristics stacking instead of replacing eachother
Oujabe.prototype.parametersReset = function(boolean,spot){
  //the genes are not emptied unless the boolean is true
  //this is because i do not want to generate new genes from scractch if I am only changing one
  //or to empty all the genes when I only change one
  if(boolean){
    this.genes = {};
  }
  this.phenotype = "";
  this.pattern = "";
  this.letality = false;
  this.albino = false;
  this.red = true;
  this.mask = false;
  this.violet = false;
  this.spot = true;
  this.spotColor;
  //since spots have two possible patterns for each genotype,
  //I do not want the selected images to change unless the related locus has been modified
  if(spot){
    this.bodySpots = [];
    this.headSpots = [];
  }
}

//parametersUpdate();
//
//allows the parameters to update dynamically when they are changed through the menu
Oujabe.prototype.parametersUpdate = function(locusName, position, value, spot){
  this.parametersReset(false, spot);
  this.genes[locusName][position] = value;
  this.getPhenotype();
}

//generateRandom();
//
//Creates a brand new oujabe randomly
Oujabe.prototype.generateRandom = function(mOrF){
  this.parametersReset(true,true);
  //sex has not yet been implemented as something that matters
  if(!mOrF){
    this.sex = random(sex);
  }
  else{
    this.sex = mOrF;
  }
  //this makes an array with the names of each object in genetics
  let genesKeys = Object.keys(genetics);
  //this generates an attribute for each of these keys
  //and makes it an array of two of the possible values for this key
  for(let i = 0; i < genesKeys.length; i++){
    this.genes[genesKeys[i]] = [random(genetics[genesKeys[i]]), random(genetics[genesKeys[i]])];
  }
  //this generates the pattern and phenotype strings
  this.getPhenotype();
  //this makes it so homozygous lethal oujabe will not be generated when creating a random new one
  if(this.letality){
    this.generateRandom(mOrF);
  }
}

//breed();
//
//generates an oujabe from the information of two others
//letality and sex were not yet implemented as preventing breeding
Oujabe.prototype.breed = function(mother, father){
  //all parameters are reset
  this.parametersReset(true,true);
  //sex is attributed randomly
  this.sex = random(sex);
  //this makes an array with the names of each object in genetics
  let genesKeys = Object.keys(genetics);
  //this generates an attribute for each of these keys
  //and makes it an array of one of the mother's genes and one of the father's genes
  for(let i = 0; i < genesKeys.length; i++){
    this.genes[genesKeys[i]] = [random(mother.genes[genesKeys[i]]), random(father.genes[genesKeys[i]])];
  }
  this.getPhenotype();
}

//getPhenotype();
//
//analyses the present genes to determine what the oujabe's phenotype is
//ie what actually shows up
Oujabe.prototype.getPhenotype = function(){
  this.locusR();
  this.locusF();
  this.locusY();
  this.locusC();
  //these genes here do not matter if the oujabe is albino
  if(!this.albino){
    this.locusD();
    this.locusB();
    this.locusS();
    if(this.spot){
      this.pickSpots();
    }
  }
  else{
    //letality is on the S locus but is still checked if the oujabe is albino
    //same for spots, so that the display() method does  not attempt to display an image that does not exist
    this.spot = false;
    this.checkLetality;
  }
  this.colorSet = pigmentation[this.phenotype];
}

//locusR()
//
//analyses the R locus to determine the phenotype
//determines if the oujabe has a red or blue head, is either R or r
Oujabe.prototype.locusR = function(){
  let locusR = this.genes.locusR.toString();
  //R is dominant: RR and Rr show the same
  if(locusR.indexOf("R") !== -1){
    this.phenotype += "R";
    //R affects both the colors and their repartition
    this.pattern += "R";
    this.red = true;
  }
  else{
    this.phenotype += "r";
    this.pattern += "r";
    this.red = false;
  }
}

//locusF()
//
//analyses the F locus to determine the phenotype
//determines the amount of carotenoids ie. the intensity of yellows and reds
// is either F, b or w (normally b and w would be written f^b, f^w)
Oujabe.prototype.locusF = function(){
  let locusF = this.genes.locusF.toString();
  //F is dominant
  if(locusF.indexOf("F") !== -1){
    this.phenotype += "F";
    this.spotColor = spotColor[0];
  }
  //b is recessive to F but dominant over w
  else if(locusF.indexOf("b") !== -1){
    this.phenotype += "b";
    this.spotColor = spotColor[1];
  }
  //w is recessive
  else{
    this.phenotype += "w";
    this.spotColor = spotColor[2];
  }
}

//locusY()
//
//analyses the Y locus to determine the phenotype
//regulates the amount of melanin, ie, black and blue.
//is either Y or y: y is the "yellow" variant and turns green areas yellower and black to grey
Oujabe.prototype.locusY = function(){
  let locusY = this.genes.locusY.toString();
  //Y is dominant
  if(locusY.indexOf("Y") !== -1){
    this.phenotype += "Y";
  }
  //y is recessive
  else{
    this.phenotype += "y";
  }
}

//locusC()
//
//analyses the C locus to determine the phenotype
//regulates the amount of melanin, ie black, blue. is the locus of albinism
//is either C, c, V, or Y (normally V and Y would be written c^v and c^y)
//V is the "violet" variant and results in a darker, bluer oujabe with violet tints
//Y is the "cinnamon" variant and results in a yellower, browner oujabe
Oujabe.prototype.locusC = function(){
  let locusC = this.genes.locusC.toString();
  //C is dominant
  if(locusC.indexOf("C") !== -1){
    this.phenotype += "C";
    this.violet = false;
  }
  //V is codominant with c but dominant over y
  else if(locusC.indexOf("V") !== -1){
    //V is partially dominant with c
    this.pattern += "V";
    this.violet = true;
    if(locusC.indexOf("c") !== -1){
      //the resulting "v" phenotype is called lilac
      this.phenotype += "v";
      this.albino = true;
    }
    else{
      this.phenotype += "V";
    }
  }
  else if(locusC.indexOf("Y") !== -1){
    this.violet = false;
    //Y is partially dominant with c
    if(locusC.indexOf("c") !== -1){
      //the resulting "y" phenotype is called cream
      this.phenotype += "y";
      this.albino = true;
    }
    else{
      this.phenotype += "Y";
    }
  }
  //c is recessive
  else{
    this.violet = false;
    this.phenotype += "c";
    this.albino = true;
  }
}

//locusD()
//
//analyses to D locus to determine the phenotype
//regulates the amount of melanin: is the locus of hypermelanism
//can be either D or d, d being the "dark" gene
Oujabe.prototype.locusD = function(){
  let locusD = this.genes.locusD.toString();
  //genes on the D locus are codominant
  if(locusD.indexOf("D") !== -1){
    if(locusD.indexOf("d") !== -1){
      //in this case the oujabe is either dD or Dd, called "dark"
      this.phenotype += "d";
    }
    else{
      //in this case the oujabe is DD
      this.phenotype += "D";
    }
  }
  else{
    //in this case the oujabe is dd, called "double Dark"
    this.phenotype += "a";
  }
}

//locusB()
//
//analyses the B locus to determine the phenotype
//is responsible for the presence of absence of a black mask, is either B (no mask) or b (mask)
Oujabe.prototype.locusB = function(){
  let locusB = this.genes.locusB.toString();
  //b is simple dominant over the standard patternless B
  if(locusB.indexOf("b") !== -1){
    //B doesn't affect the color but its distribution, so its phenotype is written on the pattern attribute
    this.pattern += "b";
    this.mask = true;
  }
  else{
    this.pattern += "B";
    this.mask = false;
  }
}

//locusS()
//
//analyses the S locus to determine the phenotype
//responsible for white spots: can be S (no spots), m, i, or s (different spotting patterns)
Oujabe.prototype.locusS = function(){
  let locusS = this.genes.locusS.toString();
  //everything in the S locus is codominant because I love to make my life complicated
  if(locusS.indexOf("S") !== -1){
    if(locusS.indexOf("m") !== -1){
      //here the Oujabe is Sm (sadomasochist, right?)
      this.pattern += "m";
    }
    else if(locusS.indexOf("i") !== -1){
      //here the Oujabe is Si
      this.pattern += "i";
    }
    else if(locusS.indexOf("s") !== -1){
      //here the Oujabe is Ss
      this.pattern += "s";
    }
    else{
      this.spot = false;
    }
  }
  else if(locusS.indexOf("m") !== -1){
    if(locusS.indexOf("i") !== -1){
      //here the Oujabe is mi
      this.pattern += "mi";
    }
    else if(locusS.indexOf("s") !== -1){
      //here the Oujabe is ms
      this.pattern += "ms";
    }
    else{
      //here the Oujabe is mm
      this.pattern += "M";
    }
  }
  else if(locusS.indexOf("i") !== -1){
    if(locusS.indexOf("s") !== -1){
      //here the Oujabe is is
      this.pattern += "is";
    }
    else{
      //here the Oujabe is ii
      this.pattern += "I";
    }
  }
  else{
    //here the oujabe is not S, m, or i, and so it is ss
    this.pattern += "ss"
    //ss is homozygous lethal
    this.letality = true;
  }
}

//pickSpots()
//
//assigns spot images to the oujabe
//for each genotype, the oujabe may have one of two images:
//each of these arrays (ie. sMantle) contain 3 images:
//one with light spotting, one with medium spotting, and one with heavy spotting
//if the oujabe has the gene once, it will have either the image with light or medium spotting
//if the oujabe has the gene twice, it will have either medium or heavy spotting
Oujabe.prototype.pickSpots = function(){
  //this generates a value of one or zero
  let value = Math.floor(random(2));
  //value homo is either 1 or 2
  let valueHomo = value+1;
  if(this.pattern.indexOf("m") !== -1){
    this.bodySpots.push(sMantle[valueHomo]);
    this.headSpots.push(sHeadMantle[valueHomo]);
  }
  if(this.pattern.indexOf("M") !== -1){
    this.bodySpots.push(sMantle[value]);
    this.headSpots.push(sHeadMantle[value]);
  }
  if(this.pattern.indexOf("i") !== -1){
    this.bodySpots.push(sSpeckle[valueHomo]);
    this.headSpots.push(sHeadSpeckle[valueHomo]);
  }
  if(this.pattern.indexOf("I") !== -1){
    this.bodySpots.push(sSpeckle[value]);
    this.headSpots.push(sHeadSpeckle[value]);
  }
  //sLeuc is the only array with only two images because "ss" is homozygous lethal
  if(this.pattern.indexOf("s") !== -1){
    this.bodySpots.push(sLeuc[value]);
    this.headSpots.push(sHeadLeuc[value]);
  }
}

//checkLetality()
//
//in the case albino is true, locusS is not checked
//but it is still possible that the oujabe is ss, which is homozygous lethal
//this simply checks if locusS is "ss"
Oujabe.prototype.checkLetality = function(){
  let locusS = this.genes.locusS.toString();
  if(locusS === "ss"){
    this.letality = true;
  }
  else{
    this.letality = false;
  }
}

//display()
//
//this displays the oujabe
Oujabe.prototype.display = function(x,y,width,height){
  //if the oujabe is homozygous lethal, it is not displayed
  //instead text saying "this animal was stillborn" shows
  if(this.letality){
    this.displayLetal(x,y,width,height);
  }
  //the oujabe otherwise displays as normal by repeatedly tinting the image of a body part with the corresponding color
  else{
    push();
    tint(this.colorSet[0]);
    image(body, x, y,width,height);
    noTint();
    tint(this.colorSet[1]);
    image(leg, x, y,width,height);
    noTint();
    tint(this.colorSet[2]);
    image(stomach, x, y,width,height);
    noTint();
    //if the oujabe is violet, it has a darker spot on the rump
    if(this.violet){
      tint(this.colorSet[5]);
      image(violet, x, y,width,height);
      noTint();
    }
    //this displays the mask on the legs
    if(this.mask){
      tint(this.colorSet[6]);
      image(maskLeg, x, y,width,height);
      noTint();
    }
    //this displays the spots on the body
    if(this.spot){
      for (let i = 0; i < this.bodySpots.length; i++){
        tint(this.spotColor);
        image(this.bodySpots[i],x,y,width,height);
        noTint();
      }
    }
    tint(this.colorSet[3]);
    image(head, x, y,width,height);
    noTint();
    tint(this.colorSet[4]);
    image(accent, x, y,width,height);
    noTint();
    //this displays the mask on the head
    if(this.mask){
      tint(this.colorSet[6]);
      image(mask, x, y,width,height);
      noTint();
      //if the oujabe is spotted and red, the spots are displayed here and tinted
      if(this.spot && this.red){
        for(let i = 0; i < this.headSpots.length; i++){
          tint(this.colorSet[3]);
          image(this.headSpots[i],x,y,width,height);
          noTint();
        }
      }
      //if the oujabe has a mask, it displays the proper white marking
      image(whiter, x,y,width,height);
    }
    //if the oujabe has no mask, it displays the other white marking
    else{
      image(whiteR, x, y,width,height);
    }
    //if it has spots but isn'T red, they display here
    //this is because spots do not influence the red of the head: they only affect melanin
    //and the red is not a melanin pigment
    //the red spots displaying on top of the white facial markings thus looked really weird
    if(this.spot && !this.red){
      for(let i = 0; i < this.headSpots.length; i++){
        image(this.headSpots[i],x,y,width,height);
      }
    }
    tint(this.colorSet[7]);
    image(hoof, x, y,width,height);
    noTint();
    tint(this.colorSet[8]);
    image(eye, x,y,width,height);
    noTint();
    pop();
  }
}

//displayLetal();
//
//set the width and the height for displaying the lethality text properly
//and then displays the letality text
Oujabe.prototype.displayLetal = function(x,y,width,height){
  let sizeOfText  = 24;
  if(width){
    this.width = width;
    this.height = height;
    sizeOfText = height/10;
  }
  else{
    this.width = body.width;
    this.height = body.height;
  }
  push();
  textFont(ttLakesBold);
  fill(this.colorSet[0]);
  textSize(sizeOfText);
  textAlign(CENTER, CENTER);
  text("THIS ANIMAL WAS STILLBORN", x+this.width/2,y+this.height/2);
  pop();
}
