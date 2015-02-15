module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: {
      // Configurable paths
      app: 'src',
      dist: 'dist'
    },
    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            'dist/{,*/}*',
            '!dist/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: 'localhost',
        keepalive: true
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.',
            '<%= config.app %>',
            'sample',
            'dist'
          ]
        }
      },
      test: {
        options: {
          keepalive: false,
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                  '/bower_components',
                  connect.static('./bower_components')
              ),
              connect.static('<%= config.app %>')
            ];
          }
        }
      }
    },
    datauri: {
      default: {
        options: {
          classPrefix: 'data-'
        },
        src: [
          'src/assets/images/*.png',
          'src/assets/images/*.jpg'
        ],
        dest: [
          'src/stylesheets/_images.scss'
        ]
      }
    },
    libsass: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/stylesheets/',
            src: ['*.scss', '!_*.scss'],
            dest: 'dist/',
            ext: '.css'
          }
        ]
      },
      sample: {
        files: [
          {
            expand: true,
            cwd: 'src/stylesheets/',
            src: ['*.scss', '!_*.scss'],
            dest: 'sample/styles/',
            ext: '.css'
          }
        ]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        force: true
      },
      all: ['Gruntfile.js', 'src/**/*.js']
    },
    jscs: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        config: '.jscsrc'
      }
    },
    plato: {
      options: {
        jshint: grunt.file.readJSON('.jshintrc')
      },
      main: {
        files: {
          'reports/plato/': ['src/**/*.js']
        }
      }
    },
    watch: {
      js: {
        files: ['test', 'sample/**/*', '<%= config.app %>/**/*.js'],
        tasks: ['jscs', 'jshint'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      css: {
        files: ['<%= config.app %>/stylesheets/**/*.scss'],
        tasks: ['libsass:sample'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      }
    },
    /*jshint camelcase: false */
    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    mocha_istanbul: {
      coveralls: {
        src: ['src/tests/**/*.spec.js'],
        options: {
          coverage: true,
          check: {
            lines: 75,
            statements: 75
          },
          root: './src/app',
          reportFormats: ['cobertura', 'lcovonly', 'html']
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
          require: 'tests/index.js'
        },
        src: ['tests/**/test.*.js']
      }
    },
    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },
    ngAnnotate: {
      app: {
        files: {
          'dist/dfcarousel.js': ['src/app/carousel.module.js', 'src/app/**/*.js']
        }
      }
    },
    uglify: {
      ngProd: {
        options: {
          mangle: true,
          compress: {
            drop_console: true,
            join_vars: true
          },
          beautify: {
            ascii_only: true,
            beautify: false
          },
          sourceMap: false,
          preserveComments: false,
          report: 'gzip',
          banner: '/**!\n * @Project: <%= pkg.name %>\n * ' +
          '@Author: Davide Fiorello\n * ' +
          '@Link: https://github.com/codeflyer\n * ' +
          '@License: MIT\n * ' +
          '@Date: <%= grunt.template.today("yyyy-mm-dd") %>\n * ' +
          '@Version: <%= pkg.version %>\n***/\n\n',
          footer: '\n'
        },
        files: [
          {
            src: 'dist/dfcarousel.js',
            dest: 'dist/dfcarousel.min.js'
          }
        ]
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'jscs', 'datauri', 'libsass']);

  grunt.registerTask('test', [
    'clean:server',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('cover', ['mocha_istanbul']);
  grunt.registerTask('dist', [
    'clean:dist', 'jshint', 'jscs', 'datauri',
    'libsass', 'test', 'ngAnnotate', 'uglify:ngProd', 'libsass:dist']);
}
;
