
module.exports = function(grunt){
	// require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		watch: {
			jade: {
        files: ['views/**'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
        //tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
		},
		nodemon: {
     dev: {
      script: 'app.js',
      options: {
         args: [],
         nodeArgs: ['--debug'],
         ignore: ['README.md', 'node_modules/**', '.DS_Store'],
         ext: 'js',
         watch: ['./'],
         delay: 1000,
         env: {
              PORT: '3000'
         },
         cwd: __dirname
      }
     }
		},
    concurrent: {
    	target: {
    		tasks: ['nodemon', 'watch'],
	      options: {
	        logConcurrentOutput: true
	      }
    	}
      
    }
	})

	grunt.loadNpmTasks('grunt-contrib-watch')//监视文件的改动
	grunt.loadNpmTasks('grunt-nodemon')//实时监听入口文件
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.option('force', true)
	grunt.registerTask('default', ['concurrent:target'])
}