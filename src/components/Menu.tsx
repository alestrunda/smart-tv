import * as m from "mithril";
import classNames from "classnames";

const menuItems = [
  {
    href: "/screen-1",
    title: "Screen 1"
  },
  {
    href: "/screen-2",
    title: "Screen 2"
  },
  {
    href: "/screen-3",
    title: "Screen 3"
  }
];

const state = {
  highlightedItem: -1,

  setHighlightedItem: function(itemNumber) {
    this.highlightedItem = itemNumber;
    m.redraw();
  },

  resetHighlightedItem: function() {
    this.highlightedItem = -1;
  }
};

export default initialVnode => {
  let watchKeydownFunc;

  const handleLinkClick = () => {
    state.resetHighlightedItem();
    initialVnode.attrs.onItemSelect();
  };

  const watchKeydown = (attrs, e) => {
    if (e.key === "Enter" && state.highlightedItem !== -1) {
      e.preventDefault();
      m.route.set(menuItems[state.highlightedItem].href);
      attrs.onItemSelect();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const selectedItem =
        state.highlightedItem >= 1
          ? state.highlightedItem - 1
          : menuItems.length - 1;
      state.setHighlightedItem(selectedItem);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const selectedItem =
        state.highlightedItem < menuItems.length - 1
          ? state.highlightedItem + 1
          : 0;
      state.setHighlightedItem(selectedItem);
    }
  };

  return {
    oninit: function({ attrs }) {
      if (menuItems.length === 0) return;
      watchKeydownFunc = watchKeydown.bind(null, attrs);
      document.addEventListener("keydown", watchKeydownFunc);
    },

    onremove: function() {
      if (!watchKeydownFunc) return;
      document.removeEventListener("keydown", watchKeydownFunc);
    },

    view: ({ attrs }) => {
      const activePath = m.parsePathname(m.route.get()).path;
      return m(
        "nav",
        m(
          "ul",
          {
            class: classNames("menu text-center", { active: attrs.isActive })
          },
          menuItems.map((item, index) => {
            const isActive = activePath === item.href;
            const isHighlighted = state.highlightedItem === index;
            return m(
              "li",
              {
                class: classNames(
                  { active: isActive },
                  { selected: isHighlighted }
                ),
                key: item.href
              },
              m(
                m.route.Link,
                {
                  href: item.href,
                  onclick: handleLinkClick
                },
                item.title
              )
            );
          })
        )
      );
    }
  };
};
