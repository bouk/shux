var {Dispatcher,Store} = require('./dispatcher');

// each store is a class
class ProductStore extends Store {
  constructor() {
    super();

    this.state = {};

    // we define the actions we handle as separate functions
    this.actions = {
      updateProduct: function(product: string) {
        this.state = product;
      },

      logout: () => {
        this.state = {};
      }
    }
  }

  businessLogic() {
    return !!this.state.product.id;
  }
}

// each store is a class
class Other extends Store {
  constructor() {
    super();
    this.state = {};

    // we define the actions we handle as separate functions
    this.actions = {
      updateProduct: function(product: string, other: string) {
        console.log("ran!");
        this.state = product;
      }
    }
  }

  businessLogic() {
    return !!this.state.product.id;
  }
}

function fire() {
    console.log("fired!");
}

store = new ProductStore;
store.subscribe(fire);

Dispatcher.register(store);
Dispatcher.register(new Other);

Dispatcher.updateProduct(1);
