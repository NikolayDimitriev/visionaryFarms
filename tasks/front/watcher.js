import pkg from 'gulp';
const { watch } = pkg;

import { front_html }                                               from './html.js';
import { front_styles }                                             from './styles.js';
import { front_scripts }                                            from './scripts.js';
import { front_images }                                             from './images.js';
import { front_fonts }                                              from './fonts.js';
import { front_transfer }                                           from './transfer.js';

import { prod, paths }      from '../config.js';

export const front_watcher = (done) => {
    if(!prod){
        watch(paths.src.html.target,                                { usePolling: true }, front_html);
        watch(paths.src.styles.target,                              { usePolling: true }, front_styles);
        watch(paths.src.scripts.target,                             { usePolling: true }, front_scripts);
        watch(paths.src.images.target,                              { usePolling: true }, front_images);
        watch(paths.src.assets.fonts + '**/*.*',                    { usePolling: true }, front_fonts);
        watch(paths.src.assets.files,                               { usePolling: true }, front_transfer);
    }
    done();
}