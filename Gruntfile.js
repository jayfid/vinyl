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
                    'dist/js/all.min.js': ['javascript/*.js', 'javascript/*/*.js']
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
        }
    });

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
    grunt.registerTask('default', ['jshint', 'sassdoc']);
    grunt.registerTask('dev', ['compass', 'ts', 'uglify', 'minifyHtml']);
};
