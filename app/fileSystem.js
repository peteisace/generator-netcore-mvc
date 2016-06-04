var FileSystem = function(fs) {
    this.fs = fs;
};

module.exports = FileSystem;

var mkdirp = require('mkdirp');

FileSystem.prototype.createDir = function(path) {
  
  // just delegate to mkdirp. why? so we can mock filesystem if we want.
  mkdirp(path);
    
};

FileSystem.prototype.createTemplate = function(source, dest, replacements) {
  
  // we'll hit the fs this time.
  this.fs.copyTpl(
      source,
      dest,
      replacements
  );
    
};

