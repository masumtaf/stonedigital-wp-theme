/**
 *
 * Available gulp tasks:
 * gulp version -> changes the theme version in various files throught the project (prompt asks for new version)
 * gulp -> default task, minifies and concatenates css and js files
 * gulp prod -> changes the theme version, minifies and concatenates all CSS and JS files, creates the translations pot file, copies all files to dist folder (cleaning it up beforehand) and creates a new theme zip
 * and finally creates a new theme zip
 * gulp cssMin -> Autoprefixes and minifies all CSS files and adds font-family properties to all rules that contain object-fit, required by object-fit-images plugin
 * gulp cssConcat -> Concatenates all css files into all.css
 * gulp cssConcatmin -> Concatenates all minified css files into all.min.css
 * gulp css -> minifies and concatenates all css files
 * gulp jsConcat -> Concatenates all js files into all.js
 * gulp jsConcatmin -> Concatenates all minified js files into all.min.js
 * gulp jsMin -> minifies all js files
 * gulp clean -> deletes the dist folder
 * gulp cleanMin -> deletes all minified files (css and js) in the project
 * gulp copy -> copies all files to the dist folder (minifies resources and cleans the dist folder beforhand)
 * gulp zip -> creates the zip file for the theme from dist folder (runs gulp copy as a dependend task)
 * gulp pot -> generates the default.pot file for translations
 */

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('autoprefixer');
var zip = require('gulp-zip');
const sass = require('gulp-sass')(require('sass'));
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var pot = require('gulp-wp-pot');
var uglify = require('gulp-uglify');

var postcss = require('gulp-postcss');
var concat = require('gulp-concat');



// Sass task: compiles the style.scss file into style.css
gulp.task('scssTask', function() {
    return gulp.src('assets/scss/**/*.scss')
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([ autoprefixer() ])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(gulp.dest('assets/css/')
    ); // put final CSS in dist folder
});

// Css Minimy
gulp.task('cssMin', function() {
    return gulp.src([
        'assets/css/*.css',
        '!assets/css/*.min.css'
        ])
        .pipe(cssnano())
        .pipe(rename(function (path) {
            path.extname = ".min.css"
        }))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }));
});

/**
 * Minifies all unminified javascript files,
 * and copies them to dist folder
 */
gulp.task('jsMin', function () {
    return gulp.src([
        'assets/js/*.js',
        '!assets/js/*.min.js'
        ])
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.extname = ".min.js"
        }))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }));
});


/**
 * Deletes the dist folder
 */
// gulp.task('clean', function () {
//     return del(['dist/']);
// });

/**
 * Deletes all minified files in the project
 */
// gulp.task('cleanMin', function () {
//     return del([
//         'assets/js/*.min.js',
//         'assets/css/*.min.css',
//         '!node_modules/**/*'
//     ]);
// });

/**
 * Deletes all minified css files in the project
 */
// gulp.task('cleancssMin', function () {
//     return del([
//         'assets/css/*.min.css',
//         '!node_modules/**/*'
//     ]);
// });

// /**
//  * Deletes all minified js files in the project
//  */
// gulp.task('cleanjsMin', function () {
//     return del([
//         'assets/js/*.min.js',
//         '!node_modules/**/*'
//     ]);
// });


/**
 * Concat Js
 */
gulp.task('jsConcat', function() {
    return gulp.src('assets/js/vendor/*.js')
      .pipe(concat('vendor-scripts.js'))
      .pipe(gulp.dest('./assets/js'));
});

/**
 * Concat Css
 */
gulp.task('cssConcat', function() {
    return gulp.src('assets/css/vendor/*.css')
      .pipe(concat('vendor-styles.css'))
      .pipe(gulp.dest('./assets/css'));
});

/**
 * concat and minify css
 */
gulp.task('css', function(callback) {
    return runSequence( 'cssConcat', 'cssMin', callback);
});

/**
 * concat and minify js
 */
gulp.task('js', function(callback) {
    return runSequence( 'jsConcat', 'jsMin', callback);
});

/**
 * Copies all files to the dist folder
 */
gulp.task('copy', function () {
    return gulp.src([
        '**/*',
        '!src',
        '!src/**',
        '!.gitignore',
        '!package.json',
        '!package-lock.json',
        '!npm-shrinkwrap.json',
        '!gulpfile.js',
        '!composer.json',
        '!composer.lock',
        '!dist/**/*',
        '!node_modules',
        '!node_modules/**/*'
    ])
    .pipe(gulp.dest('dist/stone-digital'));
});



/**
 * Creates the zip file for the theme from dist folder
 * (has task that copies all required theme files
 * to dist folder)
 */
gulp.task('zip', function () {
    return gulp.src('dist/**/*')
        .pipe(zip('stone-digital.zip'))
        .pipe(gulp.dest('dist'))
});

/**
 * Generates the default .pot
 * file for translations
 */
gulp.task('pot', function () {
    return gulp.src('**/*.php')
        .pipe(pot({
            domain: 'stone-digital',
            package: 'stone-digital'
        }))
        .pipe(gulp.dest('languages/default.pot'));
});

/**
 * Changes the version, minifies and concatenates
 * all CSS and JS files, copies all files to
 * dist folder (cleaning it up beforehand),
 * and finally creates a new theme zip
 */

gulp.task('prod', gulp.series('pot', 'copy', 'zip', function (done) {
    done();
}));


/**
 * Watch Gulp css and js concat
 */

gulp.task('watch', function () {
    gulp.watch('assets/scss/**/*.scss', gulp.series('scssTask',gulp.parallel('cssMin')));
    gulp.watch('assets/css/vendor/*.css', gulp.series('cssConcat',gulp.parallel('cssMin')));
    // gulp.watch('assets/css/*.css', gulp.parallel('cssMin'));
    gulp.watch('assets/js/vendor/*.js', gulp.series('jsConcat',gulp.parallel('jsMin')));
    // gulp.watch('assets/js/*.js', gulp.series('jsMin'));
});

/**
 * Minifies and concatenates JS and CSS
 */
gulp.task('default', gulp.series('cssConcat', 'jsConcat') );
