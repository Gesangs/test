var gulp = require('gulp');
var rev = require('gulp-rev');/*哈希值 版本号*/
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');/*文件合并*/
var filter = require('gulp-filter');/*文件筛选*/
var uglify = require('gulp-uglify');/*js压缩*/
var csso = require('gulp-csso');/*css压缩*/

gulp.task('default',function(){
    var jsFilter = filter('**/*.js',{restore : true});
    var cssFilter = filter('**/*.css',{restore : true});
    var indexHtmlFilter = filter(['**/*', '!**/index.html'],{restore: true});

    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));

})
