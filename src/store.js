class Store {
  constructor() {
    this._subscribers = [];
  }

  subscribe(fn) {
    this._subscribers.push(fn);
  }

  unsubscribe(fn) {
    var index = this._subscribers.indexOf(fn);
    this._subscribers.splice(index, 1);
  }

  notifySubscribers() {
    this._subscribers.forEach(function(item) {
      item.call();
    });
  }
}

export default Store;
