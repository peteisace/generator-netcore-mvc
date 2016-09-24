'use strict';

var generators = require('yeoman-generator');
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
                                      
            console.log("Configuring project.json");
              
            // copy the file across.
            this.fs.copy(
                this.templatePath('project.json'),
                this.destinationPath('src/project.json')
            );              
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
              { file: "global.json", prefix: "" },
              { file: "publishExclude/js/main.js", prefix: "src/"},
              { file: "publishExclude/sass/styles.scss", prefix: "src/"},
              { file: "package.json", prefix: "src/"},
              { file: "gulpfile.js", prefix: "src/"},
              { file: ".bowerrc", prefix: "src/"},
              { file: "bower.json", prefix: "src/"}
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

        // need to install gulp if not already installed.
        // and then the dependent modules:
        //  SASS
        //  browserify
        //  uglify
        var dependencies = [
            "gulp",
            "gulp-sass",
            "gulp-browserify",
            "gulp-uglify",
            "gulp-sourcemaps",
            "gulp-clean-css",
            "gulp-uglify",
            "gulp-rename",
            "pump"            
        ];

        // let's change the current directory
        var nodeDirectory = process.cwd() + '/src';
        console.log("Trying to change to " + nodeDirectory);
        process.chdir(nodeDirectory);

        // throw the dependencies at the installation
        this.npmInstall(dependencies, { 'saveDev': true });                
    }
});