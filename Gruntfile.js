module.exports = function(grunt) {
    // -------------------------------
    // Gruntのプラグインの読み込み
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-haxe');
    grunt.loadNpmTasks('grunt-notify');
    // -------------------------------
    // 初期設定
    grunt.initConfig({

        less: {
            dist: {
                files: {
                    "ExtensionContent/css/dark-style.css": "src/less/dark-style.less",
                    "ExtensionContent/css/light-style.css": "src/less/light-style.less"
                }
            }
        },
        haxe : {
            compile : {
                hxml : 'compile.hxml'
            }
        },
        // -------------------------------
        // watchの設定
        watch: [ {
            files: ['src/less/*.less'],
            tasks: ['less']
        },
        {
            files : ['src/haxe/**'],
            tasks : ['haxe:compile']
        }]
    });
};