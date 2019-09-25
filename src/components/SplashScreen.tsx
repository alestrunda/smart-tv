import * as m from "mithril";

export default {
  view: () => {
    return m(
      ".text-center",
      m("img", { src: require("../../assets/logo.svg"), width: 200 })
    );
  }
};
