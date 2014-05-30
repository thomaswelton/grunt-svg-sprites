/*jslint node: true */
/*global require, module, process */

module.exports = function (grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        // Configuration to be run (and then tested).
        svg_sprites: {
            default_options: {
                options: {
                    generatePreview: false
                },
                src: 'icons/*.svg'
            }
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-svg-sprites');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['svg_sprites']);

};
