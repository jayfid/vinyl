module.exports = function(grunt) {
    var os = require('os');
    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sassdoc: {
            default: {
                src: 'src',
                options: {
                    dest: 'docs/sass/'
                }
            }
        },
        jshint: {
            myFiles: ['app/scripts/*.js'],
            options: {
                jshintrc: 'grunt/.jshintrc'
            }
        },
        compass: {
            default: {
                options: {
                    config: 'grunt/config.rb'
                }
            }
        },
        ts: {
            default: {
                outDir: '.tmp/scripts/typescript/',
                src: 'app/scripts/typescript/*.ts',
                baseDir: 'app/scripts/typescript'
            }
        },
        uglify: {
            default: {

                files: {
                    '.tmp/scripts/all.min.js': [
                        'app/scripts/**.js'
                    ]
                }
            }
        },
        minifyHtml: {
            options: {
                cdata: true
            },
            default: {
                files: {
                    'dist/index.html': '.tmp/index.html',
                }
            }
        },
        image: {
            static: {
                options: {
                    optipng: true,

                },
                files: {

                }
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'app/images',
                    filter: 'isFile',
                    src: '**.{png,jpg,gif}',
                    dest: '.tmp/images'
                }]
            }
        },
        watch: {
            scripts: {
                files: ['app/scripts/*.js'],
                tasks: ['jshint', 'uglify']
            },
            typescript: {
                files: ['app/scripts/typescript/*.ts'],
                tasks: ['clean:ts', 'ts', 'jshint', 'uglify']
            },
            sass: {
                files: ['app/styles/*.scss', 'app/styles/**/*.scss'],
                tasks: ['compass']
            },
            partials: {
                files: ['app/markup/*.html', 'app/markup/**/*.tpl'],
                tasks: ['includereplace', 'minifyHtml']
            },
            images: {
                files: ['app/images/*.png', 'app/images/*.jpg', 'app/images/*.gif'],
                tasks: ['image']
            }
        },
        connect: {
            server: {
                port: {
                    port: 9001,
                    base: '.tmp',
                    livereload: true,
                    keepalive: true,
                    open: true
                }
            }
        },
        "http-server": {
            default: {
                root: '.tmp',
                port: 9001,
                customPages: {
                    '/bower_components/normalize-css/normalize.css': 'bower_components/normalize-css/normalize.css'
                }
            } 
        },
        clean: {
            default: [".tmp"]
        },
        htmllint: {
            all: [".tmp/*.html"],
            options: {
                'id-class-ignore-regex': "^unlint",
                force: true
            }
        },
        includereplace: {
            default: {
                options: {
                    includesDir: 'app/markup/_includes'
                },
                files: [{
                    src: '*.html',
                    dest: ".tmp",
                    expand: true,
                    cwd: 'app/markup'
                }]
            }
        }
    });

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
    grunt.registerTask(  'default' ,[ 'jshint'                     ]);
    grunt.registerTask(  'scripts' ,[ 'ts', 'jshint', 'uglify'     ]);
    grunt.registerTask(  'html'    ,[ 'includereplace', 'htmllint' ]);

};
