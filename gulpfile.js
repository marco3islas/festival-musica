const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const webp = require('gulp-webp');

// css

const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const avif = require('gulp-avif');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// Compresor Js
const terser = require('gulp-terser-js');

// Funciones
const css = (done) => {
    //identificar el archvo scss a compilar
         src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe( sass())// Compilarlo
        .pipe( postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe( dest('build/css'))
    // Almacenarlo
    console.log('Compilando sass');
    done();
}

// Galeria javascript

const javascript = (done) => {
     src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'))
    done();
}

const dev = (done) => {
    watch('src/scss/**/*.scss', css);
    watch('src/scss/**/*.js', javascript);
    done();
}

// imagenees jpg
const imagenes = (done) => {
    const opciones = {
        optimizationLevel: 3
    };
    src("src/img/**/*.{png,jpg}")// buscar imagenes
    .pipe( cache(imagemin(opciones)))
    .pipe( dest('build/img' ))
    done();
}
// imagenes webp
const versionWebp = (done) => {

    const opciones = {
        quality: 50
    };

    src("src/img/**/*.{png,jpg}")// buscar imagenes
    .pipe( webp(opciones) ) // transformar a webp (con la calidad al 50% ver opciones)
    .pipe( dest('build/img'))
    done();
}
// imagenes avif
const imagenesAvif = (done) => {

    const opciones = {
        quality: 50
    };

    src("src/img/**/*.{png,jpg}")// buscar imagenes
    .pipe( avif(opciones) ) // transformar a webp (con la calidad al 50% ver opciones)
    .pipe( dest('build/img'))
    done();
}
exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.imagenesAvif = imagenesAvif;
exports.dev = parallel(javascript, dev);
