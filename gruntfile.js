module.exports = function(grunt){
    require('load-grunt-tasks')(grunt);

    // configuration
    grunt.initConfig({
        // allow to refer to the values of properties within package.json file 
        pkg: grunt.file.readJSON('package.json'),

        path: { // must have , because path important
            dependencies: "dependencies",
            scss: "scss",
            minify: "minify",
            image: "image"
        },
        uglify: { // task
            CurrentTarget: { // target
                files: {        // target options
                    "<%= path.minify %>/minify-min.js": ["<%= path.dependencies %>/*.js"],
                },
            }
        },
        cssmin: { 
            CurrentTarget: {
                
                options: {
					keepSpecialComments: 0,
                    style: 'compressed', // `https://www.wikimass.com/sass/compressed`
					sourcemap: "none" // `false not work , because command sass`
				},
				files: {
                    '<%= path.minify %>/minify-min.css': ['<%= path.scss %>/*.css']
                }
			}
        },
        minifyHtml: {
            options: {
                cdata: true
            },
            dist: {
                files: {
                    '<%= path.minify %>/minify-html.html': '*.html'
                }
            }
        }
    });

    //grunt , run all within [".."]
    grunt.registerTask("default", [
        "uglify", 
        "cssmin",
        "minifyHtml"
    ]);

}