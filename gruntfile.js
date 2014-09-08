module.exports = function (grunt) {
    'use strict';

    var globalConfig = {
        target: 'test/target' // build dir
    };

    // Project configuration.
    grunt.initConfig({
        globalConfig: globalConfig,
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            pre_build: ["js/<%= pkg.version %>", "css/"],
            post_build: ["<%= globalConfig.target %>/build/"]
        },

        jshint : {
            files : ["./js/**/*.js"],
            options : {
                "jshintrc": "./.jshintrc",
                // ignore libs and known legacy issues
                ignores : [
                    "./js/jquery.js",
                    "./js/require.js",
                    "./js/vendor/*"
                ],
                reporter : "checkstyle",
                reporterOutput : "<%= globalConfig.target %>/jshint/jshint-results.xml"
            }
        },

        mocha_phantomjs : {
            all : [
                "test/mocha/**/*.html"
            ],
            options : {
                "reporter" : "xunit",
                "output" : "<%= globalConfig.target %>/mocha/results/result.xml"
            }
        },

        requirejs : {
            compile : {
                options : {
                    appDir: "./js",
                    baseUrl: "./modules",
                    dir: "<%= globalConfig.target %>/build/<%= pkg.version %>",
                    paths: {
                        "mods": "",
                        "ven": "../vendor"
                    },
                    preserveLicenseComments: true,
                    findNestedDependencies: true,
                    optimizeCss: "standard.keepLines",
                    preserveLicenceComments: true,
                    optimize: "none",
                    modules: [
                        {
                            name: 'mods/active-link-highlighter',
                            exclude: [
                                'ven/jquery.ba-bbq',
                                'ven/jquery'
                            ]
                        },
                        {
                            name: 'mods/item-loader',
                            exclude: [
                                'ven/jquery.ba-bbq',
                                'ven/jquery'
                            ]
                        },
                        {
                            name: 'mods/fixed-main-nav',
                            exclude: [
                                'ven/viewport',
                                'ven/jquery'
                            ]
                        },
                        {
                            name: '../main',
                            exclude: [
                                'ven/jquery'
                            ]
                        }
                    ]
                }
            }
        },

        uglify: {
            my_target: {
                options: {
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: 'js/<%= pkg.version %>',
                    src: '**/*.js',
                    dest: 'js/<%= pkg.version %>'
                }]
            }
        },

        sass: {
            dist: {
                files: {
                    'css/<%= pkg.version %>/main.css': 'scss/main.scss',
                    'css/<%= pkg.version %>/normalize.css': 'scss/normalize.scss'
                }
            }
        },

        copy: {
            files: {
                cwd: '<%= globalConfig.target %>/build/<%= pkg.version %>',    // set working folder / root to copy
                src: '**/*',                                    // copy all files and subfolders
                dest: 'js/<%= pkg.version %>',                  // destination folder
                expand: true                                    // required when using cwd
            }
        },

        replace: {
            insert_version: {
                src: ['js/main.js', 'application/views/header.php'],
                overwrite: true,                 // overwrite matched source files
                replacements: [{
                    from: "'mods': 'modules'",
                    to: "'mods': '<%= pkg.version %>/modules'"
                },
                {
                    from: "'ven': 'vendor'",
                    to: "'ven': '<%= pkg.version %>/vendor'"
                },
                {
                    from: "js/vendor/modernizr.js",
                    to: "js/<%= pkg.version %>/vendor/modernizr.js"
                },
                {
                    from: "?>css/",
                    to: "?>css/<%= pkg.version %>/"
                }]
            },
            reset_version: {
                src: ['js/main.js', 'application/views/header.php'],
                overwrite: true,                 // overwrite matched source files
                replacements: [{
                    from: "'mods': '<%= pkg.version %>/modules'",
                    to: "'mods': 'modules'"
                },
                {
                    from: "'ven': '<%= pkg.version %>/vendor'",
                    to: "'ven': 'vendor'"
                },
                {
                    from: "js/<%= pkg.version %>/vendor/modernizr.js",
                    to: "js/vendor/modernizr.js"
                },
                {
                    from: "?>css/<%= pkg.version %>/",
                    to: "?>css/"
                }]
            }
        }
    });

    // load tasks
    require('load-grunt-tasks')(grunt);

    // Install the git hooks
    grunt.registerTask('install_hooks', function () {
        var fs = require('fs');

        // my precommit hook is inside the repo as /hooks/pre-commit
        // copy the hook file to the correct place in the .git directory
        grunt.file.copy('hooks/pre-commit', '.git/hooks/pre-commit');

        // chmod the file to readable and executable by all
        fs.chmodSync('.git/hooks/pre-commit', '755');
    });

    // Default task
    grunt.registerTask('default', [
        'jshint',
        'mocha_phantomjs',
        'requirejs'
    ]);

    // Task to be run by pre-commit hook
    grunt.registerTask('precommit', [
        'install_hooks',
        'clean:pre_build',
//        'mocha_phantomjs',
        'jshint'
    ]);

    // Task to be run by deploy build process
    grunt.registerTask('deploy', [
        'clean:pre_build',
        'reset',
//        'mocha_phantomjs',
        'jshint',
        'requirejs',
        'sass:dist',
        'copy',
        'uglify',
        'replace:insert_version',
        'clean:post_build'
    ]);

    grunt.registerTask('reset', [
        'clean',
        'replace:reset_version'
    ]);
};