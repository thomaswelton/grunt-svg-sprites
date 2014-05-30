/*jslint node: true */
/*global require, module, process */

/*
 * grunt-svg-sprites
 * https://github.com/thomaswelton/grunt-svg-sprites
 *
 * Copyright (c) 2014 thomaswelton
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    var svgutil = require('gulp-svg-sprites/lib/svg-utils'),
        cssRender = require('gulp-svg-sprites/lib/css-render'),
        preview = require('gulp-svg-sprites/lib/preview'),
        utils = require("gulp-svg-sprites//lib/utils"),
        svg2png  = require('svg2png'),
        path = require('path');

    grunt.registerMultiTask('svg_sprites', 'Takes SVGs and creates a scalable SVG sprite with PNG fallback', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var data = this.data,
            src = data.src,
            dest = data.dest || './',
            tasks = [],
            srcFiles,
            combined,
            css,
            previewPage,
            previewPath,
            previewContent,
            svgSpritePath,
            svgSpriteDest,
            svgContent,
            cssPath,
            cssContent,
            svgPath,
            pngPath,
            options = this.options({
                classNameSuffix: '',
                svg: {
                    sprite: "sprites/svg-sprite.svg"
                },
                className: ".%f",
                svgId:     "%f",
                cssFile:   "css/sprites.css",
                svgPath:   "../%f",
                pngPath:   "../%f",
                preview: {
                    sprite: "preview-svg-sprite.html",
                    defs: "preview-svg.html"
                },
                refSize: 26,
                padding: 0,
                defs: false,
                hideSvg: true,
                generatePreview: true,
                generateCSS: true
            });

        // Load in all images from the src
        srcFiles = grunt.file.expand(src);

        srcFiles.forEach(function (file) {
            var contents = grunt.file.read(file),
                fileInfo = {
                    path: file
                };

            svgutil.addSvgFile(contents, fileInfo, tasks, function () {
                return null;
            });
        });


        combined = svgutil.buildSVGSprite(options.classNameSuffix, tasks, options);
        css      = cssRender.render(combined.spriteData, options);

        if (options.generatePreview) {
            previewPage = preview.render(css.elements, combined.content, options);
            previewPath = options.defs ? options.preview.defs : options.preview.sprite;
            previewContent = new Buffer(previewPage.svgSprite.content);

            grunt.file.write(path.join(dest, previewPath), previewContent);
        }

        svgSpritePath = options.defs ? options.svg.defs : options.svg.sprite;
        svgSpriteDest = path.join(dest, svgSpritePath);
        svgContent = new Buffer(combined.content);

        grunt.file.write(svgSpriteDest, svgContent);

        if (options.generateCSS) {
            cssPath = options.cssFile;
            cssContent = new Buffer(css.content);

            grunt.file.write(path.join(dest, cssPath), cssContent);
        }

        svgPath = path.resolve(svgSpriteDest);
        pngPath = path.resolve(utils.swapFileName(svgSpriteDest));

        svg2png(svgPath, pngPath, function (err) {
            if (err) {
                grunt.fail.fatal("Could not create the PNG format");
            }
        });

    });
};
