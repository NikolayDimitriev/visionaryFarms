import pkg from 'gulp';
const { src, dest } = pkg;

import plumber          from 'gulp-plumber';
import include          from 'gulp-file-include';
import cached           from 'gulp-cached';
import replace          from 'gulp-replace';
import reveasy          from 'gulp-rev-easy';
import inject           from 'gulp-inject';
import gulpif           from 'gulp-if';
import stripcomm        from 'gulp-strip-comments';
import typograf         from 'gulp-typograf';
import prettyhtml       from 'gulp-pretty-html';
import removelines      from 'gulp-remove-empty-lines';

import server           from 'browser-sync';

import {config, paths, prod} from '../config.js';

export const front_html = (done) => {
    src(paths.src.html.pages)
        .pipe(plumber())
        .pipe(include())
        .pipe(cached('html'))                                                                                           // cache files (check cache)
        .pipe(replace('${lang}',                    config.settings.site_lang))                                         // replace lang
        .pipe(replace('${title}',                   config.settings.site_name))                                         // replace name
        .pipe(replace('${siteUrl}',                 config.settings.site_url))                                          // replace og:url/canonical
        .pipe(inject(src(                                                                                                     // insert links for fonts/css/js
                [
                    paths.src.assets.fonts + '**/*.ttf',
                    paths.src.styles.vendor,
                    paths.src.scripts.vendor
                ],
                {read: false}),
            {
                relative: false,
                removeTags: true,
                empty: true,
                ignorePath: ['src/assets/fonts/', 'src/css/_vendor/', 'src/js/_vendor/'],
                transform: function (filepath) {
                    if (filepath.slice(-4) === '.ttf') {
                        if(filepath.indexOf('fontello') > 0){                                                      // dont preload fontello
                            return;
                        }
                        filepath = filepath.replace('.ttf', '.woff2');
                        return '<link rel="preload" href="fonts' + filepath + '" as="font" type="font/woff2" crossorigin>';
                    }
                    if (filepath.slice(-4) === '.css') {
                        return '<link rel="stylesheet" href="css'+ filepath +'">';
                    }
                    if (filepath.slice(-3) === '.js') {
                        return '<script defer src="js'+ filepath +'"></script>';
                    }
                    return inject.transform.apply(inject.transform, arguments);
                }
            }
        ))
        .pipe(gulpif(prod, reveasy({                                                                                    // add cache
            revMode: 'dom',
            revType: 'hashkey',
            fileTypes: ['js', 'css'],
            elementAttributes: {
                js: {
                    name: 'script[data-v="cache"]',
                    src: 'src'
                },
                css: {
                    name: 'link[data-v="cache"]',
                    src: 'href'
                }
            }
        })))
        .pipe(gulpif(prod, replace(/href="(.*).css(.*)"/g,'href="' + '$1' + '.min.css' + '$2' + '"')))         // rename files if prod                                                // rename min if prod
        .pipe(gulpif(prod, replace(/src="(.*)(?!.json).js(.*)"/g, 'src="' + '$1' + '.min.js' + '$2' + '"')))   // rename files if prod
        .pipe(gulpif(prod, stripcomm({trim: true})))                                                                    // remove comments if prod
        .pipe(gulpif(config.settings.formatText, typograf(config.typograf)))                                                   // format text
        .pipe(prettyhtml(config.prettyhtml))                                                                                   // format html
        .pipe(removelines())                                                                                                   // remove empty lines
        .pipe(dest(paths.front.root))
        .pipe(gulpif(!prod, server.reload({stream: true})))
    done();
}