module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs : {
            compile : {
                options : {
                    appDir  : "src/v-1/js",
                    baseUrl : "./",
                    dir     : "target/dest",
                    paths   : {
                        "v1" : "modules"
                    },
                    optimize : "uglify",
                    uglify : {
                        ascii_only : true
                    },
                    preserveLicenseComments: true,
                    findNestedDependencies: true,
                    optimizeCss: "standard.keepLines",
                    preserveLicenceComments : true,
                    modules : [
                        {
                            name : "v1/daterange/daterange",
                            exclude : [
                                'v1/jquery',
                                'v1/jquery-ui',
                                'v1/i18n',
                                'nls/daterange'
                            ]
                        }
                    ]
                }
            }
        },
        jshint : {
            files : ["src/v-1/js/modules/**/*.js"],
            options : {
                "browser":  true,
                "eqeqeq":   true,
                "curly":    true,
                "forin":    true,
                "immed":    true,
                "latedef":  true,
                "undef":     true,
                "unused":    true,
                "trailing":  true,
                "strict":    true,
                "smarttabs": true,
                "maxlen":    200,
                "indent":    4,
                "evil":     true,
                "white":    true,
                "globals" : {
                    "define" : true,
                    "require" : true
                },
                // ignore libs and known legacy issues
                ignores : [
                    "src/v-1/js/modules/query.js"
                ],
                reporter : "checkstyle",
                reporterOutput : "target/jshint/jshint-results.xml"
            }
        },
        mocha_phantomjs : {
            all : [
                "test/mocha/**/*.html"
            ],
            options : {
                "reporter" : "xunit",
                "output" : "target/mocha/results/result.xml"
            }
        }
    });
    // load tasks
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');
    // Default task(s).
    grunt.registerTask('default', ['jshint', 'mocha_phantomjs', 'requirejs']);
};