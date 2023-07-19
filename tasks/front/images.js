import pkg from 'gulp';
const { src, dest } = pkg;

import plumber          from 'gulp-plumber';
import cached           from 'gulp-cached';
import gulpif           from 'gulp-if';
import imagemin, {mozjpeg, optipng, svgo} from 'gulp-imagemin';
import webp             from 'gulp-webp';
import avif             from 'gulp-avif';
import cheerio          from 'gulp-cheerio';
import replace          from 'gulp-replace';
import svgsprite        from 'gulp-svg-sprite';
import spritesmith      from 'gulp.spritesmith';
import cleancss         from 'gulp-clean-css';
import responsive       from 'gulp-responsive';

import server           from 'browser-sync';

import { prod, paths }  from '../config.js';

export const front_images = (done) => {
    /* TODO CHECK */
    /* bg */
    src(paths.src.images.bg)
        .pipe(plumber())
        .pipe(cached('bg_images'))                                                                                 // cache files (check cache)
        // desk
        .pipe(responsive({
            '*.jpg':[
                // original
                {
                    quality: 100
                },
                // pad
                {
                    width: 1024,
                    quality: 100,
                    rename: { suffix: '_pad' }
                },
                // mobile
                {
                    width: 576,
                    quality: 100,
                    rename: { suffix: '_mobile' }
                }
            ]
        }, {
            progressive: true,
            withMetadata: false,
            silent: true
        }))
        .pipe(imagemin([
            mozjpeg({quality: 95, progressive: true}),
            optipng({optimizationLevel: 5}),
        ], {silent: true}))
        .pipe(dest(paths.front.images + 'bg'));
    /* common */
    src(paths.src.images.common + '**/*.*', {base: 'src/images/'})
        .pipe(plumber())
        .pipe(cached('main_images'))                                                                               // cache files (check cache)
        .pipe(gulpif(prod, imagemin([
            mozjpeg({quality: 90, progressive: true}),
            optipng({optimizationLevel: 5}),
        ], {silent: true})))
        .pipe(dest(paths.front.images))
    src(paths.src.images.common + '**/*.{png,jpg,tiff}', {base: 'src/images/'})
        .pipe(plumber())
        .pipe(cached('main_webp'))
        .pipe(gulpif(prod, webp({quality: 90})))
        .pipe(gulpif(prod, dest(paths.front.images)));
    src(paths.src.images.common + '**/*.{png,jpg}', {base: 'src/images/'})
        .pipe(plumber())
        .pipe(cached('main_avif'))
        .pipe(gulpif(prod, avif()))
        .pipe(gulpif(prod, dest(paths.front.images)));
    /* svg */
    src(paths.src.images.svg + '**/*.*', {base: 'src/images/'})
        .pipe(plumber())
        .pipe(cached('svg_images'))                                                                            // cache files (check cache)
        .pipe(gulpif(prod, imagemin ([
            svgo()
        ], {silent: true})))
        .pipe(dest(paths.front.images));
    /* sprites */
    // svg
    src(paths.src.images.sprites.svg + '*.svg', {base: 'src/images/'})
        .pipe(imagemin ([
            svgo()
        ], {silent: true}))
        .pipe(
            cheerio({
                run: function ($) {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                },
                parserOptions: {
                    xmlMode: true
                },
            })
        )
        .pipe(replace('&gt;', '>'))
        .pipe(svgsprite({
            mode: {
                stack: {
                    sprite: "../sprite.svg"
                }
            }
        }))
        .pipe(dest(paths.front.sprites.images));
    // png
    var spriteData =
        src(paths.src.images.sprites.png + '*.png', {base: 'src/images/'})
            .pipe(plumber())
            .pipe(imagemin ([
                optipng({optimizationLevel: 5})
            ], {silent: true}))
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprites.sass',
                imgPath: '../images/sprites/sprite.png',
                algorithm: 'binary-tree',
                padding: 5,
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name;
                }
            }));
    spriteData.img.pipe(dest(paths.front.sprites.images));
    spriteData.css.pipe(gulpif(prod, cleancss({                                                                                         // update css
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
    })))
    spriteData.css.pipe(dest('src/css/_sprites/'));

    server.reload();
    done();
}