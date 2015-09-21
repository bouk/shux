var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

jest.dontMock('../dispatcher');
jest.dontMock('../store');

const Store = require('../store');
const Dispatcher = require('../dispatcher');

var TestStore = (function (_Store) {
  _inherits(TestStore, _Store);

  function TestStore() {
    var _this = this;

    _classCallCheck(this, TestStore);

    _get(Object.getPrototypeOf(TestStore.prototype), 'constructor', this).call(this);

    this.state = {
      username: null
    };

    this.actions = {
      login: function (username) {
        _this.state.username = username;
      }
    };
  }

  _createClass(TestStore, [{
    key: 'username',
    value: function username() {
      return this.state.username;
    }
  }]);

  return TestStore;
})(Store);

beforeEach(function () {
  Dispatcher.reset();
});

describe('Dispatcher', function () {
  it('registers a store', function () {
    Dispatcher.register(new TestStore());
  });

  it('creates a proxy action function on Dispatcher which calls the store action', function () {
    var store = new TestStore();
    Dispatcher.register(store);
    Dispatcher.login('zerocool');
    expect(store.username()).toEqual('zerocool');
  });

  it('calls all the action on many stores if many stores implement the action', function () {
    var store = new TestStore();
    var secondStore = new TestStore();

    Dispatcher.register(store);
    Dispatcher.register(secondStore);

    Dispatcher.login('zerocool');
    expect(secondStore.username()).toEqual('zerocool');
  });

  it('errors when trying to register a class instead of an instance', function () {
    expect(function () {
      Dispatcher.register(TestStore);
    }).toThrow();
  });

  it('errors when trying to dispatch an action during another dispatch', function () {
    var BadStore = (function (_Store2) {
      _inherits(BadStore, _Store2);

      function BadStore() {
        _classCallCheck(this, BadStore);

        _get(Object.getPrototypeOf(BadStore.prototype), 'constructor', this).call(this);
        this.actions = {
          login: function (username) {
            Dispatcher.otherAction();
          },
          otherAction: function () {
            console.log("other action ran");
          }
        };
      }

      return BadStore;
    })(Store);

    Dispatcher.register(new TestStore());
    Dispatcher.register(new BadStore());

    expect(function () {
      Dispatcher.login('zerocool');
    }).toThrow();
  });

  it('does not lock the dispatcher forever if an action handler raises', function () {
    var ErrorStore = (function (_Store3) {
      _inherits(ErrorStore, _Store3);

      function ErrorStore() {
        _classCallCheck(this, ErrorStore);

        _get(Object.getPrototypeOf(ErrorStore.prototype), 'constructor', this).call(this);
        this.actions = {
          errorAction: function () {
            throw new Error('wat');
          }
        };
      }

      return ErrorStore;
    })(Store);

    var store = new TestStore();
    Dispatcher.register(new ErrorStore());
    Dispatcher.register(store);
    try {
      Dispatcher.errorAction();
    } catch (e) {}
    Dispatcher.login('zerocool');

    expect(store.username()).toEqual('zerocool');
  });
});