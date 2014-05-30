# grunt-svg-sprites

> Takes SVGs and creates a scalable SVG sprite with PNG fallback

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-svg-sprites --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-svg-sprites');
```

## The "svg_sprites" task

### Overview
In your project's Gruntfile, add a section named `svg_sprites` to the data object passed into `grunt.initConfig()`.
The below example reads all SVGs from the `src` directory and will create the files `dest/preview-svg-sprite.html`, `dest/css/sprites.css`, `dest/sprites/png-sprite.png` and `dest/sprites/svg-sprite.svg`

```js
grunt.initConfig({
  svg_sprites: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      src: 'src/*.svg',
      dest: 'dest'
    },
  },
});
```



## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
