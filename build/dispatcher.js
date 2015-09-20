Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dispatcher = (function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);
  }

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
  }, {
    key: "reset",
    value: function reset() {
      // store a mapping of 'actionName' to an array of stores that handle that action.
      Dispatcher.actions = {};
    }
  }]);

  return Dispatcher;
})();

Dispatcher.reset();

exports.default = Dispatcher;
module.exports = exports.default;