module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: ["js/<%= pkg.version %>"]
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
                    appDir: "./js",
                    baseUrl: "./modules",
                    dir: "test/target/build/<%= pkg.version %>",
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

        copy: {
            files: {
                cwd: 'test/target/build/<%= pkg.version %>',    // set working folder / root to copy
                src: '**/*',                                    // copy all files and subfolders
                dest: 'js/<%= pkg.version %>',                  // destination folder
                expand: true                                    // required when using cwd
            }
        },

        replace: {
            bump_version_js_source: {
                src: ['js/main.js'],
                overwrite: true,                 // overwrite matched source files
                replacements: [{
                    from: "'mods': 'modules'",
                    to: "'mods': '<%= pkg.version %>/modules'"
                },
                {
                    from: "'ven': 'vendor'",
                    to: "'ven': '<%= pkg.version %>/vendor'"
                }]
            },
            bump_version_php_header: {
                src: ['application/views/header.php'],
                overwrite: true,                 // overwrite matched source files
                replacements: [{
                    from: "js/vendor/modernizr.js",
                    to: "/js/<%= pkg.version %>/vendor/modernizr.js"
                }]
            }
        }
    });

    // load tasks
//    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');

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
        'clean:build',
//        'mocha_phantomjs',
        'jshint'
    ]);

    // Task to be run by deploy build process
    grunt.registerTask('deploy', [
        'clean:build',
//        'mocha_phantomjs',
        'jshint',
        'requirejs',
        'copy',
        'uglify',
        'replace'
    ]);
};