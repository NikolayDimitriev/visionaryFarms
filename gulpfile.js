const { series, parallel } = pkg;
import pkg  from 'gulp';

/* FRONT */
import { front_html }                                               from './tasks/front/html.js';
import { front_styles }                                             from './tasks/front/styles.js';
import { front_scripts }                                            from './tasks/front/scripts.js';
import { front_images }                                             from './tasks/front/images.js';
import { front_fonts }                                              from './tasks/front/fonts.js';
import { front_transfer }                                           from './tasks/front/transfer.js';
import { front_delete }                                             from './tasks/front/clean.js';
import { front_server }                                             from './tasks/front/server.js';
import { front_watcher }                                            from './tasks/front/watcher.js';

/* FRONT */
export const front_build    = series(front_fonts, front_styles, front_scripts, front_html, front_images, front_transfer, parallel(front_watcher, front_server));
export const front_clean    = series(front_delete);
