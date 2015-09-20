# shux
Easy to use flux pattern implementation

After implementing a few features using Facebook's dispatcher, and a few features using `redux`, I wrote up what I felt the pros and cons of both implementations were.  Shux is an attempt to mitigate the cons, and steal the pros.

Shux is optimized for ease of use both by itself and with React.

Shux creates proxy methods on the Dispatcher object.  If some stores implement an action named `login`, we fire the login action via `Dispatcher.login(user, password)` which will call the action on all the stores that implement it.  This is easier to wrap your head around than firing methods via `Dispatcher.dispatch({type: 'login', user: user, password: password})` and tracking their implementations across your stores.

This also has the nice benefit that you do not need to track a list of ACTION_NAME constants, or have action creator functions.  You also don't need a big `switch` statement to determine which action was called - let the language handle it for you.

Shux requires extremely little boilerplate code.  I wrote it to make it easy for other developers at Shopify to be able to understand the intent and functionality of the code that uses it.

All the other ideas either came from redux or flux.

# Other Features
Implements Stores as singleton classes.  This gives a natural place to add methods that calculate derived state from the original state that is stored (aka business logic)

Lets stores handle their own state.  Redux is cool, but hiding the state initialization / management is not obvious to newcomers.

Comes with a React container that handles store update subscribe / unsubscribe so users don't need to think about these things.

# Example

Implementing a store that handles a `updateProduct` and a `logout` action.
```javascript
# ProductStore.js
import {Store,Dispatcher} from 'shux';
class ProductStore extends Store {
  constructor() {
    super();
    this.state = {};

    this.actions = {
      updateProduct: function(product) {
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
# register the store
Dispatcher.register(productStore);

export productStore
```

Call the `updateProduct` action:
```javascript
Dispatcher.updateProduct({id: null, title: "new!"});
```

Listen for store changes:
```javascript
import ProductStore from './ProductStore';

ProductStore.subscribe(() => {
  console.log("Product store updated!");
});
```
