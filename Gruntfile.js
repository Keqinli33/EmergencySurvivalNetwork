/**
 * Created by keqinli on 3/20/17.
 */

module.exports = function(grunt){

    //Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mochaTest: {
            local: {
                options: {
                    reporter:'spec',
                    quiet: false,
                    clearRequireCache:false,
                    ui: 'tdd'
                },
                src: ['test/**/*.js']
            }
        },
        mocha_istanbul: {
            coverage: {
                src: 'test', // a folder works nicely
                options: {
                    mochaOptions: ['--ui', 'tdd'] // any extra options for mocha
                }
            }
        }

    });


    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-mocha-istanbul');

    // Default task(s).
    grunt.registerTask('default', []);

    grunt.registerTask('test', ['mochaTest:local']);

    // Shippable
    grunt.registerTask('shippable', ['mochaTest:shippable', 'mocha_istanbul']);

    grunt.registerTask('coverage', ['mocha_istanbul']);


};