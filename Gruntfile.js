module.exports = function (grunt) {
  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
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
        'Gruntfile.js' ]
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
    watch: {
      options : {
        livereload: true
      },
      css: {
        files: ['styles/**/*.scss'],
        tasks: ['sass:dev']
      },
      html: {
        files: ['contents/**', 'templates/**'],
        tasks: ['wintersmith:build']
      },
      images: {
        files: ['assets/**/*.{png,jpg,gif,svg}'],
        tasks: ['newer:imagemin']
      },
      jsclient: {
        files: ['scripts/client/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      jsvendor: {
        files: ['scripts/**/*.js', '!scripts/client/**/*.js'],
        tasks: ['copy:js']
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
    },
    // shell: {
    //   bumpVersion: {
    //     command: 'npm version patch'
    //   }
    // },
    // uglify: {
    //   production: {
    //     files: {
    //       'build/js/app.min.js': 'build/js/app.min.js'
    //     }
    //   }
    // },

    // lineremover: {
    //   html: {
    //     files: [
    //       {
    //         expand: true,
    //         cwd: 'build/',
    //         src: ['**/*.html'],
    //         dest: 'build/',
    //         ext: '.html'
    //       }
    //     ]
    //   },
    //   xml: {
    //     files: [
    //       {
    //         expand: true,
    //         cwd: 'build/',
    //         src: ['**/*.xml'],
    //         dest: 'build/',
    //         ext: '.xml'
    //       }
    //     ]
    //   }
    // },
    // s3: {
    //   options: {
    //     key: process.env.AWS_ACCESS_KEY_ID,
    //     secret: process.env.AWS_SECRET_ACCESS_KEY,
    //     access: 'public-read'
    //   },
    //   staging: {
    //     options: {
    //       bucket: 'livestaging.davidtucker.net'
    //     },
    //     upload: [
    //       {
    //         src: 'build/**/*.*',
    //         dest: '/',
    //         rel: 'build'
    //       }
    //     ]
    //   },
    //   production: {
    //     options: {
    //       bucket: 'davidtucker.net'
    //     },
    //     upload: [
    //       {
    //         src: 'build/**/*.*',
    //         dest: '/',
    //         rel: 'build'
    //       }
    //     ]
    //   }
    // },
    // hashres: {
    //   options: {
    //     encoding: 'utf8',
    //     fileNameFormat: '${name}.${hash}.cache.${ext}',
    //     renameFiles: true
    //   },
    //   css: {
    //     options: {
    //     },
    //     src: [
    //       'build/js/app.min.js',
    //       'build/css/app.css',
    //       'build/css/normalize.css' ],
    //     dest: 'build/**/*.html'
    //   },
    //   js: {
    //     options: {
    //     },
    //     src: [
    //       'build/js/app.min.js',
    //       'build/css/app.css',
    //       'build/css/normalize.css' ],
    //     dest: 'build/**/*.html'
    //   },
    //   images: {
    //     options: {
    //     },
    //     src: [
    //       'build/**/*.png',
    //       'build/**/*.jpg'
    //     ],
    //     dest: [
    //       'build/**/*.html',
    //       'build/**/*.js',
    //       'build/**/*.css',
    //       'build/**/*.md'
    //     ]
    //   }
    // },
  });

  // Grunt Tasks

  grunt.registerTask('release', [
    'shell:bumpVersion'
  ]);

  // grunt.registerTask('dev', [
  //   'watch'
  // ]);
  grunt.registerTask('dev', ['clean', 'newer:imagemin', 'wintersmith:build', 'sass:dev', 'browserify', 'copy', 'connect:devserver', 'watch']);

  grunt.registerTask('cacheBust', [
    'hashres:images',
    'hashres:css',
    'hashres:js'
  ]);

  grunt.registerTask('preview', [
    'shell:previewSite'
  ]);

  grunt.registerTask('prebuild', [
    'clean:build',
    'browserify2',
    'compass:dist'
  ]);

  grunt.registerTask('postbuild', [
    'lineremover',
    'imagemin:dist',
    'uglify:production',
    'cacheBust',
    'cssmin:production'
  ]);

  grunt.registerTask('buildStaging', [
    'prebuild',
    'wintersmith:staging',
    'postbuild'
  ]);

  grunt.registerTask('buildProduction', [
    'prebuild',
    'wintersmith:production',
    'postbuild'
  ]);

  grunt.registerTask('deployStaging', [
    'buildStaging',
    's3:staging'
  ]);

  grunt.registerTask('deployProduction', [
    'buildProduction',
    's3:production',
    'release'
  ]);
};
