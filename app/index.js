'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
          
    // start with prompts
    prompting: function() {
        
        // will set the event.
        var done = this.async();
                        
        // inputs from user.                      
        var prompts = [
            {
                type: 'input',
                name: 'namespace',
                message: 'Please enter the namespace of your app',
                default: 'com.dotnet.application'              
            },
            {
                type: 'input',
                name: 'name',
                message: 'Please enter the name of your app',
                default: 'myApp'
            }
        ];
        
        // so now prompt
        this.prompt(
            prompts,
            function(answers) {
                
                // set our variables
                this.name = answers.name;
                this.namespace = answers.namespace;
                
                // and signal that we're done.
                done();                
            }.bind(this));                        
    },
    
    writing: {
        
        // we need to set up the basic files.
            
        config: function() {
            
        },
        
        application: function() {
            // this is where we'll write the templates.
            
            // let's start with program.cs          
            console.log("Creating required files");
            console.log("... creating directory 'src'");
            
            this.mkdirp('src');
            
            // create our Program.cs
            console.log("Creating starter files, main entry point and configuration file:");
            this.fs.copyTpl(
                this.templatePath('Program.cs'),
                this.destinationPath('src/Program.cs'),
                {
                    appName: this.name,
                    namespace: this.namespace      
                }                
            );
        }                                    
    }
});