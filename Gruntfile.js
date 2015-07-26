module.exports = function(grunt) {
  grunt.initConfig({
    babel: {
      all: {
        files: [{
          cwd: 'src',
          src: ['**/*.js', '!libs/*.js'],
          dest: 'build',
          expand: true
        }, {
          src: ['demo/**/*.js'],
          dest: 'build',
          expand: true
        }]
      }
    },
    copy: {
      libs: {
        files: [{
          cwd: 'src',
          src: 'libs/**/*',
          dest: 'build',
          expand: true
        }]
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*.js', 'demo/**/*.js'],
        tasks: ['babel']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('default', ['babel', 'copy', 'watch']);
};
