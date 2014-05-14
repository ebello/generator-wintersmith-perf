module.exports = function (grunt) {
  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
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
    clean: {
      build: [
        'build'
      ]
    },
    connect: {
      options: {
        base: 'build/',
        hostname: '0.0.0.0'
      },
      devserver: {
        options: {
          port: 8888
        }
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
    jshint: {
      client: [
        'scripts/client/*.js',
        'Gruntfile.js'
      ]
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
          style: 'nested'
        }
      },
      prod: {
        files: '<%= sass.dev.files %>',
        options: {
          style: 'compressed'
        }
      }
    },
    aws: grunt.file.exists('.grunt-aws.json') ? grunt.file.readJSON('.grunt-aws.json') : {},
    s3: {
      options: {
        key: '<%= aws.key %>',
        secret: '<%= aws.secret %>',
        access: 'public-read'
      },
      staging: {
        options: {
          bucket: '[INSERT STAGING BUCKET HERE]'
        },
        upload: [
          {
            // CSS
            src: 'build/**/*.css',
            dest: '/',
            rel: 'build',
            options: {
              gzip: true,
              headers: {
                // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
                "Cache-Control": "private",
                "Expires": new Date(Date.now() + 63072000000).toUTCString()
              }
            }
          },
          {
            // JS
            src: 'build/**/*.js',
            dest: '/',
            rel: 'build',
            options: {
              gzip: true,
              headers: {
                // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
                "Cache-Control": "private",
                "Expires": new Date(Date.now() + 63072000000).toUTCString()
              }
            }
          },
          {
            // SVG
            src: 'build/**/*.svg',
            dest: '/',
            rel: 'build',
            options: {
              gzip: true,
              headers: {
                // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
                "Cache-Control": "private",
                "Expires": new Date(Date.now() + 63072000000).toUTCString()
              }
            }
          },
          {
            // ICO
            src: 'build/**/*.ico',
            dest: '/',
            rel: 'build',
            options: {
              headers: {
                // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
                "Expires": new Date(Date.now() + 63072000000).toUTCString()
              }
            }
          },
          {
            // PNG
            src: 'build/**/*.png',
            dest: '/',
            rel: 'build',
            options: {
              gzip: true,
              headers: {
                // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
                "Expires": new Date(Date.now() + 63072000000).toUTCString()
              }
            }
          },
          {
            // JPG
            src: 'build/**/*.jpg',
            dest: '/',
            rel: 'build',
            options: {
              gzip: true,
              headers: {
                // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
                "Expires": new Date(Date.now() + 63072000000).toUTCString()
              }
            }
          },
          {
            // GIF
            src: 'build/**/*.gif',
            dest: '/',
            rel: 'build',
            options: {
              gzip: true,
              headers: {
                // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
                "Expires": new Date(Date.now() + 63072000000).toUTCString()
              }
            }
          },
          {
            // HTML
            src: 'build/**/*.html',
            dest: '/',
            rel: 'build',
            options: {
              gzip: true
            }
          },
          {
            // JSON
            src: 'build/**/*.json',
            dest: '/',
            rel: 'build',
            options: {
              gzip: true
            }
          },
        ]
      },
      production: {
        options: {
          bucket: '[INSERT PRODUCTION BUCKET HERE]'
        },
        upload: '<%= s3.staging.upload %>'
      }
    },
    watch: {
      options : {
        livereload: true
      },
      css: {
        files: ['styles/**/*.scss'],
        tasks: ['sass:dev', 'autoprefixer']
      },
      html: {
        files: ['contents/**', 'templates/**'],
        tasks: ['wintersmith:build']
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
        tasks: ['jshint', 'browserify']
      },
      jsvendor: {
        files: ['scripts/**/*.js', '!scripts/client/**/*.js'],
        tasks: ['copy:js']
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

  grunt.registerTask('build-common', ['clean', 'wintersmith:build', 'browserify', 'copy']);

  grunt.registerTask('dev', ['build-common', 'sass:dev', 'autoprefixer', 'connect:devserver', 'watch']);

  grunt.registerTask('deploy:staging', ['deploy:prepare', 's3:staging']);
  grunt.registerTask('deploy:production', ['deploy:prepare', 's3:production']);
  grunt.registerTask('deploy:test', ['deploy:prepare', 'connect:deploytest']);
  grunt.registerTask('deploy:prepare', ['newer:imagemin', 'build-common', 'sass:prod', 'autoprefixer', 'uglify', 'hashres', 'htmlmin']);
};
