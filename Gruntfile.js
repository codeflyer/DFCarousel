/*jshint camelcase: false */
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
        hostname: 'localhost'
        //keepalive: true
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
      protractor: {
        options: {
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
            'drop_console': true,
            'join_vars': true
          },
          beautify: {
            'ascii_only': true,
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
    },
    protractor: {
      options: {
        keepAlive: true,
        configFile: 'test/protractor.conf.js'
      },
      run: {}
    }
  });

  grunt.registerTask('default', ['jshint', 'jscs', 'datauri', 'libsass']);

  grunt.registerTask('test', [
    'clean:server',
    'connect:protractor',
    'connect:test',
    'karma',
    'protractor:run'
  ]);

  grunt.registerTask('dist', [
    'clean:dist', 'jshint', 'jscs', 'datauri',
    'libsass', 'ngAnnotate', 'uglify:ngProd', 'libsass:dist']);
}
;
