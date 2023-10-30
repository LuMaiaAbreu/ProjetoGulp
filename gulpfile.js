const {series,parallel} = require('gulp')
const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const htmlmin = require('gulp-htmlmin')
/*const image = require('gulp-image')*/
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const sass = require ('gulp-sass')(require('node-sass'))


function tarefasCss(callback){


    gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css',
        './Vendor/Owl/OwlCarousel2-2.3.4/owl.css',
        './Vendor/jquery-ui/jquery-ui.css',
          
    ])
   
       .pipe (concat('libs.css'))
       .pipe(cssmin())
       .pipe(rename({suffix:'.min'}))
       .pipe(gulp.dest('./dist/css'))
       .pipe(gulp.dest('./src/css'))

       return callback()
}

function tarefaSASS(cb){
    gulp.src('./src/scss/**/*.scss')
     .pipe(sass())
     .pipe(gulp.dest('./dist/css'))

    cb()
}

function tarefasJS(callback){
     gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './Vendor/Owl/OwlCarousel2-2.3.4/owl.js',
        './Vendor/Jquery-mask/jquery.mask.js',
        './Vendor/jquery-ui/jquery-ui.js',
        './src/js/custom.js',
      
    ])

    .pipe(babel({
        comments:false,
        presets: ['@babel/preset-env']

    }))
       .pipe(concat('libs.js'))
       .pipe(uglify())
       .pipe(rename({suffix:'.min'}))
       .pipe(gulp.dest('./dist/js'))
       .pipe(gulp.dest('./src/js'))
    return callback()
}

/*function tarefasImagem(){
    
    return gulp.src('./src/Imagens/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/images'))
}*/

function tarefasHTML(callback){

    gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'))

    return callback()  


}

gulp.task('server', function(){
    browserSync.init({
        server:{
                baseDir:"./dist"
        }
       
    })

    gulp.watch('./src/**/*').on('change',process)
    gulp.watch('./src/**/*').on('change',reload)
   
})

const process = parallel ( tarefasHTML, tarefasCss, tarefasJS,tarefaSASS)


exports.styles = tarefasCss
exports.scripts = tarefasJS
exports.sass = tarefaSASS
/*exports.image = tarefasImagem*/

exports.default = process