import pkg from 'gulp';
const { src, dest, series } = pkg;

import fs               from 'fs';
import ttf2woff2        from 'gulp-ttf2woff2';

import { paths }        from '../config.js';

const woff2 = (done) => {
    src(paths.src.assets.fonts + '**/*.*')
        .pipe(dest(paths.front.fonts));
    src(paths.src.assets.fonts + '**/*.ttf')
        .pipe(ttf2woff2())
        .pipe(dest(paths.front.fonts));

    done();
}
const fonts_list = (done) => {
    fs.readFileSync('src/css/_fonts/_fonts_list.sass');
    fs.writeFile('src/css/_fonts/_fonts_list.sass', '', done);

    /*
    // Fonts helper
    100 - Extra Light or Ultra Light
    200 - Light or Thin
    300 - Book or Demi
    400 - Regular or Normal
    500 - Medium
    600 - Semibold or Demibold
    700 - Bold
    800 - Black or Extra Bold or Heavy
    900 - Extra Black or Fat or Ultra Black or Heavy
     */

    var fonts_types = new Map([
        ['ExtraLight', '100'],
        ['UltraLight', '100'],
        ['ExtraBold', '800'],
        ['ExtraBlack', '900'],
        ['UltraBlack', '900'],
        ['UltraBold', '900'],
        ['SemiBold', '600'],
        ['DemiBold', '600'],
        ['Light', '200'],
        ['Thin', '200'],
        ['Book', '300'],
        ['Demi', '300'],
        ['Regular', '400'],
        ['Medium', '500'],
        ['Bold', '700'],
        ['Black', '800'],
        ['Heavy', '900'],
        ['Fat', '900']
    ]);
    return fs.readdir(paths.src.assets.fonts, function (err, items) {
        if(items){
            items.forEach(function (item, i) {
                var font_fullname = items[i];
                var font_style = 'normal';
                var font_weight = '400';
                var font_family = font_fullname;
                // if italic
                if(font_fullname.indexOf('Italic') >= 0){
                    font_style = 'italic';
                    font_family = font_family.replace('Italic', '');
                }
                // find weights
                fonts_types.forEach(function(value,key) {
                    if(font_family.indexOf(key) >= 0){
                        font_weight = fonts_types.get(key);
                        font_family = font_family.replace(key, '');
                    }
                });
                if(font_fullname == 'fontello'){
                    fs.appendFile('src/css/_fonts/_fonts_list.sass', '@include font-face("Fontello", "fontello", 400, normal)\r\n', done);
                }
                else{
                    fs.appendFile('src/css/_fonts/_fonts_list.sass', '@include font-face("'+ font_family +'", "'+ font_fullname +'", '+ font_weight +', '+ font_style +')\r\n', done);
                }
            });
        }
    });
};

export const front_fonts = series(fonts_list, woff2);