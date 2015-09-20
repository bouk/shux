class Dispatcher {
  static callAction(action: string, args) {
    if (Dispatcher.dispatching) {
      throw new Error(`action '${action}' was dispatched while dispatching a previous action.`)
    }
    try {
      Dispatcher.dispatching = true;

      Dispatcher.actions[action].forEach(function (store) {
        store.actions[action](args);
        store.notifySubscribers();
      });

    } finally {
      Dispatcher.dispatching = false;
    }
  }

  static register(store: Object) {
    if (!store.actions) {
      throw new Error(`'actions' not defined on store ${store.name}.  Did you pass the class instead of an instance to register?`);
    }

    Object.keys(store.actions).forEach(function (action) {
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

  static reset() {
    Dispatcher.dispatching = false;

    // store a mapping of 'actionName' to an array of stores that handle that action.
    Dispatcher.actions = {};
  }
}

Dispatcher.reset();

export default Dispatcher;
