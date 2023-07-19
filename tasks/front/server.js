import { prod, paths }  from '../config.js';

import server           from 'browser-sync';

export const front_server = (done) => {
    server.init({
        server: {
            baseDir: paths.front.root
        },
        port: 3000,
        notify: false,
        open: prod ? false : true
    });

    done();
}