const {join} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: join(__dirname, 'dist'), // 指定资源打包后的存放路径
        chunkFilename: "[name].js", // 指定异步chunk的名字，否则都是0.js之类的（默认值[id].js）
        publicPath: "/dist/" // 指定资源的请求路径
    },
    mode: 'development', // webpack4 新增，用于简化配置。开启对应模式时，会自动装配许多默认配置
    module: {
        rules: [
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_module/, // 优先级高于include
                include: /src/
            },
            {
                test: /\.js/,
                exclude: /node_module/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        presets: [
                            '@babel/preset-env',
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'file-loader', // 经过file-loader处理，js就可以直接引入
                    options: {
                        name: '[name].[ext]',
                        publicPath: './imagePath' // 这里的设置会覆盖 output里的publicPath
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 10, // 文件大于阈值时，跟file-loader一样，小于时，返回base64编码
                        name: '[name].[ext]',
                    }
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ // 用于生成index.html动态HTML文件（自动将资源引入到index.html中）
            template: "./public/index.html"
        }),
        new WebpackBundleAnalyzer(), // 用于生成模块矩形面积图的插件
    ],
    optimization: {
        splitChunks: {
            chunks: "all" // 对所有chunks生效，默认只对异步chunks生效（即使不配置也会生效）
        }
    },
    devtool: 'source-map', // 开启source map便于源码调试（在浏览器source选项卡下的 webpack:// 文件夹下可以看到源码）
    devServer: {
    },
}
