/* eslint-env node, es6 */
var gulp = require('gulp');
var babel = require('gulp-babel');
var gulpLoadPlugins = require('gulp-load-plugins');
var browserSync = require('browser-sync');
var del = require('del');
var wiredep = require('wiredep').stream;

var fileinclude = require('gulp-file-include');

var $ = gulpLoadPlugins();
var reload = browserSync.reload;

gulp.task('styles', function () {
    return gulp.src('app/styles/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe(reload({
            stream: true
        }));
});

function lint(files, options) {
    return gulp.src(files)
        .pipe(reload({
            stream: true,
            once: true
        }))
        .pipe($.eslint(options))
        .pipe($.eslint.format())
        .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', function () {
    return lint('app/scripts/**/*.js', {
        fix: true,
        parserOptions: {
            ecmaVersion: 5
        },
        env: {
            browser: true,
            node: false
        },
        extends: 'eslint:recommended'
    })
    .pipe(gulp.dest('app/scripts'));
});
gulp.task('lint:test', function () {
    return lint('test/spec/**/*.js', {
        fix: true,
        env: {
            mocha: true
        }
    })
    .pipe(gulp.dest('test/spec/**/*.js'));
});

gulp.task('html', ['styles', 'scripts'], function () {
    return gulp.src('app/*.html')
        .pipe($.useref({
            searchPath: ['.tmp', 'app', '.']
        }))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cssnano({
            safe: true,
            autoprefixer: false
        })))
        .pipe($.if('*.html', $.htmlmin({
            collapseWhitespace: true
        })))
        .pipe(gulp.dest('dist'));
});

gulp.task('markup', [], function () {
    return gulp.src('app/markup/*.html')
        .pipe($.if('*.html', fileinclude({
            basepath: 'app/markup/_includes/'
        })))
        .pipe(gulp.dest('app'));
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true,
            // don't remove IDs from SVGs, they are often used
            // as hooks for embedding and styling
            svgoPlugins: [{
                cleanupIDs: false
            }]
        })))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('extras', function () {
    return gulp.src([
        'app/*.*',
        '!app/*.html'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist', 'app/*.html']));

gulp.task('serve', ['styles', 'scripts'], function () {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['.tmp', 'app']
        }
    });

    gulp.watch([
        'app/images/**/*',
        'app/*.html'
    ]).on('change', reload);

    gulp.watch('app/markup/**/*.tpl', ['markup']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
});

gulp.task('serve:dist', function () {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['dist']
        }
    });
});

gulp.task('serve:test', ['scripts'], function () {
    browserSync({
        notify: false,
        port: 9000,
        ui: false,
        server: {
            baseDir: 'test',
            routes: {
                '/scripts': '.tmp/scripts'
            }
        }
    });

    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('test/spec/**/*.js').on('change', reload);
    gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', function () {
    gulp.src('app/styles/*.scss')
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)+/
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('build', ['markup', 'lint', 'html', 'images', 'extras'], function () {
    return gulp.src('dist/**/*').pipe($.size({
        title: 'build',
        gzip: true
    }));
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
