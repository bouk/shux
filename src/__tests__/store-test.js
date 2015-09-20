jest.dontMock('../dispatcher');
jest.dontMock('../store');

const Store = require('../store');
const Dispatcher = require('../dispatcher');

class TestStore extends Store {
  constructor() {
    super();

    this.state = {
      username: null,
    }

    this.actions = {
      login: (username) => {
        this.state.username = username;
      }
    }
  }

  username() {
    return this.state.username;
  }
}

var testStore;

beforeEach(() => {
  Dispatcher.reset();
  testStore = new TestStore;
  Dispatcher.register(testStore);
});

describe('Store', () => {
  
  it('calls subscribed functions after every event', () => {
    var count = 0;
    testStore.subscribe(() => {
      count++;
    });
    Dispatcher.login('zerocool');
    Dispatcher.login('acidburn');
    expect(count).toEqual(2);
  });

  it('does not call unsubscribed functions', () => {
    var count = 0;
    var func = () => {
      count++;
    }

    testStore.subscribe(func);
    Dispatcher.login('zerocool');

    testStore.unsubscribe(func);
    Dispatcher.login('acidburn');

    expect(count).toEqual(1);
  });

});
