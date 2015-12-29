module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            all: ['javascript/*.js'],
            options: {
                jshintrc: 'grunt/.jshintrc'
            }
        },
        compass: {
            dist: {
                options: {
                    config: 'grunt/config.rb'
                }
            }
        },
        ts: {
            default: {
                outDir: 'dist/js',
                src: 'typescript/*.ts'
            }
        }
    });
//    grunt.loadNpmTasks('grunt-contrib-jshint');
//    grunt.loadNpmTasks('grunt-contrib-compass');
    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
    grunt.registerTask('default', ['jshint', 'compass']);
};
