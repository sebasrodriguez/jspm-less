var jspm = require("jspm");
var fs = require("fs");
var path = require('path');

module.exports = function(less) {
    var FileManager = less.FileManager;
    
    function JspmFileManager(options) {
      this.options = options || {};

      if (this.options.prefix === undefined) {
          this.options.prefix = 'jspm://';
      }
    }
    
    JspmFileManager.prototype = new FileManager();
    
    JspmFileManager.prototype.supports = function(filename, currentDirectory, options, environment) {
        var jspmProtocolPrefixRegex = new RegExp('^' + this.options.prefix, 'i');
        return filename.match(jspmProtocolPrefixRegex) || currentDirectory.match(jspmProtocolPrefixRegex)
    };
    
    JspmFileManager.prototype.supportsSync = JspmFileManager.prototype.supports;
    
    JspmFileManager.prototype.loadFile = function(filename, currentDirectory, options, environment) {
        filename = filename.replace(this.options.prefix, "");
        
        return jspm.normalize(filename).then((normalizedFilePath) => {
            normalizedFilePath = normalizedFilePath
                .replace(".js", "")
                .replace("file://", "");
            normalizedFilePath = path.normalize(normalizedFilePath);
            
            return FileManager.prototype.loadFile.call(this, normalizedFilePath, "", options, environment);
        });        
    };
    
    return JspmFileManager;
}