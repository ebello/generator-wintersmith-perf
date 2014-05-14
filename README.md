# Setup
Requires node and npm. `brew install node` gets you both.

1. Download [latest zip](https://github.com/ebello/generator-wintersmith-perf/archive/master.zip).
2. Rename folder to project name.
3. `cd [PROJECT NAME]`
4. `npm install`
5. `grunt`
6. Point your browser to http://localhost:8888

# Build environment
Running `grunt` starts the development environment. All HTML, CSS, JS files are monitored and changes will automatically reload Chrome if you have the [extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) installed.

## CSS
Place Sass files in `./styles`. Write valid CSS and [autoprefixer](https://github.com/ai/autoprefixer) will take care of any vendor prefixes.

## JavaScript
Place your scripts in `./scripts/client`. Use [browserify](http://browserify.org/articles.html) to bundle all client files together. Libraries can be placed under `./scripts/vendor`. Scripts will be minified with uglify. Any file ending with `.min.js` will not be minified again.

## Images
Create a `./assets` folder to place images, downloads, or other miscellaneous files. If you have images to use for retina screens, place them in a folder named `2x` under `./assets`. If you're running `grunt` retina images will automatically be sized down 50% and placed in the folder above the `2x` folder it is residing in. Run `grunt:responsive_images:resize_2x_images` to resize them manually.

## Deployment testing
Run `grunt deploy:test` to run through the entire build process and host the site locally.

## Amazon S3 deployment
If you're using S3 for hosting, create a file in the root of your project named `.grunt-aws.json`. Use the following format and insert your AWS key and secret. This file is ignored in a git repo.
```
{
  "key": "",
  "secret": ""
}
```
The Gruntfile includes S3 configuration for staging and production. Find the appropriate config section and fill in the S3 bucket you're using. Run `grunt deploy:staging` or `grunt deploy:production`.

## Wintersmith
The config file for Wintersmith is at `./config.json`. [Nunjucks](http://mozilla.github.io/nunjucks/) is included for the templating language.

***
Heavily inspired from https://github.com/davidtucker/davidtucker-blog
