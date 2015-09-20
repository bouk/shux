class Store {
  constructor() {
    this._subscribers = [];
  }

  subscribe(fn) {
    this._subscribers.push(fn);
  }

  unsubscribe(fn) {
    this._subscribers.filter((item) => {
      if (item !== fn) {
        return item;
      }
    });
  }

  notifySubscribers() {
    this._subscribers.forEach(function(item) {
      item.call();
    });
  }
}

class Dispatcher {
  static callAction(action: string, args) {
    Dispatcher.actions[action].forEach(function (store) {
      store.actions[action](args);
      store.notifySubscribers();
    });
  }

  static register(store: Object) {
    if (!store.actions) {
      throw new Error(`'actions' not defined on store ${store.name}.  Did you pass the class instead of an instance to register?`);
    }

    Object.keys(store.actions).forEach(function (action) {
      console.log(action);
      if (!Dispatcher.actions[action]) {
        // track this store has this action
        Dispatcher.actions[action] = [store];

        // create the callable action proxy on Dispatcher
        Dispatcher[action] = function(...args) {
          Dispatcher.callAction(action, ...args);
        }
      } else {
        Dispatcher.actions[action].push(store);
      }
    });
  }
}

// store a mapping of 'actionName' to array of stores that handle that action.
Dispatcher.actions = {};

export default {Dispatcher,Store};
