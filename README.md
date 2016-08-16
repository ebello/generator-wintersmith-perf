# generator-wintersmith-perf [![devDependency Status](https://david-dm.org/ebello/generator-wintersmith-perf/dev-status.svg)](https://david-dm.org/ebello/generator-wintersmith-perf#info=devDependencies)

A set of packages and build scripts to enable a highly optimized and performant static site using wintersmith. Enables easy deployment to S3.

## Setup
Requires node and npm. `brew install node` gets you both.

1. Download [latest zip](https://github.com/ebello/generator-wintersmith-perf/archive/master.zip).
2. Rename folder to project name.
3. `cd [PROJECT NAME]`
4. `npm install`
5. `gulp`
6. Point your browser to [http://localhost:8888](http://localhost:8888)

## Build environment
Running `gulp` starts the development environment. All HTML, CSS, JS files are monitored and changes will automatically reload Chrome if you have the [extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) installed.

### CSS
Place Sass files in `./styles`. Write valid CSS and [autoprefixer](https://github.com/ai/autoprefixer) will take care of any vendor prefixes.

### JavaScript
Place your scripts in `./scripts/client`. Use [browserify](http://browserify.org/articles.html) to bundle all client files together. Libraries can be placed under `./scripts/vendor`. Scripts will be minified with uglify. Any file ending with `.min.js` will not be minified again. ES6 is supported by babel. 

### Images
Create a `./assets` folder to place images, downloads, or other miscellaneous files. If you have images to use for retina screens, place them in a folder named `2x` under `./assets`. Retina images will automatically be sized down 50% and placed in the folder above the `2x` folder it is residing in. Run `gulp responsive_images:resize_2x_images` to resize them.

### Deployment testing
Run `gulp deploy:test` to run through the entire build process and host the site locally.

### Amazon S3 deployment
S3 configuration for staging and production is included. Find the appropriate config section in `gulp-utilities.js` and fill in the S3 buckets you're using. Run `gulp deploy --target=staging` or `gulp deploy --target=production`.

### Wintersmith
The config file for Wintersmith is at `./config.json`. [Nunjucks](http://mozilla.github.io/nunjucks/) is included for the templating language.

***
Heavily inspired from https://github.com/davidtucker/davidtucker-blog
