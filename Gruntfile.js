module.exports = function(grunt) {
    var clientJsFiles = ['public/javascripts/**/*.js'];
    var serverJsFiles = [
        'lib/*.js', 'routes/**/*.js', 'app.js'
    ];

    grunt.initConfig({
        jshint: {
            client: {
                src: clientJsFiles,
                options: {
                    'esnext': true
                }
            },
            server: {
                src: serverJsFiles,
                options : {
                    'esnext': true,
                    'node': true,
                     globals : {
                        Promise: true
                     }
                }
            }
        },
        uglify: {},
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['jshint', 'uglify']);
};