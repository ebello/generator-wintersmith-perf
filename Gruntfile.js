module.exports = function (grunt) {
  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    config: grunt.file.exists('config.json') ? grunt.file.readJSON('config.json') : {},
    autoprefixer: {
      multiple_files: {
        expand: true,
        cwd: 'build/',
        src: ['**/*.css'],
        dest: 'build/'
      }
    },
    browserify: {
      // vendor: {
      //   src: [],
      //   dest: 'public/vendor.js',
      //   options: {
      //     require: ['jquery'],
      //     alias: ['./lib/moments.js:momentWrapper']
      //   }
      // },
      client: {
        src: ['scripts/client/**/*.js'],
        dest: 'build/assets/main.js'
        // options: {
        //   external: ['jQuery', 'momentWrapper']
        // }
      }
    },
    browserSync: {
      dev: {
        options: {
          open: false,
          server: {
            baseDir: "build"
          },
          watchTask: true
        }
      }
    },
    bsReload: {
      css: {
        reload: "all.css"
      },
      all: {
        reload: true
      }
    },
    clean: {
      build: [
        'build'
      ],
      gzip: [
        'build/**/*.gz'
      ]
    },
    cdn_static_assets: {
      options: {
        cdn: '<%= config.locals.cdn %>',
        directory: 'build',
        staticAssetExtensions: ['css', 'js', 'ico', 'jpg', 'png', 'gif', 'svg', 'mp4', 'webm']
      },
      production: {
        files: [{
          expand: true,
          cwd: 'build',
          src: '**/*.{css,html}',
          dest: 'build'
        }]
      }
    },
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        files: [
          {
            cwd: 'build',
            expand: true,
            src: ['**/*.css', '**/*.js', '**/*.svg', '**/*.html', '**/*.json'],
            dest: 'build/',
            rename: function(dest, src) {
              return dest + src + '.gz';
            }
          }
        ]
      }
    },
    connect: {
      options: {
        base: 'build/',
        hostname: '0.0.0.0'
      },
      deploytest: {
        options: {
          port: 8888,
          keepalive: true
        }
      }
    },
    copy: {
      js: {
        files: [
          {expand: true, cwd: 'scripts/', src: ['**/*.js', '!client/**/*.js'], dest: 'build/assets/'}
        ]
      },
      assets: {
        files: [
          {expand: true, cwd: 'assets/', src: ['**'], dest: 'build/assets/'},
        ]
      },
      gzip: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'build',
            dest: 'build/',
            src: ['**/*.css.gz', '**/*.js.gz', '**/*.svg.gz', '**/*.html.gz', '**/*.json.gz'],
            rename: function(dest, src) {
              return dest + src.replace(/\.gz/, '');
            }
          }
        ]
      }
    },
    hashres: {
      options: {
        fileNameFormat: '${name}.${hash}.${ext}',
        renameFiles: true
      },
      css: {
        src: [ 'build/**/*.css' ],
        dest: ['build/**/*.html', 'build/**/*.json']
      },
      js: {
        src: [ 'build/**/*.js' ],
        dest: 'build/**/*.html'
      },
      images: {
        src: [
          'build/**/*.png',
          'build/**/*.jpg',
          'build/**/*.svg',
          'build/**/*.ico'
        ],
        dest: [
          'build/**/*.html',
          'build/**/*.js',
          'build/**/*.css',
          'build/**/*.md',
          'build/**/*.json'
        ]
      }
    },
    htmllint: {
      all: ["build/**/*.html"]
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
          minifyCSS: true
        },
        files: [{
          expand: true,
          cwd: 'build/',
          src: ['**/*.html'],
          dest: 'build/'
        }]
      }
    },
    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'assets/',
            src: ['**/*.{png,jpg,gif,svg}'],
            dest: 'assets/'
          }
        ]
      }
    },
    inline: {
      main: {
        options: {
          root: 'build/'
        },
        files: [{
          expand: true,
          cwd: 'build/',
          src: ['**/*.html'],
          dest: 'build/'
        }]
      }
    },
    jshint: {
      client: [
        'scripts/client/*.js',
        'Gruntfile.js'
      ]
    },
    // options: https://github.com/jrcryer/grunt-pagespeed
    pagespeed: {
      options: {
        locale: "en_US",
        nokey: true,
        strategy: "desktop",
        url: '<%= config.locals.url %>'
      },
      paths: {
        options: {
          paths: ["/index.html"],
          threshold: 80
        }
      }
    },
    responsive_images: {
      resize_2x_images: {
        options: {
          sizes: [{
            width: '50%',
            rename: false
          }]
        },
        files: [{
          expand: true,
          src: ['**/2x/*.{jpg,gif,png}'],
          cwd: 'assets/',
          dest: 'assets/',
          rename: function(dest, src) {
            return dest + src.replace('2x/', '');
          }
        }]
      },
    },
    sass: {
      dev: {
        files: [{
          expand: true,
          cwd: 'styles/',
          src: ['**/*.scss'],
          dest: './build/assets',
          ext: '.css'
        }],
        options: {
          outputStyle: 'nested'
        }
      },
      prod: {
        files: '<%= sass.dev.files %>',
        options: {
          outputStyle: 'compressed',
          // sourcemap: 'none'
        }
      }
    },
    aws: grunt.file.exists('.grunt-aws.json') ? grunt.file.readJSON('.grunt-aws.json') : {},
    aws_s3: {
      options: {
        accessKeyId: '<%= aws.key %>',
        secretAccessKey: '<%= aws.secret %>',
        access: 'public-read',
        differential: true,
        debug: false
      },
      staging: {
        options: {
          bucket: '[INSERT STAGING BUCKET HERE]'
        },
        files: [
          {
            // add far future expires and gzip headers for all JS, CSS, and SVG files
            // cache-control private headers are added to get around proxy issues. AWS won't be serving non-gzipped versions so the Vary header doesn't apply. More info: http://code.google.com/speed/page-speed/docs/caching.html#LeverageProxyCaching
            expand: true,
            cwd: 'build',
            src: ['**/*.css', '**/*.js', '**/*.svg'],
            dest: '',
            params: {
              // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
              CacheControl: 'private',
              Expires: new Date(Date.now() + 63072000000),
              ContentEncoding: 'gzip'
            }
          },
          {
            // add far future expires header for all images
            expand: true,
            cwd: 'build',
            src: ['**/*.ico', '**/*.png', '**/*.jpg', '**/*.gif'],
            dest: '',
            params: {
              // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
              Expires: new Date(Date.now() + 63072000000)
            }
          },
          {
            // add gzip headers for all html and json files
            expand: true,
            cwd: 'build',
            src: ['**/*.html', '**/*.json'],
            dest: '',
            params: {
              ContentEncoding: 'gzip'
            }
          },
          {
            // upload anything else
            expand: true,
            cwd: 'build',
            src: ['**', '!**/*.css', '!**/*.js', '!**/*.svg', '!**/*.ico', '!**/*.png', '!**/*.jpg', '!**/*.gif', '!**/*.html', '!**/*.json'],
            dest: ''
          },
          {
            // delete files that were removed
            // expand: true,
            cwd: 'build',
            // src: ['**'],
            dest: '/',
            differential: true,
            action: 'delete'
          }
        ]
      },
      production: {
        options: {
          bucket: '[INSERT PRODUCTION BUCKET HERE]'
        },
        files: '<%= aws_s3.staging.files %>'
      }
    },
    watch: {
      options : {
        // livereload: true
        spawn: false
      },
      css: {
        files: ['styles/**/*.scss'],
        tasks: ['sass:dev', 'autoprefixer', 'bsReload:css']
      },
      html: {
        files: ['contents/**', 'templates/**'],
        tasks: ['wintersmith:build', 'bsReload:all']
      },
      images2x: {
        files: ['assets/**/2x/*.{png,jpg,gif,svg}'],
        tasks: ['newer:responsive_images:resize_2x_images']
      },
      // images: {
      //   files: ['assets/**/*.{png,jpg,gif,svg}'],
      //   tasks: ['newer:imagemin']
      // },
      jsclient: {
        files: ['scripts/client/**/*.js'],
        tasks: ['jshint', 'browserify', 'bsReload:all']
      },
      jsvendor: {
        files: ['scripts/**/*.js', '!scripts/client/**/*.js'],
        tasks: ['copy:js', 'bsReload:all']
      }
    },
    uglify: {
      production: {
        // options: {
        //   mangle: false
        // },
        files: [{
          expand: true,
          cwd: 'build/assets/',
          src: ['**/*.js', '!**/*.min.js'],
          dest: 'build/assets/',
        }],
      }
    },
    wintersmith: {
      build: {
        options: {
          config: './config.json'
        }
      },
      // production: {
      //   options: {
      //     config: './config-production.json'
      //   }
      // },
      preview: {
        options: {
          action: "preview",
          config: './config.json'
        }
      }
    }
  });

  // Grunt Tasks
  grunt.registerTask('default', ['dev']);

  grunt.registerTask('build-common', ['clean:build', 'wintersmith:build', 'browserify', 'copy:assets', 'copy:js']);

  grunt.registerTask('dev', ['build-common', 'sass:dev', 'autoprefixer', 'browserSync', 'watch']);

  grunt.registerTask('test:pagespeed', ['pagespeed']);
  grunt.registerTask('test:validhtml', ['deploy:prepare', 'htmllint']);

  grunt.registerTask('gzip', ['compress', 'copy:gzip', 'clean:gzip']);
  grunt.registerTask('deploy:staging', ['deploy:prepare', 'gzip', 'aws_s3:staging']);
  grunt.registerTask('deploy:production', ['deploy:prepare', 'gzip', 'aws_s3:production']);
  grunt.registerTask('deploy:test', ['deploy:prepare', 'connect:deploytest']);
  grunt.registerTask('deploy:prepare', ['newer:imagemin', 'build-common', 'sass:prod', 'autoprefixer', 'uglify', 'inline', 'hashres', 'cdn_static_assets', 'htmlmin']);
};
