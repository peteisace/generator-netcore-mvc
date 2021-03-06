function Tree(fileSystem) {
    this.fs = fileSystem;      
}

module.exports = Tree;

Tree.prototype.createStructure = function(bob) {          
    
    // build the array of items
    var directories = [
        "src",
        "src/Views",
        "src/Views/Home",
        "src/Views/Shared",
        "src/wwwroot",
        "src/wwwroot/css",
        "src/wwwroot/scripts",
        "src/wwwroot/images",
        "src/wwwroot/lib",
        "src/publishExclude",
        "src/publishExclude/sass",
        "src/publishExclude/js",
        "src/Controllers"        
    ];
    
    // loop around the directories.
    directories.forEach(function(value, index, array) {
        
        // and create each one where necessary.
        this.fs.createDir(value);
        
    }.bind(this));
        
}