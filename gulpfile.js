const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const gulpDocumentation = require('gulp-documentation');



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

gulp.task('documentation-html-options', function () {
    return gulp.src('./app/**/*.js')
        .pipe(gulpDocumentation('html', {}, {
            name: 'My Project',
            version: '1.0.0'
        }))
        .pipe(gulp.dest('html-documentation'));
});

gulp.task("default", ['browser-sync', 'watch', 'scripts']);

function swallowError(error) {
    console.log(error.toString());
    this.emit('end');
}