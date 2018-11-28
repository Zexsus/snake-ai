const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', function(){
    gulp.watch('*.html').on('change', browserSync.reload).on("error", swallowError);
    gulp.watch('dist/app.js').on('change', browserSync.reload).on("error", swallowError);
    gulp.watch(['app/**/*.js', 'app/**/*.json'], ['scripts']).on('error', swallowError);
});

// Build all js scripts into ./dist
gulp.task('scripts', function() {
    return browserify('app/app.js')
        .transform(babelify)
            .bundle()
        .on('error', swallowError)
            .pipe(source('app.js'))
        .pipe(gulp.dest('./dist'))
});

gulp.task("default", ['browser-sync', 'watch', 'scripts']);

function swallowError(error) {
    console.log(error.toString());
    this.emit('end');
}