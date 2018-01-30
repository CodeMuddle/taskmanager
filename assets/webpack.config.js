var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    stats:"errors-only",
    context: __dirname,
    devServer: {
        // This is required for older versions of webpack-dev-server
        // if you use absolute 'to' paths. The path should be an
        // absolute path to your build destination.
        outputPath: path.join(__dirname, 'build')
    },
    plugins: [
        new CopyWebpackPlugin([
            // Copy directory contents to {output}/to/directory/
            { from: './', to: 'build/assets' }
        ], {
            ignore: [ 'webpack.config.js' ],

            // By default, we only copy modified files during
            // a watch or webpack-dev-server build. Setting this
            // to `true` copies all files.
            copyUnmodified: true
        })
    ]
};