var jspmFileManager = require("./jspmFileManager");

function SystemJsImport(options) {
  this.options = options;
}

SystemJsImport.prototype = {
  install: function (less, pluginManager) {
    var JspmFileManager = jspmFileManager(less);
    pluginManager.addFileManager(new JspmFileManager(this.options));
  },
  setOptions: function (options) {
    this.options = options;
  },
  minVersion: [2, 1, 1]
};

module.exports = SystemJsImport;