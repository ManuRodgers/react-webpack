const express = require("express");
const favicon = require("serve-favicon");
const reactSSR = require("react-dom/server");
const path = require("path");
const fs = require("fs");

const isDev = process.env.NODE_ENV === "development";


const app = express();
app.use(favicon(path.resolve(__dirname, "../favicon.ico")));
if (!isDev) {
  // for the root component after webpack complied
  const serverEntry = require("../dist/js/server-entry").default;
  const template = fs.readFileSync(
    path.resolve(__dirname, "../dist/index.html"),
    "utf8"
  );
  app.use("/public", express.static(path.resolve(__dirname, "../dist")));
  app.get("*", function(req, res) {
    const appString = reactSSR.renderToString(serverEntry);

    res.send(template.replace("<!-- app -->", appString));
  });
} else {
  const devStatic = require("./util/dev-static");
  devStatic(app);
}
app.listen(3333, function() {
  console.log(`the node server is successfully running on the port:3333`);
});
