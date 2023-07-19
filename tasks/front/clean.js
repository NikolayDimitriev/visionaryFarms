import pkg from 'gulp';
const { src } = pkg;

import clean            from 'gulp-clean';
import confirm          from 'gulp-confirm';

export const front_delete = (done) => {
    src('./build/', {read: false, allowEmpty: true})
        .pipe(confirm({
            question: '*** /// "build" folder will be removed. Are you sure? (y/n)',
            input: '_key:y'
        }))
        .pipe(clean({force: true}));
    src('./release/', {read: false, allowEmpty: true})
        .pipe(confirm({
            question: '*** /// "release" folder will be removed. Are you sure? (y/n)',
            input: '_key:y'
        }))
        .pipe(clean({force: true}));
    done();
}