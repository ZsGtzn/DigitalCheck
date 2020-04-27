import Vue from 'vue'

class Touch {
  constructor(el, { value, modifiers }, type) {
    this.el = el;
    this.type = type;

    //
    const capture = (undefined === modifiers.capture ? false : modifiers.capture);
    const passive = (undefined === modifiers.passive ? true : modifiers.passive);
    const stopPropagation = (undefined === modifiers.stopPropagation ? false : modifiers.stopPropagation);

    //
    this.touchStartPos = { x: 0, y: 0 };
    this.touchMovePos = { x: 0, y: 0 };
    this.longTouch = false;
    this.callback = value;

    //
    this.el.addEventListener("touchstart", e => {
      if (stopPropagation) {
        e.stopPropagation();
      }

      this.start(e);
    }, {
      capture,
      passive
    });

    this.el.addEventListener("touchend", e => {
      if (stopPropagation) {
        e.stopPropagation();
      }

      this.end(e);
    }, {
      capture,
      passive
    });

    this.el.addEventListener("touchmove", e => {
      if (stopPropagation) {
        e.stopPropagation();
      }

      this.move(e);
    }, {
      capture,
      passive
    });
  }

  start(e) {
    this.longTouch = false;
    this.touchStartPos = {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    };
    this.touchMovePos = {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    }
    //
    this.longTouchTimeout = setTimeout(() => {
      this.longTouch = true;
    }, 1000);
  }

  end(e) {
    const movePos = {
      x: e.changedTouches[0].pageX - this.touchStartPos.x,
      y: e.changedTouches[0].pageY - this.touchStartPos.y
    }
    //
    clearTimeout(this.longTouchTimeout);

    // wipe
    if (Math.abs(movePos.x) > 10 || Math.abs(movePos.y) > 100) {
      //
      this.type == "swipe" && this.callback(e, this.el);

      //
      if (Math.abs(movePos.x) > Math.abs(movePos.y)) {
        if (movePos.x > 0) {
          this.type == "swipeRight" && this.callback(e, this.el);
        }
        else {
          this.type == "swipeLeft" && this.callback(e, this.el);
        };
      } else {
        if (movePos.y > 0) {
          this.type == "swipeDown" && this.callback(e, this.el);
        }
        else {
          this.type == "swipeUp" && this.callback(e, this.el);
        };
      };

      return;
    }

    // longTouch
    if (this.longTouch) {
      this.type == "longTouch" && this.callback(e, this.el);

      return;
    }

    // tap
    this.type == "tap" && this.callback(e, this.el);
  }

  move(e) {
    const movePos = {
      x: e.changedTouches[0].pageX - this.touchMovePos.x,
      y: e.changedTouches[0].pageY - this.touchMovePos.y
    }

    // reset
    this.touchMovePos = {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    }

    //
    if (Math.abs(movePos.x) > 10 || Math.abs(movePos.y) > 10) {

      if (Math.abs(movePos.x) > Math.abs(movePos.y)) {
        if (movePos.x > 0) {
          this.type == "longTouchRight" && this.callback(e, this.el);
        }
        else {
          this.type == "longTouchLeft" && this.callback(e, this.el);
        };
      } else {
        if (movePos.y > 0) {
          this.type == "longTouchDown" && this.callback(e, this.el);
        }
        else {
          this.type == "longTouchUp" && this.callback(e, this.el);
        };
      };
    }
  }
}

export default {
  install: () => {
    Vue.directive("tap", {
      bind: function (el, binding) {
        new Touch(el, binding, "tap");
      }
    });
    Vue.directive("swipe", {
      bind: function (el, binding) {
        new Touch(el, binding, "swipe");
      }
    });
    Vue.directive("swipe-left", {
      bind: function (el, binding) {
        new Touch(el, binding, "swipeLeft");
      }
    });
    Vue.directive("swipe-right", {
      bind: function (el, binding) {
        new Touch(el, binding, "swipeRight");
      }
    });
    Vue.directive("swipe-down", {
      bind: function (el, binding) {
        new Touch(el, binding, "swipeDown");
      }
    });
    Vue.directive("swipe-up", {
      bind: function (el, binding) {
        new Touch(el, binding, "swipeUp");
      }
    });
    Vue.directive("long-touch", {
      bind: function (el, binding) {
        new Touch(el, binding, "longTouch");
      }
    });
    Vue.directive("long-touch-left", {
      bind: function (el, binding) {
        new Touch(el, binding, "longTouchLeft");
      }
    });
    Vue.directive("long-touch-right", {
      bind: function (el, binding) {
        new Touch(el, binding, "longTouchRight");
      }
    });
    Vue.directive("long-touch-down", {
      bind: function (el, binding) {
        new Touch(el, binding, "longTouchDown");
      }
    });
    Vue.directive("long-touch-up", {
      bind: function (el, binding) {
        new Touch(el, binding, "longTouchUp");
      }
    });
  }
}
