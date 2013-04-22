// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: '',
        dist: 'dist'
    };

    grunt.initConfig({
        watch: {
            // compass watches .scss files
            compass: {
                files: ['sass/{,*/}*.{scss,sass}'],
                tasks: ['compass:server']
            },
            // livereload watches html and css
            // install the chrome plugin:
            // https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&ved=0CDUQFjAA&url=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Flivereload%2Fjnihajbhpnppcggbcgedagnkighmdlei%3Fhl%3Den&ei=C6F1UdbhN4WIOLzEgcgE&usg=AFQjCNE3uLWl-7EsJ9SPxfbqp4JErdhiTQ&sig2=O0j1IJJE6nPq3HelVknK0Q&bvm=bv.45512109,d.ZWU
            livereload: {
                files: [
                    './*.html',
                    'styles/{,*/}*.css'
                ],
                tasks: ['livereload']
            }
        },
        // connect is a node.js webserver
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, './'),
                            mountFolder(connect, 'styles')
                        ];
                    }
                }
            }
        },
        // by default open this file in the browser
        open: {
            server: {
                path: 'http://localhost:9000/bootstrap.html'
            }
        },
        compass: {
            options: {
                sassDir: 'sass',
                cssDir: 'styles',
                imagesDir: 'images',
                fontsDir: 'styles/fonts',
                importPath: 'components',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: false
                }
            }
        },
        // async web server
        concurrent: {
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:dist'
            ]
        }
    });

    // watch has been superceded by regarde but keep the same name
    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', function (target) {
        // not currently doing a dist, so this won't happen
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'concurrent:server',
            'livereload-start',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    // not using this yet
    grunt.registerTask('build', [
        'concurrent:dist'
    ]);

    grunt.registerTask('default', [
        'server'
    ]);
};

