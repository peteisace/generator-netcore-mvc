'use strict';

var generators = require('yeoman-generator');
var requirejs = require('requirejs');
var Tree = require('./tree.js');
var FileSystem = require('./fileSystem.js');

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
              var bowerConfig = { directory: 'src/wwwroot/lib' };
              var bowerInstall = 
              {
                name: this.name,
                main: 'index.js',
                ignore: [                    
                    "src/node_modules",
                    "bower_components",
                    "src/wwwroot/lib",    
                    "test",
                    "tests"
                ],
                dependencies: {
                    "jquery": "^2.2.4"
                }
              };
              
              // write the files.
              this.fs.writeJSON('src/bower.json', bowerInstall);
              this.fs.writeJSON('src/.bowerrc', bowerConfig);
              
          }
          
          if(this.canInstallGulp) {
              
              // add gulp to the list of targets
              this.dependentModules.push('gulp');
              this.dependentModules.push('gulp-livereload');
              
              // so then let's create our default gulp file.
              this.fs.copyTpl(
                  this.templatePath('gulpfile.js'),
                  this.destinationPath('src/gulpfile.js')
              );           
          }
          
          if(this.dependentModules.length > 0) {
                            
              this.fs.copyTpl(
                  this.templatePath('package.json'),
                  this.destinationPath('src/package.json'), {
                    appName: this.name      
                  }
              );
              
          }            
        },
                        
        application: function() {
            // this is where we'll write the templates.
            
            // file system
            var fileSystem = new FileSystem(this.fs);
            
            // create directory first.
            var directories = new Tree(fileSystem);
            directories.createStructure(fileSystem);
                                                                        
            var tempVariables = { appName: this.name, namespace: this.namespace };
            
            var required = [
              { file: "Program.cs", prefix: "src/" },
              { file: "Startup.cs", prefix: "src/" },
              { file: "Controllers/HomeController.cs", prefix: "src/" },
              { file: "Views/Home/Index.cshtml", prefix: "src/" },
              { file: "gitignore", prefix: "src/", rename: ".gitignore" },
              { file: "global.json", prefix: "" }
            ];
                                    
            required.forEach(function(value, index, array) {
               
               fileSystem.createTemplate(
                   this.templatePath(value.file),
                   this.destinationPath(value.prefix.concat(value.rename == null ? value.file : value.rename)),
                   tempVariables
               );
                
            }.bind(this));      
            
            // handle the git ignore
            fileSystem.createTemplate(
                this.templatePath('gitignore'),
                this.destinationPath('src/.gitignore'),
                tempVariables
            );
        }                                    
    },
    
    install: function() {
        
        console.log("running npm install now...")              
          
        // install the stuff
        this.npmInstall(this.dependentModules, { 'saveDev': true });                           
    }
});