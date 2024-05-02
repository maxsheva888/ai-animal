const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        index: path.resolve(__dirname, 'src/core/app.ts'),
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: '[name][ext]',
        clean: true,
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".tsx", ".js"],
      // Add support for TypeScripts fully qualified ESM imports.
      extensionAlias: {
       ".js": [".js", ".ts"],
       ".cjs": [".cjs", ".cts"],
       ".mjs": [".mjs", ".mts"]
      }
    },
    performance: {
        hints: false,
        maxAssetSize: 512000,
        maxEntrypointSize: 512000
    },
    devServer: {
        port: 3000,
        compress: true,
        hot: true,
        static: {
            directory: path.join(__dirname, 'public'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|git)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
}
