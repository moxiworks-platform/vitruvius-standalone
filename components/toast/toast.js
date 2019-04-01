var Toast = (function() {
  "use strict";

  function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
      return right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Toast =
    /*#__PURE__*/
    function() {
      function Toast() {
        _classCallCheck(this, Toast);
      }

      _createClass(Toast, [{
        key: "createContainer",
        value: function createContainer(options) {
          var self = this;
          var div = document.createElement('div');
          div.id = 'vp-toast-container';

          if (options.centered) {
            var wrapper = document.createElement('div');
            wrapper.className = 'vp-toast-wrapper';
            div.className = 'centered';
            wrapper.appendChild(div);
            wrapper.addEventListener('click', function() {
              if (this.parentNode) this.parentNode.removeChild(this);
              self.checkCenteredContainer();
            });
            return wrapper;
          } else {
            return div;
          }
        }
      }, {
        key: "createToast",
        value: function createToast(options) {
          var self = this;
          var div = document.createElement('div');
          var iconDiv = document.createElement('div');
          var icon = document.createElement('i');
          var messageDiv = document.createElement('div');
          var header = document.createElement('div');
          var message = document.createElement('p');
          icon.className = 'v-icon-check-circle';

          if (options.type === 'info') {
            icon.className = 'v-icon-info-circle info';
          } else if (options.type === 'error') {
            icon.className = 'v-icon-info-circle error';
          } // iconDiv.className = icon;


          messageDiv.className = 'vp-toast-message';
          header.className = 'font-bold mb-5';
          div.className = 'vp-toast show';
          header.innerHTML = options.header || '';
          message.innerHTML = options.message || '';
          iconDiv.appendChild(icon);
          if (options.header) messageDiv.appendChild(header);
          messageDiv.appendChild(message);
          div.appendChild(iconDiv);
          div.appendChild(messageDiv); // Remove toast with click.

          div.addEventListener('click', function() {
            this.parentNode.removeChild(this);
            self.checkContainer();
          });

          if (options.removeIn && !isNaN(options.removeIn)) {
            self.elemTimeout = setTimeout(function() {
              if (div.parentNode) div.parentNode.removeChild(div);
              self.checkCenteredContainer();
            }, options.removeIn);
          }

          return div;
        }
      }, {
        key: "initContainer",
        value: function initContainer(options) {
          if (document.querySelector('#vp-toast-container') === null) {
            document.body.appendChild(this.createContainer(options));
          }
        }
      }, {
        key: "show",
        value: function show() {
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
            type: 'success',
            header: null,
            message: null,
            removeIn: null
          };
          this.initContainer(options);
          document.querySelector('#vp-toast-container').appendChild(this.createToast(options));
          document.querySelector('#vp-toast-container').style.display = 'block';
        }
      }, {
        key: "checkContainer",
        value: function checkContainer() {
          if (!document.querySelectorAll('.vp-toast').length) {
            var container = document.querySelector('#vp-toast-container');
            container.parentNode.removeChild(container);
          }

          this.checkCenteredContainer();
        }
      }, {
        key: "checkCenteredContainer",
        value: function checkCenteredContainer() {
          if (document.querySelectorAll('.vp-toast-wrapper').length) {
            var wrapper = document.querySelector('.vp-toast-wrapper');
            wrapper.parentNode.removeChild(wrapper);
          }

          if (this.elemTimeout) {
            clearTimeout(this.elemTimeout);
          }
        }
      }]);

      return Toast;
    }();
  return Toast;
})();

/* Useage example
const instance = new Toast();
Object.freeze(instance);

document.querySelector('#clickme').addEventListener('click', function() {
  instance.show({
    type: 'success',
    header: 'Success!!!',
    message: 'This is an example of a success message  the user would see within the toast.',
    centered: true
  });
})
*/
