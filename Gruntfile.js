var compression = require('compression');

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-wrap');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: {
                    targetDir: 'src/lib',
                    layout: 'byComponent'
                }
            }
        },
        wrap: {
            jquery: {
                files: {
                    'src/lib/bootstrap/bootstrap.amd.js': 'src/lib/bootstrap/bootstrap.js',
                    'src/lib/flot/jquery.flot.amd.js': 'src/lib/flot/jquery.flot.js',
                    'src/lib/jqgrid/grid.locale-en.amd.js': 'src/lib/jqgrid/grid.locale-en.js'
                },
                options: {
                    wrapper: ['require(["jquery"], function(jQuery) {\n', '\n});']
                }
            },
            jqgrid: {
                files: {
                    'src/lib/jqgrid/jquery.jqGrid.amd.js': 'src/lib/jqgrid/jquery.jqGrid.js'
                },
                options: {
                    wrapper: ['require(["jquery", "jquery-ui"], function(jQuery) {\n', '\n});']
                }
            },
            flot: {
                files: {
                    'src/lib/flot/jquery.flot.navigate.amd.js': 'src/lib/flot/jquery.flot.navigate.js',
                    'src/lib/flot/jquery.flot.resize.amd.js': 'src/lib/flot/jquery.flot.resize.js',
                    'src/lib/flot/jquery.flot.time.amd.js': 'src/lib/flot/jquery.flot.time.js',
                    'src/lib/flot.tooltip/jquery.flot.tooltip.amd.js': 'src/lib/flot.tooltip/jquery.flot.tooltip.js',
                },
                options: {
                    wrapper: ['require(["jquery", "flot"], function(jQuery) {\n', '\n});']
                }
            }
        },
        jshint: {
            files: ['src/**/*.js', '!src/lib/**', 'examples/**/*.js'],
            options: {
                reporter: require('jshint-stylish')
            }
        },
        requirejs: {
            options: {
                'appDir': 'src/',
                'baseUrl': 'js/',
                'dir': 'dist/',
                'mainConfigFile': 'src/js/main.js',
                'removeCombined': true,
                'logLevel': 0,
                'wrapShim': true,
                'optimize': 'uglify2' // 'uglify2' 'none'
            },
            main: {
                options: {
                    'paths': {
                        'requireLib': "../lib/requirejs/require"
                    },
                    'modules': [
                        {
                            'name': 'leaflet-label',
                            'exclude': [
                                'css',
                                'leaflet'
                            ]
                        },
                        {
                            'name': 'leaflet',
                            'include': [
                                'leaflet'
                            ],
                            'exclude': [
                                'css'
                            ]
                        },
                        {
                            'name': 'SensorWidgets',
                            'create': true,
                            'include': [
                                'requireLib',
                                'main',
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'i18n',
                                'SensorWidget',
                                'css',
                                'text'
                            ]
                        },{
                            'name': 'widget/compass',
                            'include': [
                                'widget/compass'
                            ],
                            'exclude': [
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'i18n',
                                'css',
                                'text'
                            ]
                        },{
                            'name': 'widget/gauge',
                            'include': [
                                'widget/gauge'
                            ],
                            'exclude': [
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'i18n',
                                'css',
                                'text'
                            ]
                        },{
                            'name': 'widget/status',
                            'include': [
                                'widget/status'
                            ],
                            'exclude': [
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'i18n',
                                'css',
                                'text'
                            ]
                        },{
                            'name': 'widget/jqgrid',
                            'include': [
                                'widget/jqgrid'
                            ],
                            'exclude': [
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'i18n',
                                'css',
                                'text',
                                'jqgrid',
                                'jquery'
                            ]
                        },{
                            'name': 'widget/map',
                            'include': [
                                'widget/map'
                            ],
                            'exclude': [
                                'leaflet',
                                'leaflet-label',
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'i18n',
                                'css',
                                'text',
                                'widget/panel'
                            ]
                        },{
                            'name': 'widget/panel',
                            'include': [
                                'widget/panel'
                            ],
                            'exclude': [
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'i18n',
                                'css',
                                'text'
                            ]
                        },{
                            'name': 'widget/progressbar',
                            'include': [
                                'widget/progressbar'
                            ],
                            'exclude': [
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'i18n',
                                'css',
                                'text'
                            ]
                        },{
                            'name': 'widget/table',
                            'include': [
                                'widget/table'
                            ],
                            'exclude': [
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'i18n',
                                'css',
                                'text'
                            ]
                        },{
                            'name': 'widget/thermometer',
                            'include': [
                                'widget/thermometer'
                            ],
                            'exclude': [
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'i18n',
                                'css',
                                'text'
                            ]
                        },{
                            'name': 'widget/timechart',
                            'include': [
                                'widget/timechart'
                            ],
                            'exclude': [
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'i18n',
                                'css',
                                'text',
                                'jquery'
                            ]
                        },{
                            'name': 'widget/windrose',
                            'include': [
                                'widget/windrose'
                            ],
                            'exclude': [
                                'XML',
                                'SOS',
                                'sos-data-access',
                                'widget-common',
                                'locale-date',
                                'i18n',
                                'css',
                                'text',
                                'jquery'
                            ]
                        }
                    ]
                }
            }
        },
        connect: {
            server: {
                options: {
                    hostname: "localhost",
                    port: 8081,
                    livereload: true,
                    middleware: function(connect, options, middlewares) {
                        middlewares.unshift(compression());
                        return middlewares;
                    }
                }
            }
        },
        watch: {
            files: ['src/**', '!src/lib/**', 'examples/**'],
            tasks: ['jshint'],
            options: {
                livereload: true,
                nospawn: true
            }
        },
        'gh-pages': {
            options: {
                base: 'dist',
                message: 'Auto-generated gh-pages commit',
                push: true,
                only: ['**/*', '!CNAME']
            },
            src: ['**/*']
        },
        processhtml: {
            processhtml: {
                expand: true,
                src: 'dist/**/*.html'
            }
        },
        clean: ["src/lib", "dist"]
    });

    var path = require('path');
    grunt.event.on('watch', function(action, filepath) {
        if (path.extname(filepath) != ".js") {
            filepath = [];
        }
        grunt.config('jshint.files', filepath);
    });

    grunt.registerTask('fetch', ['clean', 'bower', 'wrap']);
    grunt.registerTask('default', ['connect', 'watch']);
    grunt.registerTask('build', ['fetch', 'requirejs', 'processhtml']);
    grunt.registerTask('publish', ['build', 'gh-pages']);

};
