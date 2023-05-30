const GameInstance = class {
  constructor() {
    this.narrativeManager = new narrativeManager(this)
    
    this.stages = ["stage1"];
    this.currentStage = "stage1"; 
    this.panels = {
      "stage1": ["panel1", "panel2", "panel3","panel4"]
    }
    this.currentPanel = "panel1";


    this.Maxp =10;
    this.Maxs =10;
    this.Maxh =10;
    this.Food = 0;
    this.foodcost=0;
    this.expcost=100;
    this.workers = 0;
    this.Dragon = 0;
    this.power = 0;
    this.speed = 0;
    this.health = 0;
    this.fight=0;
    this.Challenger = 0;
    this.Experience = 0;
    this.Pup = 0;
    this.Sup = 0;
    this.Hup = 0;
    
      
    this.collectorsProtected = 0;
    this.findersProtected = 0;
    this.gardenCollectors = 0;
    
  }
  
  

  
  // the following functions are to be called from buttons in the index.html
  gainResource1(){ this.Food +=1; this.updateDisplay();}
  gainResource2(){ if(this.Food>=5){this.workers +=2; this.Food -=5;this.updateDisplay();}
                    else{io.appendIntoElement("You Need to more food to have more workers ", "reports");}}
  gainResource3(){ if(this.Food>=50){this.Dragon +=1; this.Food -=50;this.updateDisplay();}
  else{io.appendIntoElement("You Need to more food to hatch dragons ", "reports");}}
  runResource2Work(){
      this.Food += this.workers;
  }
  runResource3Work(){
    this.Food =this.Food-this.Dragon*2-this.foodcost;
  }

  gpw(){
    if (this.Food<=10){ io.appendIntoElement("you need more food to increase power level", "reports");}
    if(this.power<this.Maxp){this.power+=1;this.Food -=10;this.updateDisplay();
      io.appendIntoElement("power level increase by 1 ", "reports");}
    
    else {io.appendIntoElement("You Need to eveolve to gain more powers ", "reports");}}
  gsp(){ if (this.Food<=10){ io.appendIntoElement("you need more food to increase speed level", "reports");}
    if(this.speed<this.Maxs){this.speed+=1;this.Food-=10;this.updateDisplay();
    io.appendIntoElement("speed level increase by 1 ", "reports");}
    
    else io.appendIntoElement("You Need to eveolve to gain more speed ", "reports");}
  ghe(){ if (this.Food<=10){ io.appendIntoElement("you need more food to increase health level", "reports");}
    if(this.health<this.Maxh){this.health+=1;this.Food-=10;this.updateDisplay();
    io.appendIntoElement("health level increase by 1 ", "reports");}
    
    else io.appendIntoElement("You Need to eveolve to gain more health ", "reports");}
  // this function takes in a panel 
  Fight(){this.Experience+=5;this.fight+=1;this.updateDisplay();
    io.appendIntoElement("You been threw "+this.fight+" Fight with wild dragon and gain total "+this.fight*5+" experience from it", "reports");}
  gch(){if (this.Dragon!=0&&this.Dragon>this.Challenger){this.Challenger+=1;this.foodcost+=5;this.updateDisplay();}
  else io.appendIntoElement("Challenger number can not be more than dragons number ", "reports");}
  Exboost(){this.Experience+=this.Challenger*2;}
  BP(){if(this.Experience>=100){this.Pup+=1;this.Maxp+=5;this.foodcost+=5;this.Experience-=this.expcost;this.updateDisplay();
  }else io.appendIntoElement("You Need more experience to limit break power ", "reports");}
  BS(){if(this.Experience>=100){this.Sup+=1;this.Maxs+=5;this.foodcost+=5;this.Experience-=this.expcost;this.updateDisplay();}
  else io.appendIntoElement("You Need more experience to limit break speed ", "reports");}
  BH(){if(this.Experience>=100){this.Hup+=1;this.Maxh+=5;this.foodcost+=5;this.Experience-=this.expcost;this.updateDisplay();}
  else io.appendIntoElement("You Need more experience to limit break health ", "reports");}
  re(){
    this.Maxp =10;
    this.Maxs =10;
    this.Maxh =10;
    this.Food = 0;
    this.foodcost=0;
    this.expcost=100;
    this.workers = 0;
    this.Dragon = 0;
    this.power = 0;
    this.speed = 0;
    this.health = 0;
    this.fight=0;
    this.Challenger = 0;
    this.Experience = 0;
    this.Pup = 0;
    this.Sup = 0;
    this.Hup = 0;
  }
  swichPanels(panel) {
    //console.log(panel)
    
    game.currentPanel = panel;
    io.showPanel(game);    
  }
  
  updateDisplay(){
    io.writeValueIntoClass(this.Food, "resource1Number")
    io.writeValueIntoClass(this.workers, "resource2Number")
    io.writeValueIntoClass(this.Dragon, "resource3Number")
    io.writeValueIntoClass(this.power, "resource4Number")
    io.writeValueIntoClass(this.speed, "resource5Number")
    io.writeValueIntoClass(this.health, "resource6Number")
    io.writeValueIntoClass(this.fight, "resource7Number")
    io.writeValueIntoClass(this.Challenger, "resource8Number")
    io.writeValueIntoClass(this.Experience, "resource9Number")
    io.writeValueIntoClass(this.Pup, "resource10Number")
    io.writeValueIntoClass(this.Sup, "resource11Number")
    io.writeValueIntoClass(this.Hup, "resource12Number")
    
  }
  
};


// this function forom JQuery waits until the web page is fully loaded before triggering the start of the game
$( document ).ready(function() {
  game = new GameInstance();
  game.narrativeManager.setup();

  io.showStage(game); 
  game.updateDisplay()

  startRecording(game);

  // Run the Loop
  gameTimer = setInterval(function(){
    game.runResource2Work();
    game.runResource3Work();
    game.Exboost();
    game.narrativeManager.assess()
    game.updateDisplay()
}, 500)
  

})
