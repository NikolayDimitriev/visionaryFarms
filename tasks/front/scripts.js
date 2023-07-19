import pkg from 'gulp';
const { src, dest } = pkg;

import gulpif           from 'gulp-if';
import sourcemaps       from 'gulp-sourcemaps';
import rename           from 'gulp-rename';
import uglify           from 'gulp-uglify';
import plumber          from 'gulp-plumber';
import cached           from 'gulp-cached';


import browserify       from 'browserify';
import babelify         from 'babelify';
import source           from 'vinyl-source-stream';
import buffer           from 'vinyl-buffer';

import server           from 'browser-sync';

import {config, paths, prod} from '../config.js';


export const front_scripts = (done) => {
    /* main */
    browserify(paths.src.scripts.main, { debug: true })
        .transform('babelify', { global: true, presets: config.babel.presets })
        .bundle()
        .pipe(source('common.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(paths.front.scripts))
        .pipe(gulpif(!prod, server.stream()));
    if(prod){
        browserify(paths.src.scripts.main, { debug: true })
            .transform('babelify', { global: true, presets: config.babel.presets })
            .bundle()
            .pipe(source('common.js'))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(dest(paths.front.scripts));
    }
    /* vendor */
    src(paths.src.scripts.vendor)
        .pipe(plumber())
        .pipe(cached('js_vendor'))
        .pipe(dest(paths.front.scripts))
        .pipe(gulpif(prod, uglify()))
        .pipe(gulpif(prod, rename({suffix: '.min'})))
        .pipe(gulpif(prod, dest(paths.front.scripts)))
        .pipe(gulpif(!prod, server.stream()));
    done();
}