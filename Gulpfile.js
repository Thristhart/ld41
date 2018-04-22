const gulp = require('gulp');
const newer = require('gulp-newer');

const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const babel = require('babelify');
const uglify = require('gulp-uglify');

const del = require('del');

const browserSync = require('browser-sync');

const build_dir = "./dist/";

const postcss  = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const JS_GLOB = "./src/**/*.js";

function buildJS() {
  return browserify('./src/index.js', {debug: true})
    .transform(babel.configure({
      presets: [['env', {
        "targets": {
          "browsers": ["last 2 versions", "safari >= 7", "iOS >= 7"],
        },
      }]]
    }))
    .bundle()
    .on('error', function(err) { console.error(err.message); this.emit('end'); })
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    //.pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(build_dir));
}

const HTML_GLOB = "./src/**/*.html";
function copyHTML() {
  return gulp.src(HTML_GLOB)
    .pipe(gulp.dest(build_dir));
}

const STATIC_GLOB = "./static/**/*";
function copyStatic() {
  return gulp.src(STATIC_GLOB)
    .pipe(gulp.dest(build_dir + "static"));
}

const AUDIO_GLOB = "./src/**/*.ogg";
function copyAudio() {
  return gulp.src(AUDIO_GLOB)
    .pipe(gulp.dest(build_dir));
}

const MP3_GLOB = "./src/**/*.mp3";
function copyAudioMp3() {
  return gulp.src(MP3_GLOB)
    .pipe(gulp.dest(build_dir));
}

const CSS_GLOB = "./src/**/*.css";
function buildCSS() {
  const plugins = [
    autoprefixer({ grid: false }),
  ];
  return gulp.src(CSS_GLOB)
    .pipe(postcss(plugins))
    .pipe(gulp.dest(build_dir))
    .pipe(browserSync.stream());
}

function reload() {
  browserSync.reload();
  return Promise.resolve();
}

function watch() {
  function watchWithDebounce(glob, fn) {
    return gulp.watch(glob, {delay: 1000}, fn);
  }
  watchWithDebounce(JS_GLOB, gulp.series(buildJS, reload));
  watchWithDebounce(HTML_GLOB, gulp.series(copyHTML, reload));
  watchWithDebounce(STATIC_GLOB, gulp.series(copyStatic, reload));
  watchWithDebounce(AUDIO_GLOB, gulp.series(copyAudio, reload));
  watchWithDebounce(MP3_GLOB, gulp.series(copyAudioMp3, reload));
  watchWithDebounce(CSS_GLOB, buildCSS);

  browserSync.init({
    server: {
      baseDir: build_dir,
    },
    port: process.env.PORT,
    ghostMode: false,
    open: false,
  });
}

function clean() {
  return del(build_dir);
}

gulp.task(watch);
gulp.task(buildJS);
gulp.task(copyHTML);
gulp.task(copyStatic);
gulp.task(copyAudio);
gulp.task(copyAudioMp3);
gulp.task(buildCSS);
gulp.task(clean);
gulp.task('buildAll', gulp.parallel('buildCSS', 'copyHTML', 'copyStatic', 'copyAudio', 'copyAudioMp3', 'buildJS'));
gulp.task('dist', gulp.series('clean', 'buildAll'));
gulp.task('dev', gulp.series('dist', 'watch'));