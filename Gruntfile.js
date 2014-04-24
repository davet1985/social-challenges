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

        jshint: {
            options: grunt.file.readJSON('.jshintrc'),
            javascripts: {
                src: [
                    'assets/js/custom.js'
                ]
            }
        },

        uglify: {

            app: {
                files: {
                    'public/js/app.js' : [
                        'assets/js/jquery/jquery-1.10.2.min.js',
                        'assets/js/bootstrap/affix.js',
                        'assets/js/bootstrap/alert.js',
                        'assets/js/bootstrap/button.js',
                        'assets/js/bootstrap/carousel.js',
                        'assets/js/bootstrap/collapse.js',
                        'assets/js/bootstrap/dropdown.js',
                        'assets/js/bootstrap/tab.js',
                        'assets/js/bootstrap/transition.js',
                        'assets/js/bootstrap/scrollspy.js',
                        'assets/js/bootstrap/modal.js',
                        'assets/js/bootstrap/tooltip.js',
                        'assets/js/bootstrap/popover.js',
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
    
    /* the default task can be run just by typing 'grunt' on the command line */
    grunt.registerTask('default', ['css-prod']);

    grunt.registerTask(
        'css-prod',[
            'compass:production',
            'jshint', 
            'uglify:app', 
            'copy:jsfiles',
            'jasmine'
            ]
    );
    
};
