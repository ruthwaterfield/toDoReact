var gulp = require('gulp')
var nodemon = require('gulp-nodemon')

gulp.task('hello', function() {
    console.log('Hello Wendy')
})

gulp.task('start', function () {
    nodemon({
        script: 'app.js'
        , ext: 'js html css'
        , env: { 'NODE_ENV': 'development' }
    })
})