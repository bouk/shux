var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('./dispatcher');

var Dispatcher = _require.Dispatcher;
var Store = _require.Store;

// each store is a class

var ProductStore = (function (_Store) {
  _inherits(ProductStore, _Store);

  function ProductStore() {
    var _this = this;

    _classCallCheck(this, ProductStore);

    _get(Object.getPrototypeOf(ProductStore.prototype), "constructor", this).call(this);

    this.state = {};

    // we define the actions we handle as separate functions
    this.actions = {
      updateProduct: function (product) {
        this.state = product;
      },

      logout: function () {
        _this.state = {};
      }
    };
  }

  // each store is a class

  _createClass(ProductStore, [{
    key: "businessLogic",
    value: function businessLogic() {
      return !!this.state.product.id;
    }
  }]);

  return ProductStore;
})(Store);

var Other = (function (_Store2) {
  _inherits(Other, _Store2);

  function Other() {
    _classCallCheck(this, Other);

    _get(Object.getPrototypeOf(Other.prototype), "constructor", this).call(this);
    this.state = {};

    // we define the actions we handle as separate functions
    this.actions = {
      updateProduct: function (product, other) {
        console.log("ran!");
        this.state = product;
      }
    };
  }

  _createClass(Other, [{
    key: "businessLogic",
    value: function businessLogic() {
      return !!this.state.product.id;
    }
  }]);

  return Other;
})(Store);

function fire() {
  console.log("fired!");
}

store = new ProductStore();
store.subscribe(fire);

Dispatcher.register(store);
Dispatcher.register(new Other());

Dispatcher.updateProduct(1);