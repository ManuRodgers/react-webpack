import React from "react";
import { hydrate } from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./App.jsx";

// hydrate(<App />, document.getElementById("root"));
const root = document.getElementById("root");

const render = Component => {
  hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    root
  );
};
render(App);

if (module.hot) {
  module.hot.accept("./App.jsx", () => {
    const NextApp = require("./App.jsx").default;
    // hydrate(<NextApp />, document.getElementById("root"));
    render(NextApp);
  });
}
