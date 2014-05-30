/*jslint node: true */
/*global require, module, process */

/*
 * grunt-svg-sprites
 * https://github.com/thomaswelton/grunt-svg-sprites
 *
 * Copyright (c) 2014 thomaswelton
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        jslint: {
            all: {
                src: [
                    'Gruntfile.js',
                    'tasks/*.js'
                ]
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        svg_sprites: {
            default_options: {
                options: {

                },
                src: 'test/fixtures/svg/*.svg',
                dest: 'tmp'
            }
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'svg_sprites']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jslint', 'test']);

};
