const Module = require("module");

const axios = require("axios");
const reactSSR = require("react-dom/server");
const proxy = require("http-proxy-middleware");
const path = require("path");
const webpack = require("webpack");
const MemoryFs = require("memory-fs");
const serverConfig = require("../../build/webpack.config.server");

// for template index.html after webpack compiled
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://127.0.0.1:8888/public/index.html")
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  });
};

const mfs = new MemoryFs();
let serverBundle;
const serverComplier = webpack(serverConfig);
serverComplier.outputFileSystem = mfs;
serverComplier.watch({}, (err, stats) => {
  if (err) throw err;
  stats = stats.toJson();
  stats.errors.forEach(err => console.log(err));
  stats.warnings.forEach(warn => console.log(warn));

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  );

  const bundle = mfs.readFileSync(bundlePath, "utf8");
  const m = new Module();
  m._compile(bundle, "server-entry.js");
  serverBundle = m.exports.default;
});

module.exports = function(app) {
  app.use(
    "/public",
    proxy({
      target: "http://127.0.0.1:8888"
    })
  );
  app.get("*", function(req, res) {
    getTemplate().then(template => {
      const content = reactSSR.renderToString(serverBundle);
      res.send(template.replace("<!-- app -->", content));
    });
  });
};
