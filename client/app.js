import React from "react";
import { hydrate } from "react-dom";
import { AppContainer } from "react-hot-loader";
// import { BrowserRouter as Router } from "react-router-dom";
import App from "./views/App.jsx";

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
  module.hot.accept("./views/App", () => {
    const nextApp = require("./views/App").default;
    render(nextApp);
  });
}
