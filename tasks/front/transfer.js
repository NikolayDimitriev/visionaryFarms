import pkg from 'gulp';
const { src, dest } = pkg;

import cached   from 'gulp-cached';

import server from 'browser-sync';

import { paths, config } from '../config.js';

export const front_transfer = (done) => {
    /* favicon */
    src(paths.src.assets.favicon)
        .pipe(cached('favicon'))
        .pipe(dest(paths.front.favicon));
    /* files */
    src(paths.src.assets.files, {base: 'src/assets/'})
        .pipe(cached('files'))
        .pipe(dest(paths.front.assets));
    /* php */
    if(config.php_scripts) {
        src(paths.src.assets.php)
            .pipe(cached('php'))
            .pipe(dest(paths.front.php))
    }
    server.reload({stream: true});
    done();
}