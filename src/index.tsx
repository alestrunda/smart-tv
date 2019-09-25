import * as m from "mithril";
import Menu from "./components/Menu";
import SplashScreen from "./components/SplashScreen";
import { SPLASH_SCREEN_TIMEOUT } from "./constants";

const state = {
  isSplashScreenOpened: true,
  isMenuOpened: false,

  closeSplashScreen: function() {
    state.isSplashScreenOpened = false;
    m.redraw();
  },

  closeMenu: function() {
    state.setMenuOpened(false);
  },

  openMenu: function() {
    state.setMenuOpened(true);
  },

  setMenuOpened: function(isOpened) {
    state.isMenuOpened = isOpened;
    m.redraw();
  }
};

document.addEventListener("keydown", e => {
  if (e.key === "Backspace") {
    state.openMenu();
  }
});

m.route(document.body, "/", {
  "/": {
    oninit: function() {
      setTimeout(() => {
        state.closeSplashScreen();
      }, SPLASH_SCREEN_TIMEOUT);
    },
    view: () => {
      if (state.isSplashScreenOpened) {
        return m(SplashScreen);
      } else {
        state.openMenu();
        m.route.set("/screen-1");
        return null;
      }
    }
  },
  "/screen-1": {
    view: () => {
      if (state.isSplashScreenOpened) {
        m.route.set("/");
        return null;
      } else {
        return [
          m(Menu, {
            isActive: state.isMenuOpened,
            onItemSelect: state.closeMenu
          }),
          m("h1.text-center", "Screen 1")
        ];
      }
    }
  },
  "/screen-2": {
    view: () => {
      if (state.isSplashScreenOpened) {
        m.route.set("/");
        return null;
      } else {
        return [
          m(Menu, {
            isActive: state.isMenuOpened,
            onItemSelect: state.closeMenu
          }),
          m("h1.text-center", "Screen 2")
        ];
      }
    }
  },
  "/screen-3": {
    view: () => {
      if (state.isSplashScreenOpened) {
        m.route.set("/");
        return null;
      } else {
        return [
          m(Menu, {
            isActive: state.isMenuOpened,
            onItemSelect: state.closeMenu
          }),
          m("h1.text-center", "Screen 3")
        ];
      }
    }
  }
});
