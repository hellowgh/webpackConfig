const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')

console.log(344, merge);

module.exports = merge(commonConfig, {
    mode: 'development',
    module: {
        rules: [
            {
                // webpack-merge可以在匹配到相同的 test 时，用这里的覆盖commonConfig里的配置
            }
        ]
    },
    devServer: {
        hot: true
    }
})
