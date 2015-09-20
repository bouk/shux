Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = (function () {
  function Store() {
    _classCallCheck(this, Store);

    this._subscribers = [];
  }

  _createClass(Store, [{
    key: "subscribe",
    value: function subscribe(fn) {
      this._subscribers.push(fn);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(fn) {
      this._subscribers.filter(function (item) {
        if (item !== fn) {
          return item;
        }
      });
    }
  }, {
    key: "notifySubscribers",
    value: function notifySubscribers() {
      this._subscribers.forEach(function (item) {
        item.call();
      });
    }
  }]);

  return Store;
})();

var Dispatcher = (function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);
  }

  // store a mapping of 'actionName' to array of stores that handle that action.

  _createClass(Dispatcher, null, [{
    key: "callAction",
    value: function callAction(action, args) {
      Dispatcher.actions[action].forEach(function (store) {
        store.actions[action](args);
        store.notifySubscribers();
      });
    }
  }, {
    key: "register",
    value: function register(store) {
      if (!store.actions) {
        throw new Error("'actions' not defined on store " + store.name + ".  Did you pass the class instead of an instance to register?");
      }

      Object.keys(store.actions).forEach(function (action) {
        console.log(action);
        if (!Dispatcher.actions[action]) {
          // track this store has this action
          Dispatcher.actions[action] = [store];

          // create the callable action proxy on Dispatcher
          Dispatcher[action] = function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            Dispatcher.callAction.apply(Dispatcher, [action].concat(args));
          };
        } else {
          Dispatcher.actions[action].push(store);
        }
      });
    }
  }]);

  return Dispatcher;
})();

Dispatcher.actions = {};

exports.default = { Dispatcher: Dispatcher, Store: Store };
module.exports = exports.default;