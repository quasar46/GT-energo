"use strict";

const gulp = require("gulp");
const { src, dest, parallel, watch } = require("gulp");
const concat = require("gulp-concat");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
// const del = require("del");

function pugstart() {
  return src(["./src/pages/**/*.pug", "!./src/pages/modules/**/*"])
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(dest("./build/"))
    .pipe(browserSync.stream()); // Триггерим Browsersync для обновления страницы
}

function images() {
  return src("./src/images/**/*").pipe(dest("./build/images/"));
}

function styles() {
  return src("./src/sass/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("main.css"))
    .pipe(
      autoprefixer({ overrideBrowserslist: ["last 10 versions"], grid: true })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./build/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return (
    src([
      "./src/js/**/*.js", // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
    ])
      // .pipe(concat("main.js")) // Конкатенируем в один файл
      .pipe(dest("./build/js/")) // Выгружаем готовый файл в папку назначения
      .pipe(browserSync.stream())
  );
}

function customScripts() {
  return src("./node_modules/swiper/swiper-bundle.min.js")
    .pipe(dest("./build/js"))
    .pipe(browserSync.stream());
}

function browsersync() {
  browserSync.init({
    // Инициализация Browsersync
    server: { baseDir: "./build/" }, // Указываем папку сервера
    notify: false, // Отключаем уведомления
    online: true, // Режим работы: true или false
  });
}

function startwatch() {
  // Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js
  watch(["./src/js/**/*.js", "!./src/**/*.min.js"], scripts);

  // Мониторим файлы pug на изменение
  watch(["./src/pages/**/*.pug"], pugstart);

  // Мониторим файлы препроцессора на изменения
  // watch("app/**/" + preprocessor + "/**/*", styles);
  watch("./src/sass/**/*.scss", styles);

  // Мониторим файлы HTML на изменения
  watch("./build/**/*.html").on("change", browserSync.reload);

  // Мониторим папку-источник изображений и выполняем images(), если есть изменения
  watch("./src/images/**/*", images);
}

exports.default = parallel(
  styles,
  pugstart,
  scripts,
  customScripts,
  images,
  browsersync,
  startwatch
);
