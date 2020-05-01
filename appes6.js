class EventObserver {
    constructor() {
        this.observers = [];
    }
    subscribe(fn) {
        this.observers.push(fn);
        console.log(`You are now subscribed to ${fn.name}`);
    }; 
    unsubscribe(fn) {
        this.observers = this.observers.filter(item => {
          if(item !== fn){
            return item;
          };
        });
        console.log(`You are now unsubscribed to ${fn.name}`);
      };
      fire() {
        this.observers.forEach(item => item.call())
      }
}
    
  
  
  
    
  
  
  const click = new EventObserver();
  
  // Create Event Listeners 
  
  // Subscribe
  document.querySelector('.sub-ms').addEventListener('click', function(){
    click.subscribe(milliSeconds)
  });
  // Unsubscribe
  document.querySelector('.unsub-ms').addEventListener('click', function(){
    click.unsubscribe(milliSeconds)
  });
  // Fire
  document.querySelector('.fire').addEventListener('click', function(){
    click.fire();
  });
  
  function milliSeconds() {
    console.log(`The current millisecond is ${new Date().getMilliseconds()}`)
  }