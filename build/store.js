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
      var index = this._subscribers.indexOf(fn);
      this._subscribers.splice(index, 1);
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

exports.default = Store;
module.exports = exports.default;