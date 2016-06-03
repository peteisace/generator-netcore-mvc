var gulp = require('gulp');
var liveReload = require('gulp-livereload');

gulp.task('watch', function() {
   
   // watch the styles.
   liveReload.listen();
   
   // watch any files
   gulp.watch(['wwwroot/css/**']).on('change', liveReload.changed);   
       
});

gulp.task('default', function() {
   gulp.start('watch'); 
});


