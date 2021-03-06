'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const config = require('../config').sassCompile;
const handleErrors = require('../utils/handleErrors');
const plumber = require('gulp-plumber');
const merge = require('merge-stream');

// Compile the main Protocol Sass file(s) to CSS.
function compileSass() {
    const tasks = [];

    Object.keys(config).forEach((key) => {
        const val = config[key];
        tasks.push(gulp.src(val.src)
            .pipe(plumber({ errorHandler: handleErrors }))
            .pipe(sourcemaps.init())
            .pipe(sass(config.settings))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(val.dest)));
    });

    return merge(tasks);
}

module.exports = compileSass;
