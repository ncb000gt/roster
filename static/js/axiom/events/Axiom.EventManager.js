/**
* Publish / Subscribe event dispatcher
*/
Ext.namespace("Axiom");

Axiom.EventManager = Ext.extend(Ext.util.Observable, {
  subscribe: function(name, func, scope){
    this.addEventIf(name);
    this.on(name, func, scope);
  },
  publish: function(name, args){
    this.addEventIf(name);
    this.fireEvent.apply(this, [name].concat( args || [] ));
  },
  addEventIf: function(name){
    if(!this.hasEvent(name)){
      var evts = {};
      evts[name] = true;
      this.addEvents(evts);
    }
  },
  hasEvent: function(name){
    if(!this.events){
     this.events = {};
     return false;
    }
    return this.events[name];
  }
});