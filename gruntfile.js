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
        },

        requirejs : {
            compile : {
                options : {
                    appDir  : "./",
                    baseUrl : "./js/modules",
                    dir     : "test/target/build",
                    paths   : {
                        "mods" : "",
                        "ven" : "vendor"
                    },
                    preserveLicenseComments: true,
                    findNestedDependencies: true,
                    optimizeCss: "standard.keepLines",
                    preserveLicenceComments : true,
                    modules : [{
                        name :
                            'mods/active-link-highlighter',
                        exclude : [
                            'ven/jquery.ba-bbq',
                            'jquery'
                        ]
                    },
                    {
                        name :
                            'mods/item-loader',
                        exclude : [
                            'ven/jquery.ba-bbq',
                            'jquery'
                        ]
                    },
                    {
                        name :
                            'mods/fixed-main-nav',
                        exclude : [
                            'ven/viewport',
                            'jquery'
                        ]
                    }]
                }
            }
        }
    });

    // load tasks
//    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');

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