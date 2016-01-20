module.exports = function(grunt) {
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
            myFiles: ['javascript/*.js'],
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
                outDir: 'javascript/ts',
                src: 'typescript/*.ts',
                baseDir: 'typescript'
            }
        },
        uglify: {
            default: {

                files: {
                    'dist/js/all.min.js': [
                        'javascript/*.js',
                        'javascript/*/*.js'
                    ]
                }
            }
        },
        minifyHtml: {
            options: {
                cdata: true
                //quotes: true
            },
            dist: {
                files: {
                    'dist/index.html': 'html/index.html'
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
                    cwd: 'images',
                    filter: 'isFile',
                    src: '**.{png,jpg,gif}',
                    dest: 'dist/img/'
                }]
            }
        },
        watch: {
            javascript: {
                files: ['javascript/*.js'],
                tasks: ['jshint', 'uglify']
            },
            typescript: {
                files: ['typescript/*.ts'],
                tasks: ['clean:ts', 'ts', 'jshint', 'uglify']
            },
            sass: {
                files: ['sass/*.scss', 'sass/**/*.scss'],
                tasks: ['compass']
            },
            partials: {
                files: ['html/src/*.html', 'html/src/_includes/*.tpl'],
                tasks: ['htmlall']
            },
            images: {
                files: ['images/*.png', 'images/*.jpg', 'images/*.gif'],
                tasks: ['image']
            }
        },
        "http-server": {
            'dev': {
                root: "dist",
                port: 8080,
                //host: "dev.jayfid.com",
                runInBackground: true
            }
        },
        clean: {
            ts: ["javascript/ts"],
            dist: ["dist/css", "dist/js"]
        },
        htmllint: {
            all: ["html/*.html"]
        },
        includereplace: {
            dist: {
                options: {
                    includesDir: 'html/src/_includes'
                },
                files: [{
                    src: '*.html',
                    dest: "html",
                    expand: true,
                    cwd: 'html/src'
                }]
            }
        }
    });

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
    grunt.registerTask(  'default' ,[ 'jshint', 'sassdoc'                       ]);
    grunt.registerTask(  'jsall'   ,[ 'clean:ts', 'ts', 'jshint', 'uglify'      ]);
    grunt.registerTask(  'htmlall' ,[ 'includereplace', 'htmllint', 'minifyHtml']);
    grunt.registerTask(  'start'   ,[ 'http-server', 'watch'                    ]);
};
