var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  method1: function() {
    console.log("method1 just ran");   
  },
  method2: function () {
    console.log("method2 just ran");   
  }                             
});