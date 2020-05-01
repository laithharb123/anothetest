




/*
// Basic structure 

(function(){
  // Declare private vars and functions 

  return {
    // Declare public var and functions 
  }
})();



const UICtrl = (function(){
  let text = 'Hello World';

  const changeText = function() {
    const element = document.getElementById('title');
    element.textContent = text;
  }

  return {
    callChangeText : function() {
      changeText();
      console.log(text)
    }
  }
})();


UICtrl.callChangeText = function(){
  console.log('hi')
}

UICtrl.callChangeText();



const ItemCtrl = (function(){
  let data = [];

  function add(item) {
    data.push(item);
    console.log('Item Added...')
  }

  function get(id) {
    return data.find(item => {
      return item.id === id;
    });

  }

  return {
    add : add,
    get : get
  }
})()


ItemCtrl.add({id: 1, name: 'John'});
console.log(ItemCtrl.get(1))





// Singleton 

const Singleton = (function() {
  let instance; 


  function createInstance() {
    const object = new Object({name : 'Bred'});
    return object;
  }


  return {
    getInstance : function() {
      if(!instance) {
        instance = createInstance();
      }
      return instance;
    }
  }
})();


const instanceA = Singleton.getInstance();
const instanceB = Singleton.getInstance();

console.log(instanceA)




// Factory Pattern 

function MemberFactory() {
  this.createMember = function(name, type) {
    let member;

    if(type === 'simple') {
      member = new SimpleMembership(name);
    } else if (type === 'standard') {
      member = new StandardMembership(name);
    } else if (type === 'super') {
      member = new SuperMembership(name);
    }
    member.type = type;

    member.define = function() {
      console.log(`${this.name} (${this.type}): ${this.cost}`);
    }
    return member;
  }
}

const SimpleMembership = function(name) {
  this.name = name;
  this.cost = '$5';
}

const StandardMembership = function(name) {
  this.name = name;
  this.cost = '$15';
}

const SuperMembership = function(name) {
  this.name = name;
  this.cost = '$25';
}

const members = [];
const factory = new MemberFactory();

members.push(factory.createMember('Laith', 'super'))


factory.createMember('Laith', 'super').define()








function EventObserver() {
  this.observers = [];
}

EventObserver.prototype = {
  subscribe : function(fn) {
    this.observers.push(fn);
    console.log(`You are now subscribed to ${fn.name}`);
  },
  unsubscribe : function(fn) {
    this.observers = this.observers.filter(function(item){
      if(item !== fn) {
        return item;
      }
    });
    console.log(`You are now unsubscribed from ${fn.name}`)
  },
  fire : function() {
    this.observers.forEach( item => {
      // Loops through all the functions and calls them
      item.call()
    })
  }
}



const click = new EventObserver();

// Event Listerner 

document.querySelector('.sub-ms').addEventListener('click', function() {
  click.subscribe(getCurMilliseconds);
});

document.querySelector('.unsub-ms').addEventListener('click', function() {
  click.unsubscribe(getCurMilliseconds);
});

document.querySelector('.fire').addEventListener('click', function() {
  click.fire();
});

// Click Handler 
// Function we want to subscribe too
const getCurMilliseconds = function() {
  console.log(`Current Milliseconds: ${new Date().getMinutes()}`);
}





const EventObserver = function() {
  this.observers = [];
}

// Create Prototypes 
EventObserver.prototype = {
  subscribe : function(fn) {
    this.observers.push(fn);
    console.log(`You are now subscribed to ${fn.name}`);
  },
  unsubscribe : function(fn) {
    this.observers = this.observers.filter(item => {
      if(item !== fn){
        return item;
      };
    });
    console.log(`You are now unsubscribed to ${fn.name}`);
  },
  fire : function() {
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




const User = function(name) {
  this.name = name;
  this.chatroom = null;
}

User.prototype = {
  send : function(message, to) {
    this.chatroom.send(message, this, to);
  },
  recieve : function(message, from) {
    console.log(`${from.name} to ${this.name}: ${message}`);
  }
}

const Chatroom = function() {
  let users = {};

  return {
    register: function(user) {
      users[user.name] = user;
      user.chatroom = this;
    },
    send : function(message, from, to) {
      if(to) {
        // Single User Message
        to.recieve(message, from);
      } else {
        // Mass message 
        for(key in users) {
          if(users[key] !== from) {
            users[key].recieve(message, from);
          }
        }
      }
    }
  }
}


const brad = new User('Brad');
const melinda = new User('Melinda');
const jeffery = new User('Jeffery');
const tanya = new User('Tanya');

const chatroom = new Chatroom();

chatroom.register(brad);
chatroom.register(tanya);
chatroom.register(melinda);

brad.send('Hello Tanya! I love you', tanya);

melinda.send('WTF BRAD!!!')





// MEDIATOR PATTERN

const User = function(name) {
  this.name = name;
  this.chatroom = null
}

User.prototype = {
  send : function(message, to) {
    this.chatroom.send(message, this, to)
  }, 
  recieve : function(message, from) {
    console.log(`Message from ${from.name} to ${this.name}: ${message}`)
  }
}


const Chatroom = function() {
  let users = {};
  return {
    register : function(user) {
      users[user.name] = user;
      user.chatroom = this;
    },
    send : function(message, from, to) {
      if(to) {
        to.recieve(message, from)
      } else {
        for(key in users) {
          if(users[key] !== from) {
            users[key].recieve(message, from);
          }
        }
      }
    }
  }
}


const brad = new User('Brad');
const jenna = new User('Jenna');
const syndy = new User('Syndy');


const chatroom = new Chatroom();

chatroom.register(brad);
chatroom.register(jenna);
chatroom.register(syndy);

brad.send('Hello Jenna! I love you', jenna);

syndy.send('WTF BRAD!!!')






// STATE PATTERN 



const PageState = function() {
  let currentState = new homeState(this);
  console.log(currentState)

  // Two methods within the page state 
  this.init = function() {
    this.change(new homeState)
  }

  this.change = function(state) {
    currentState = state;
  }
};

//Home State 
const homeState = function() {
  document.querySelector('#heading').textContent = null;
  document.querySelector('#content').innerHTML = `
  <div class="jumbotron">
    <h1 class="display-4">Hello, world!</h1>
    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
  </div>
  `;
}

// About State 
const aboutState = function() {
  document.querySelector('#heading').textContent = 'About Us';
  document.querySelector('#content').innerHTML = `
  <p>This is the about state</p>
  `;
} 

// Contact State 
const contactState = function() {
  document.querySelector('#heading').textContent = 'Contact Us';
  document.querySelector('#content').innerHTML = `
  <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  `;
} 

// Instantiate pageState 

const page = new PageState();

console.log(page)



console.log(page)

// UI Vars 

const home = document.getElementById('home'),
      about = document.getElementById('about'),
      contact = document.getElementById('contact');


// Home 
home.addEventListener('click', e => {
  page.change(new homeState);
  e.preventDefault();
});
// About
about.addEventListener('click', e => {
  page.change(new aboutState);
  e.preventDefault();
});
// Contact
contact.addEventListener('click', e => {
  page.change(new contactState);
  e.preventDefault();
});


*/


const PageState = function() {
  let currentState = new homeState;

  this.change = function(state){
    currentState = state
  }
}


const homeState = function(){
  document.querySelector('#heading').textContent = null;
  document.querySelector('#content').innerHTML = `
  <div class="jumbotron">
    <h1 class="display-4">Hello, world!</h1>
    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    <hr class="my-4">
    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
  </div>
  `
}

const aboutState = function(){
  document.querySelector('#heading').textContent = 'About Us';
  document.querySelector('#content').innerHTML = `
  <p>This is the about state</p>
  `
}

const contactState = function(){
  document.querySelector('#heading').textContent = 'Contact Us';
  document.querySelector('#content').innerHTML = `
  <form>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
    </div>
    <div class="form-group form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
  `
}

// Define our UI 
const home = document.getElementById('home'),
      about = document.getElementById('about'),
      contact = document.getElementById('contact');


// Create the event listeners 
home.addEventListener('click', e => {
  page.change(new homeState);
  e.preventDefault();
})

contact.addEventListener('click', e => {
  page.change(new contactState);
  e.preventDefault();
})

about.addEventListener('click', e => {
  page.change(new aboutState);
  e.preventDefault();
})

const page = new PageState();

