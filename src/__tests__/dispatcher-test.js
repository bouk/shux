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

beforeEach(() => {
  Dispatcher.reset();
});

describe('Dispatcher', () => {
  it('registers a store', () => {
    Dispatcher.register(new TestStore);
  });

  it('creates a proxy action function on Dispatcher which calls the store action', () => {
    var store = new TestStore;
    Dispatcher.register(store);
    Dispatcher.login('zerocool');
    expect(store.username()).toEqual('zerocool');
  });

  it('calls all the action on many stores if many stores implement the action', () => {
    var store = new TestStore;
    var secondStore = new TestStore;

    Dispatcher.register(store);
    Dispatcher.register(secondStore);

    Dispatcher.login('zerocool');
    expect(secondStore.username()).toEqual('zerocool');
  });

  it('errors when trying to register a class instead of an instance', () => {
    expect(() => {
      Dispatcher.register(TestStore);
    }).toThrow();
  });
  
});
