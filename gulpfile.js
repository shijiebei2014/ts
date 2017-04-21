var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject('tsconfig.json');

gulp
	.task("default", function() {
		var tsResult = tsProject.src().pipe(tsProject());
		return tsResult.js.pipe(gulp.dest('build/'));
	})
	.task('watch', ['default'], function() {
	    gulp.watch('src/**/*.ts', ['default']);
	})