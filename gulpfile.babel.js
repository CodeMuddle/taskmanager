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

gulp.task('assets', (cb) => {
    webpack(assetsWebpackConfig, (err, stats) => {
        if (err) 
            throw new plugins.util.PluginError('webpack', err);

        // plugins.util.log('[webpack]', stats.toString());

        cb();
    });
});

gulp.task('popup-js', (cb) => {
    webpack(popupWebpackConfig, (err, stats) => {
        if (err) 
            throw new plugins.util.PluginError('webpack', err);

        // plugins.util.log('[webpack]', stats.toString());

        cb();
    });
});

gulp.task('newtab-js', (cb) => {
    webpack(newtabWebpackConfig, (err, stats) => {
        if (err) 
            throw new plugins.util.PluginError('webpack', err);
            // plugins.util.log('[webpack]')
        // plugins.util.log('[webpack]', stats.toString());

        cb();
    });
});

gulp.task('newtab-css', () => {
    return gulp.src('newtab/src/stylesheets/newtab.css')
        .pipe(gulp.dest('./build'))
});

gulp.task('event-js', (cb) => {
    webpack(eventWebpackConfig, (err, stats) => {
        if (err) 
            throw new plugins.util.PluginError('webpack', err);

        // plugins.util.log('[webpack]', stats.toString());

        cb();
    });
});

gulp.task('content-js', (cb) => {
    webpack(contentWebpackConfig, (err, stats) => {
        if (err) 
            throw new plugins.util.PluginError('webpack', err);

        // plugins.util.log('[webpack]', stats.toString());

        cb();
    });
});

gulp.task('content-css', () => {
    return gulp.src('content/src/stylesheets/content.css')
        .pipe(gulp.dest('./build'))
});


gulp.task('popup-html', () => {
    return gulp.src('popup/src/index.html')
    .pipe(plugins.rename('popup.html'))
    .pipe(gulp.dest('./build'))
});

gulp.task('newtab-html', () => {
    return gulp.src('newtab/src/index.html')
    .pipe(plugins.rename('newtab.html'))
    .pipe(gulp.dest('./build'))
});

gulp.task('popup-css', () => {
    return gulp.src('popup/src/stylesheets/popup.css')
        .pipe(gulp.dest('./build'))
});

gulp.task('copy-manifest', () => {
    return gulp.src('manifest.json')
        .pipe(gulp.dest('./build'));
});


// Clean task
gulp.task('clean', (cb) => {
    rimraf('./build', cb);
});

gulp.task('clean_assets', (cb) => {
    rimraf('./build/assets', cb);
});

gulp.task('clean_newtab', (cb) => {
    rimraf('./build/newtab.*',cb);
});

gulp.task('clean_event', (cb) => {
    rimraf('./build/event.js',cb);
});

gulp.task('clean_popup', (cb) => {
    rimraf('./build/popup.*',cb);
});

gulp.task('clean_content', (cb) => {
    rimraf('./build/content.*',cb);
});
gulp.task('clean_manifest', (cb) => {
    rimraf('./build/manifest.json',cb);
});

// Aggregrated Task
gulp.task('build', ['clean','assets','copy-manifest', 'popup-js','newtab-js', 'newtab-css', 'popup-html', 'popup-css' , 'newtab-html', 'event-js', 'content-js', 'content-css']);

gulp.task('watch', ['default'], () => {
    gulp.watch('assets/**/*', ['clean_assets','assets']);
    gulp.watch('popup/**/*', ['clean_popup','popup-html','popup-css','popup-js']);
    gulp.watch('newtab/**/*', ['clean_newtab','newtab-html','newtab-js','newtab-css']);    
    gulp.watch('content/**/*', ['clean_content','content-css','content-js']);
    gulp.watch('event/**/*', ['clean_event','event-js']);
    gulp.watch('utils/**/*', ['clean_newtab','clean_event','newtab-html','newtab-js','newtab-css','event-js']);
    gulp.watch('manifest.json',['clean_manifest','copy-manifest'])
});

gulp.task('default', ['build']);