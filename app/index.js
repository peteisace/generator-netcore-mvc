'use strict';

var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');

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
            },
            {
                type: 'option',
                name: 'canInstallBower',
                message: 'Do you wish to install bower, and create default bower.json?'                
            },
            {
                type: 'option',
                name: 'canInstallGulp',
                message: 'Do you wish to install gulp and create default gulpfile?'
            }
        ];
        
        // so now prompt
        this.prompt(
            prompts,
            function(answers) {
                
                // set our variables
                this.name = answers.name;
                this.namespace = answers.namespace;
                this.canInstallBower = answers.canInstallBower;
                this.canInstallGulp = answers.canInstallGulp;
                
                // and signal that we're done.
                done();                
            }.bind(this));                        
    },
    
    writing: {
        
        // we need to set up the basic files.
            
        config: function() {
            
            console.log("Configuring project.json");
              
            // copy the file across.
            this.fs.copy(
                this.templatePath('project.json'),
                this.destinationPath('src/project.json')
            );              
        },
        
        nodeTools: function() {
            
          this.dependentModules = [];
          
          // we're going to set up bower.
          if(this.canInstallBower) {
              
              this.dependentModules.push('bower');
              
              // let's write the bowerrc
              var bowerConfig = { directory: 'components' };
              var bowerInstall = 
              {
                name: this.name,
                main: 'index.js',
                ignore: [
                    "**/.*",
                    "node_modules",
                    "bower_components",
                    "wwwroot/components",    
                    "test",
                    "tests"
                ],
                dependencies: {
                    "jquery": "^2.2.4"
                }
              };
              
              // write the files.
              this.fs.writeJSON('bower.json', bowerInstall);
              this.fs.writeJSON('.bowerrc', bowerConfig);
              
          }
          
          if(this.canInstallGulp) {
              
              // add gulp to the list of targets
              this.dependentModules.push('gulp');
              this.dependentModules.push('gulp-livereload');
              
              // so then let's create our default gulp file.
              this.fs.copyTpl(
                  this.templatePath('gulpfile.js'),
                  this.destinationPath('gulpfile.js')
              );           
          }
          
          if(this.dependentModules.length > 0) {
              
              mkdirp('node_modules');
              this.fs.copyTpl(
                  this.templatePath('package.json'),
                  this.destinationPath('package.json'), {
                    appName: this.name      
                  }
              );
              
          }            
        },
        
        application: function() {
            // this is where we'll write the templates.
            
            // let's start with program.cs          
            console.log("Creating required files");
            console.log("... creating directory 'src'");
            
            // create the directory
            mkdirp('src');
            
            var tempVariables = { appName: this.name, namespace: this.namespace };
            
            // create our Program.cs
            console.log("Creating starter files, main entry point and configuration file:");
            this.fs.copyTpl(
                this.templatePath('Program.cs'),
                this.destinationPath('src/Program.cs'),
                tempVariables                
            );
            
            // create startup class.
            this.fs.copyTpl(
                this.templatePath('Startup.cs'),
                this.destinationPath('src/Startup.cs'),
                tempVariables
            );
            
            // we also need to create wwwroot and the actual views etc.
            mkdirp('wwwroot');
            mkdirp('src/Controllers');
            mkdirp('src/Views');
            mkdirp('src/Views/Home');
            mkdirp('wwwroot/scripts');
            mkdirp('wwwroot/css');
            mkdirp('wwwroot/images');
            
            // let's create the home controller - basic entry point
            this.fs.copyTpl(
                this.templatePath('Controllers/HomeController.cs'),
                this.destinationPath('src/Controllers/HomeController.cs'),
                tempVariables
            );
            
            // and finally, our custom views
            this.fs.copy(
                this.templatePath('Views/Index.cshtml'),
                this.destinationPath('src/Views/Home/Index.cshtml')
            );
        }                                    
    },
    
    install: function() {
        
        console.log("running npm install now...")              
     
        // install the stuff
        this.npmInstall(this.dependentModules, { 'saveDev': true });           
    }
});