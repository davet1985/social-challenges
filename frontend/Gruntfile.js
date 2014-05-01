'use strict';
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
                    //environment: 'production'
                }
            }

        },

        concat: {
            dist: {
                src: [
                    //angular
                    'app/app.js', 
                    'app/controllers/*.js', 
                    'app/services/*.js'
                ],
                dest: 'public/js/app.js'
            }
        },

        jshint: {
            options: grunt.file.readJSON('.jshintrc'),
            beforeconcat: [
                //angular
                'app/app.js', 
                'app/controllers/*.js', 
                'app/services/*.js'
                ],
            afterconcat: [
                'public/js/app.js'
                ]
        },

        uglify: {
            core: {
                files: {
                    'public/js/core.js' : [
                        //libs
                        'assets/js/lib/angular.min.js',
                        'assets/js/lib/angular-route.min.js',
                        'assets/js/jquery/jquery-1.10.2.min.js',
                        //flat-ui js
                        'assets/js/flat-ui/ui-bootstrap.js',
                        //'assets/js/flat-ui/application.js',
                        'assets/js/flat-ui/flatui-checkbox.js',
                        'assets/js/flat-ui/flatui-radio.js',
                        'assets/js/flat-ui/jquery-ui-1.10.3.custom.min.js'
                    ]
                }
            },
             app: {
                files: {
                    'public/js/app.js' : [
                        'public/js/app.js'
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
                        'assets/js/shim/html5shiv.js', 
                        'assets/js/shim/respond.min.js'
                        ], 
                        dest: 'public/js/', 
                        filter: 'isFile'
                    }]
            },
             images: {
                files: [{
                        expand: true, 
                        flatten: true, 
                        src: [
                        'assets/img/*'
                        ], 
                        dest: 'public/img/', 
                        filter: 'isFile'
                    }]
            },
             fonts: {
                files: [{
                        expand: true, 
                        flatten: true, 
                        src: [
                        'assets/fonts/*/*'
                        ], 
                        dest: 'public/fonts/', 
                        filter: 'isFile'
                    }]
            }                         
        },
        jasmine: {
            test: {
                src: 'app/tests/scripts/*.js',
                    options: {
                        vendor: [
                        'assets/js/jquery/jquery-1.10.2.min.js',
                        'app/tests/vendor/jasmine-jquery.js'
                        ],
                        specs: 'app/tests/specs/*.spec.js'
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
    
    grunt.registerTask('default', ['css-prod']);

    grunt.registerTask(
        'css-prod',[
            'compass:production',
            'concat',
            'jshint', 
            'uglify',
            'copy',
            'jasmine'
            ]
    );
    
};
