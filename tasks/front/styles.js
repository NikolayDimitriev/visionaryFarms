import pkg from 'gulp';
const { src, dest } = pkg;

import plumber          from 'gulp-plumber';
import gulpif           from 'gulp-if';
import sourcemaps       from 'gulp-sourcemaps';
import sass             from 'gulp-dart-sass';
import cached           from 'gulp-cached';
import prefixer         from 'gulp-autoprefixer';
import cleancss         from 'gulp-clean-css';
import rename           from 'gulp-rename';

import server           from 'browser-sync';

import {config, paths, prod} from '../config.js';

export const front_styles = (done) => {
    /* main */
    src([paths.src.styles.critical, paths.src.styles.main])
        .pipe(plumber())
        .pipe(gulpif(!prod, sourcemaps.init()))                                                                         // sourcemaps
        .pipe(sass().on('error', sass.logError))
        .pipe(cached('css_main'))                                                                                  // cache files (check cache)
        .pipe(prefixer(config.autoprefixer))                                                                            // prefixer
        .pipe(cleancss({                                                                                         // update css
            format: 'beautify',
            level: {
                1: {
                    all: true,
                },
                2: {
                    mergeAdjacentRules: true, // controls adjacent rules merging; defaults to true
                    mergeIntoShorthands: true, // controls merging properties into shorthands; defaults to true
                    mergeMedia: true, // controls `@media` merging; defaults to true
                    mergeNonAdjacentRules: true, // controls non-adjacent rule merging; defaults to true
                    mergeSemantically: false, // controls semantic merging; defaults to false
                    overrideProperties: true, // controls property overriding based on understandability; defaults to true
                    removeEmpty: true, // controls removing empty rules and nested blocks; defaults to `true`
                    reduceNonAdjacentRules: true, // controls non-adjacent rule reducing; defaults to true
                    removeDuplicateFontRules: false, // controls duplicate `@font-face` removing; defaults to true
                    removeDuplicateMediaBlocks: true, // controls duplicate `@media` removing; defaults to true
                    removeDuplicateRules: true, // controls duplicate rules removing; defaults to true
                    removeUnusedAtRules: false, // controls unused at rule removing; defaults to false (available since 4.1.0)
                    restructureRules: false, // controls rule restructuring; defaults to false
                }
            }
        }))                                                                        // update css/minify
        .pipe(gulpif(!prod, sourcemaps.write('.')))                                                              // sourcemaps write
        .pipe(dest(paths.front.styles))
        .pipe(gulpif(prod, cleancss({
            level: {
                1: {
                    all: true,
                },
                2: {
                    mergeAdjacentRules: true, // controls adjacent rules merging; defaults to true
                    mergeIntoShorthands: true, // controls merging properties into shorthands; defaults to true
                    mergeMedia: true, // controls `@media` merging; defaults to true
                    mergeNonAdjacentRules: true, // controls non-adjacent rule merging; defaults to true
                    mergeSemantically: false, // controls semantic merging; defaults to false
                    overrideProperties: true, // controls property overriding based on understandability; defaults to true
                    removeEmpty: true, // controls removing empty rules and nested blocks; defaults to `true`
                    reduceNonAdjacentRules: true, // controls non-adjacent rule reducing; defaults to true
                    removeDuplicateFontRules: false, // controls duplicate `@font-face` removing; defaults to true
                    removeDuplicateMediaBlocks: true, // controls duplicate `@media` removing; defaults to true
                    removeDuplicateRules: true, // controls duplicate rules removing; defaults to true
                    removeUnusedAtRules: false, // controls unused at rule removing; defaults to false (available since 4.1.0)
                    restructureRules: false, // controls rule restructuring; defaults to false
                }
            }
        })))                                                                            // update css/minify
        .pipe(gulpif(prod, rename({suffix: '.min'})))                                                               // rename
        .pipe(gulpif(prod, dest(paths.front.styles)))
        .pipe(gulpif(!prod, server.stream()));
    /* vendor */
    src(paths.src.styles.vendor)
        .pipe(plumber())
        .pipe(cached('css_vendor'))                                                                                // cache files (check cache)
        .pipe(dest(paths.front.styles))
        .pipe(gulpif(prod, cleancss({
            level: {
                1: {
                    all: true,
                },
                2: {
                    mergeAdjacentRules: true, // controls adjacent rules merging; defaults to true
                    mergeIntoShorthands: true, // controls merging properties into shorthands; defaults to true
                    mergeMedia: true, // controls `@media` merging; defaults to true
                    mergeNonAdjacentRules: true, // controls non-adjacent rule merging; defaults to true
                    mergeSemantically: false, // controls semantic merging; defaults to false
                    overrideProperties: true, // controls property overriding based on understandability; defaults to true
                    removeEmpty: true, // controls removing empty rules and nested blocks; defaults to `true`
                    reduceNonAdjacentRules: true, // controls non-adjacent rule reducing; defaults to true
                    removeDuplicateFontRules: false, // controls duplicate `@font-face` removing; defaults to true
                    removeDuplicateMediaBlocks: true, // controls duplicate `@media` removing; defaults to true
                    removeDuplicateRules: true, // controls duplicate rules removing; defaults to true
                    removeUnusedAtRules: false, // controls unused at rule removing; defaults to false (available since 4.1.0)
                    restructureRules: false, // controls rule restructuring; defaults to false
                }
            }
        })))                                                                            // update css/minify
        .pipe(gulpif(prod, rename({suffix: '.min'})))                                                               // rename
        .pipe(gulpif(prod, dest(paths.front.styles)))
        .pipe(gulpif(!prod, server.stream()));
    done();
}