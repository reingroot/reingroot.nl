module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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
                reporterOutput : "test/target/jshint/jshint-results.xml"
            }
        },

        mocha_phantomjs : {
            all : [
                "test/mocha/**/*.html"
            ],
            options : {
                "reporter" : "xunit",
                "output" : "test/target/mocha/results/result.xml"
            }
        }

//        requirejs : {
//            compile : {
//                options : {
//                    appDir  : "js",
//                    baseUrl : "../",
//                    dir     : "test/target/dest",
//                    paths   : {
//                        "mods" : "../js/modules",
//                        "vendor" : "../js/vendor"
//                    },
//                    optimize : "uglify",
//                    uglify : {
//                        ascii_only : true
//                    },
//                    preserveLicenseComments: true,
//                    findNestedDependencies: true,
//                    optimizeCss: "standard.keepLines",
//                    preserveLicenceComments : true,
//                    modules : [
//                        {
//                            name :
//                                'mods/active-link-higlighter',
//                            exclude : [
//                                'vendor/jquery.ba-bbq.js',
//                                'vendor/jquery.ba-bbq.min.js',
//                                'vendor/modernizr-2.6.2.min.js',
//                                'jquery.js',
//                                'require.js'
//                            ]
//                        },
//                        {
//                            name :
//                                'mods/item-loader',
//                            exclude : [
//                                'vendor/jquery.ba-bbq.js',
//                                'vendor/jquery.ba-bbq.min.js',
//                                'vendor/modernizr-2.6.2.min.js',
//                                'jquery.js',
//                                'require.js'
//                            ]
//                        }
//                    ]
//                }
//            }
//        }
    });

    // load tasks
//    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');

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
    grunt.registerTask('default', ['jshint', 'mocha_phantomjs', 'requirejs']);

    // Task to be run by pre-commit hook
    grunt.registerTask('test', ['jshint', 'install_hooks']);
};