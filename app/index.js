'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
          
    // start with prompts
    prompting: function() {
                        
        return this.prompt([
            {
                type: 'input',
                name: 'namespace',
                message: 'Please enter the namespace of your app'                
            },
            {
                type: 'input',
                name: 'name',
                message: 'Please enter the name of your app',
                default: 'myApp'
            }
        ].then(function(answers) {
            // now we have the answers, let's do something with it, start creating the files.
            var message = "Now creating files required for ".concat(answers.namespace).concat(".").concat(answers.name);
            this.log(message);
            
            // now we need to set variables.      
            this.props = answers;
                                           
        }.bind(this)));   
    },
    
    writing: {
        
        // we need to set up the basic files.
            
        config: function() {
            
        },
        
        application: function() {
            // this is where we'll write the templates.
            
            // let's start with program.cs
            this.fs.copyTpl(
                this.templatePath('Program.cs'),
                this.destinationPath('src/Program.cs'), {
                   
                }
            );   
        }                                    
    }
});