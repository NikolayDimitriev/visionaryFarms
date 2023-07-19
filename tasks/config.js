export const config = {
    settings: {
        site_lang               : 'ru',
        site_name               : 'Visionary Farms',
        site_url                : 'https://site-url.ru/',
        formatText              : true,
    },
    php_scripts                 : false,                                                                                // use php scripts (for landing page)
    babel: {
        presets: ['@babel/preset-env']
    },
    typograf: {
        locale: ['ru', 'en-US'],
        safeTags: [
            ['<!--', '-->'],
            ['{', '}'],
            ['<a href=', '/a>'],
            ['<\\?php', '\\?>'],
            ['<no-typography>', '</no-typography>']
        ],
    },
    prettyhtml: {
        indent_size: 4,
        indent_char: ' ',
        end_with_newline: false,
        indent_inner_html: false,
        preserve_newlines: '--no-preserve-newlines',
        unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br']
    },
    autoprefixer: {
        grid                    : true,
        overrideBrowserslist    : ['last 15 versions', '> 0.1%', 'Firefox ESR', 'ie 8', 'ie 7']
    }
};

export const prod       = process.argv.includes('--prod');
export const install    = process.argv.includes('--install');
export const root       = prod ? './release/' : './build/';

export const paths = {
    src: {
        html: {
            target          : 'src/html/**/*.html',
            pages           : 'src/html/pages/*.html',
            components      : 'src/html/components/*.html',
            sections        : 'src/html/sections/*.html',
            tpls            : 'src/html/tpls/*.html'
        },
        styles: {
            target          : 'src/css/**/*.*',
            critical        : 'src/css/main.sass',
            main            : 'src/css/styles.sass',
            vendor          : 'src/css/_vendor/**/*.css'
        },
        scripts: {
            target          : 'src/js/**/*.*',
            main            : 'src/js/common.js',
            vendor          : 'src/js/_vendor/**/*.js'
        },
        images: {
            target          : 'src/images/**/*.*',
            bg              : 'src/images/bg/*.*',
            common          : 'src/images/common/',
            svg             : 'src/images/svg/',
            sprites: {
                png         : 'src/images/sprites/png/',
                svg         : 'src/images/sprites/svg/'
            }
        },
        assets: {
            favicon         : 'src/assets/favicon/*.*',
            fonts           : 'src/assets/fonts/',
            php             : 'src/assets/php/*.*',
            files: [
                'src/assets/audios/**/*.*',
                'src/assets/docs/**/*.*',
                'src/assets/videos/**/*.*'
            ]
        }
    },
    front: {
        root                : root,
        styles              : root + 'css/',
        scripts             : root + 'js/',
        images              : root + 'images/',
        sprites: {
            images          : root + 'images/sprites/',
            css             : root + 'css/'
        },
        assets              : root + 'assets/',
        favicon             : root + 'favicon/',
        fonts               : root + 'fonts/',
        php                 : root + 'include/'
    }
}