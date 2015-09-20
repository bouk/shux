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

var testStore;

beforeEach(function () {
  Dispatcher.reset();
  testStore = new TestStore();
  Dispatcher.register(testStore);
});

describe('Store', function () {

  it('calls subscribed functions after every event', function () {
    var count = 0;
    testStore.subscribe(function () {
      count++;
    });
    Dispatcher.login('zerocool');
    Dispatcher.login('acidburn');
    expect(count).toEqual(2);
  });

  it('does not call unsubscribed functions', function () {
    var count = 0;
    var func = function () {
      count++;
    };

    testStore.subscribe(func);
    Dispatcher.login('zerocool');

    testStore.unsubscribe(func);
    Dispatcher.login('acidburn');

    expect(count).toEqual(1);
  });
});