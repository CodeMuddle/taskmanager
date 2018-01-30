import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';

const plugins = loadPlugins();

import popupWebpackConfig from './popup/webpack.config';
import newtabWebpackConfig from './newtab/webpack.config';
import eventWebpackConfig from './event/webpack.config';
import contentWebpackConfig from './content/webpack.config';
import assetsWebpackConfig from './assets/webpack.config';

gulp.task('assets', ['clean'], (cb) => {
    webpack(assetsWebpackConfig, (err, stats) => {
        if (err) 
            throw new plugins.util.PluginError('webpack', err);

        // plugins.util.log('[webpack]', stats.toString());

        cb();
    });
});

gulp.task('popup-js', ['clean'], (cb) => {
    webpack(popupWebpackConfig, (err, stats) => {
        if (err) 
            throw new plugins.util.PluginError('webpack', err);

        // plugins.util.log('[webpack]', stats.toString());

        cb();
    });
});

gulp.task('newtab-js', ['clean'], (cb) => {
    webpack(newtabWebpackConfig, (err, stats) => {
        if (err) 
            throw new plugins.util.PluginError('webpack', err);
            // plugins.util.log('[webpack]')
        // plugins.util.log('[webpack]', stats.toString());

        cb();
    });
});

gulp.task('newtab-css', ['clean'], () => {
    return gulp.src('newtab/src/stylesheets/newtab.css')
        .pipe(gulp.dest('./build'))
});

gulp.task('event-js', ['clean'], (cb) => {
    webpack(eventWebpackConfig, (err, stats) => {
        if (err) 
            throw new plugins.util.PluginError('webpack', err);

        // plugins.util.log('[webpack]', stats.toString());

        cb();
    });
});

gulp.task('content-js', ['clean'], (cb) => {
    webpack(contentWebpackConfig, (err, stats) => {
        if (err) 
            throw new plugins.util.PluginError('webpack', err);

        // plugins.util.log('[webpack]', stats.toString());

        cb();
    });
});

gulp.task('content-css', ['clean'], () => {
    return gulp.src('content/src/stylesheets/content.css')
        .pipe(gulp.dest('./build'))
});


gulp.task('popup-html', ['clean'], () => {
    return gulp.src('popup/src/index.html')
    .pipe(plugins.rename('popup.html'))
    .pipe(gulp.dest('./build'))
});

gulp.task('newtab-html', ['clean'], () => {
    return gulp.src('newtab/src/index.html')
    .pipe(plugins.rename('newtab.html'))
    .pipe(gulp.dest('./build'))
});

gulp.task('popup-css', ['clean'], () => {
    return gulp.src('popup/src/stylesheets/popup.css')
        .pipe(gulp.dest('./build'))
});

gulp.task('copy-manifest', ['clean'], () => {
    return gulp.src('manifest.json')
        .pipe(gulp.dest('./build'));
});

gulp.task('clean', (cb) => {
    rimraf('./build', cb);
});

gulp.task('build', ['clean','assets','copy-manifest', 'popup-js','newtab-js', 'newtab-css', 'popup-html', 'popup-css' , 'newtab-html', 'event-js', 'content-js', 'content-css']);
// gulp.task('build', ['clean','assets','copy-manifest', 'popup-js','popup-html', 'popup-css']);


gulp.task('watch', ['default'], () => {
    gulp.watch('assets/**/*', ['build']);
    gulp.watch('popup/**/*', ['build']);
    gulp.watch('newtab/**/*', ['build']);    
    gulp.watch('content/**/*', ['build']);
    gulp.watch('event/**/*', ['build']);
    gulp.watch('utils/**/*', ['build']);
});

gulp.task('default', ['build']);