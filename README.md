# shux
[![Build Status](https://travis-ci.org/boourns/shux.svg?branch=master)](https://travis-ci.org/boourns/shux)

Easy to use flux pattern implementation

Shux is optimized for ease of use both by itself and with React.

When you register a store, Shux creates proxy methods on the Dispatcher object for the store's actions.  If a store implements an action named `login`, we dispatch the login action in our application code by calling `Dispatcher.login(user, password)`.  This function will call the action against all the registered stores that implement the `login` action.  

This is easier to wrap your head around than firing methods via `Dispatcher.dispatch({type: 'login', user: user, password: password})` and tracking their implementations across your stores.

This also has the nice benefit that you do not need to track a list of ACTION_NAME constants, or have action creator functions.  You also don't need a big `switch` statement to determine which action was called - let the language handle the event dispatch for you.

Shux requires extremely little boilerplate code.  I wrote it for other developers at [Shopify](https://shopify.com/) to be able to read the code that uses it.

All the other key concepts either came from [redux](https://github.com/rackt/redux) or [flux](https://github.com/facebook/flux).  After implementing a few features using Facebook's dispatcher, and a few features using redux, I wrote up what I felt the pros and cons of both implementations were.

Shux is an attempt to mitigate the cons, and steal the pros.

# Other Features
Implements Stores as singleton classes.  This gives a natural place to add methods that calculate derived state from the original state that is stored (aka business logic)

Lets stores handle their own state.  Redux is cool, but hiding the state initialization / management is not obvious to newcomers.

Comes with a React container that handles store update subscribe / unsubscribe so users don't need to think about these things.

# Example

Create a store that receives two actions: `updateProduct` and `logout`.

```javascript
# ProductStore.js
import {Store,Dispatcher} from 'shux';
class ProductStore extends Store {
  constructor() {
    super();
    this.state = {};

    this.actions = {
      updateProduct: (product) => {
        this.state = product;
      },

      logout: () => {
        this.state = {};
      }
    }
  }

  productIsNew() {
    return !this.state.product.id;
  }
}

var productStore = new ProductStore();
// register the store
Dispatcher.register(productStore);

export productStore
```

Listen for store changes:
```javascript
import ProductStore from './ProductStore';

ProductStore.subscribe(() => {
  console.log("Product store updated");
  if (ProductStore.productIsNew()) {
    console.log("Product is new!");
  }
});
```

Call the `updateProduct` action:
```javascript
Dispatcher.updateProduct({id: null, title: "new!"});
```

