// this object is to keep track of narrative beats and unlocks

// each "beat" has a test function, a function which unlocks elements, and a report function

const narrativeManager = class {
  constructor(parentObject) {
  this.data = parentObject;
    console.log(parentObject, this.data)
    
  this.beats = [
  {
    triggered: false,
    test: function(data){return data.Food >= 5}, 
    unlock:function(){io.showElement("resource2Row")}, 
    report: function(){
      io.appendIntoElement("You can know hire workers to provide food for you", "reports");
      io.writeIntoElement ("Dragon land", "era");
      }
  },
  {
    triggered: false,
    test: function(data){return data.Dragon >= 1}, 
    unlock:function(){io.showElement("showPanel2")},  
    report: function(){io.appendIntoElement("You have a dragon, you can start trainging ", "reports");}
  },
  {
    triggered: false,
    test: function(data){return data.Dragon >= 1}, 
    unlock:function(){io.showElement("showPanel3")},  
    report: function(){io.appendIntoElement("You can bring your dragon to advanture", "reports");}
  },
  {
    triggered: false,
    test: function(data){return data.Food >=50}, 
    unlock:function(){io.showElement("resource3Row")},  
    report: function(){io.appendIntoElement("You can now hatching dragons", "reports");}
  },
 
  {
    triggered: false,
    test: function(data){return (data.power==data.Maxp&&data.speed==data.Maxs&&data.health==data.Maxh)}, 
    unlock:function(){io.showElement("showPanel4")},  
    report: function(){io.appendIntoElement("You unlocked the Eveolve option\nYou can know limit break you status about your dragons", "reports");}
 
  },
  {
    triggered: false,
    test: function(data){return data.fight>=10}, 
    unlock:function(){io.showElement("challenger")},  
    report: function(){io.appendIntoElement("Lots of people heard about you and your dragons, now there would be challenger comeing the challenge you ", "reports");}
 
  },
  {
    triggered: false,
    test: function(data){return data.Food<0}, 
    unlock:function(){io.showElement("Restart")},  
    report: function(){io.appendIntoElement("Your dragon die in cost of hunger, clikck restar igf you want to start again ", "reports");}
 
  },
  ]
  }
  
  setup(){
    io.hideElement("resource2Row")
    io.hideElement("resource3Row")
    io.hideElement("challenger")
    io.hideElement("showPanel2")
    io.hideElement("showPanel3")
    io.hideElement("showPanel4")
    io.hideElement("Restart")
  }


// goes through all narrative events, checks if they activate, runs activation code, and runs code that delivers a message about the story event
  assess(){
    for (let b = 0; b < this.beats.length; b++){
      let beat = this.beats[b]
      if (!beat.triggered){
        if (beat.test(this.data)){
          beat.triggered = true;
          beat.unlock();
          beat.report();
        }
      }
    }
  }

}