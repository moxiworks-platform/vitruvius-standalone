(function () {
  var riotCounter = 0;
  var riotInterval = setInterval(function () {
    riotCounter++;

    if (riotCounter >= 240) {
      clearInterval(riotInterval);
    }

    if (window.riot) {
      clearInterval(riotInterval);
      riot.tag2('vp-input', '<div class="{returnBaseContainerClass()}"> <i data-icontype="left" class="{this.opts.iconleft}" if="{this.opts.iconleft}"></i> <i class="v-icon-close-circle" if="{this.opts.iconclose}" onclick="{clearField}"></i> <label riot-style="{checkLabelStyles()}" onclick="{focusOnInput}">{this.opts.label}</label> <input if="{!this.opts.textarea}" autocomplete="off" riot-style="{returnClass()}" type="{this.opts.type}" name="{this.opts.name}" riot-value="{this.opts.value}" onkeyup="{showHideClearButton}" onfocus="{hidePlaceHolder}" onblur="{showPlaceHolder}"> <textarea if="{this.opts.textarea}" autocomplete="off" rows="{this.opts.rows}" riot-style="{returnClass()}" type="{this.opts.type}" name="{this.opts.name}" riot-value="{this.opts.value}" onkeyup="{showHideClearButton}" onfocus="{hidePlaceHolder}" onblur="{showPlaceHolder}"></textarea> </div>', '', '', function (opts) {
        var self = this;

        this.noop = function () {}.bind(this);

        this.oneTimeValueSet = function () {
          self.oneTimeValueSet = self.noop;
          self.hidePlaceHolder();
        }.bind(this);

        this.returnBaseContainerClass = function () {
          var str = "vp-input-container";
          if (self.opts.textarea) str += " textarea";
          return str;
        }.bind(this);

        this.showHideClearButton = function (e) {
          if (e.which === 9 || e.which === 16) return false;
          var closeElem = self.root.querySelector('.v-icon-close-circle');
          var inputElem = self.opts.textarea ? self.root.querySelector('textarea') : self.root.querySelector('input');

          if (closeElem && inputElem && inputElem.value === '') {
            closeElem.style.display = 'none';
          } else if (closeElem) {
            closeElem.style.display = 'block';
          }

          if (inputElem.value === '') {
            inputElem.blur();
          }

          self.hideLabel(inputElem);
        }.bind(this);

        this.returnClass = function () {
          var str = '';

          if (self.opts.iconleft) {
            str += 'padding-left: 30px; ';
          }

          if (self.opts.iconClose) {
            str += 'padding-right: 30px; ';
          }

          if (self.opts.color) {
            str += "color: ".concat(self.opts.color, "; ");
          }

          return str;
        }.bind(this);

        this.clearField = function () {
          self.root.querySelector('input').value = '';
          self.showHideClearButton();
        }.bind(this);

        this.hidePlaceHolder = function () {
          self.root.querySelector('label').classList.add('active');
          self.root.querySelector('.vp-input-container').classList.add('dark');
        }.bind(this);

        this.showPlaceHolder = function () {
          var inputElem = self.opts.textarea ? self.root.querySelector('textarea') : self.root.querySelector('input');
          self.hideLabel(inputElem);
        }.bind(this);

        this.hideLabel = function (el) {
          if (el.value === '') {
            self.root.querySelector('label').classList.remove('active');
            self.root.querySelector('.vp-input-container').classList.remove('dark');
          }
        }.bind(this);

        this.checkLabelStyles = function () {
          var str = '';

          if (self.opts.iconleft) {
            str += "left: 40px; ";
          }

          if (self.opts.background) {
            str += "background: ".concat(self.opts.background, "; ");
          }

          if (self.opts.color) {
            str += "color: ".concat(self.opts.color, "; ");
          }

          if (self.opts.value && self.opts.value !== '') {
            setTimeout(function () {
              self.oneTimeValueSet();
            });
          }

          return str;
        }.bind(this);

        this.focusOnInput = function () {
          if (self.root.querySelector('input')) {
            self.root.querySelector('input').focus();
          } else if (self.root.querySelector('textarea')) {
            self.root.querySelector('textarea').focus();
          }
        }.bind(this);
      });
      riot.mount('vp-input');
    }
  }, 500);
})();