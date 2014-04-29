module.exports = function(grunt) {

    var path = require('path');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        compass: {

            production: {
                options: {
                    sassDir: 'assets/sass',
                    cssDir: 'public/css/',
                    imagesDir: 'public/img',
                    httpImagesPath: '/images/',
                    specify: 'assets/sass/style.scss',
                    relativeAssets: true,
                    environment: 'development'
                }
            }

        },

        concat: {
            dist: {
                src: [
                    //angular
                    'assets/js/socialChallengeApp.js', 
                    'assets/js/controllers/*.js', 
                    'assets/js/services/*.js'
                ],
                dest: 'public/js/angular.js'
            }
        },

        jshint: {
            options: grunt.file.readJSON('.jshintrc'),
            javascripts: {
                src: [
                    'assets/js/custom.js'
                ]
            },
            beforeconcat: [
                //angular
                'assets/js/socialChallengeApp.js', 
                'assets/js/controllers/*.js', 
                'assets/js/services/*.js'
                ],
            afterconcat: [
                'public/js/angular.js'
                ]
        },

        uglify: {

            app: {
                files: {
                    'public/js/app.js' : [
                        //libs
                        'assets/js/angularjs/angular.min.js',
                        'assets/js/angularjs/angular-route.min.js',
                        'assets/js/jquery/jquery-1.10.2.min.js',
                        //bootstrap
                        'assets/js/bootstrap.js',
                        //flat-ui
                        'assets/js/flat-ui/application.js',
                        'assets/js/flat-ui/flatui-checkbox.js',
                        'assets/js/flat-ui/flatui-radio.js',
                        'assets/js/flat-ui/jquery-ui-1.10.3.custom.min.js',
                        //custom
                        'assets/js/custom.js'
                    ]
                }
            }
        },

        copy: {
            jsfiles: {
                files: [{
                        expand: true, 
                        flatten: true, 
                        src: [
                        'assets/js/html5shiv.js', 
                        'assets/js/respond.min.js'
                        ], 
                        dest: 'public/js/', 
                        filter: 'isFile'
                    }]
            }       
        },
        jasmine: {
            test: {
                src: 'assets/tests/scripts/*.js',
                    options: {
                        vendor: [
                        'assets/js/jquery/jquery-1.10.2.min.js',
                        'assets/tests/vendor/jasmine-jquery.js'
                        ],
                        specs: 'assets/tests/specs/*.spec.js'
        }
    }
}
 
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-concat');
    
    /* the default task can be run just by typing 'grunt' on the command line */
    grunt.registerTask('default', ['css-prod']);

    grunt.registerTask(
        'css-prod',[
            'compass:production',
            'concat',
            'jshint', 
            'uglify:app',
            'copy:jsfiles',
            'jasmine'
            ]
    );
    
};
