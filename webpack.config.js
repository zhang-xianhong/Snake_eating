const path = require('path')

// 引入html插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 引入clean插件,每一次打包时会首先清楚之前打包的文件，打包最新的文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    output: {
        // 指定打包文件目录
        path: path.resolve(__dirname,'dist'),
        // 打包后的文件名
        filename: 'bundle.js',
        // 告诉webpack不使用箭头函数
        environment: {
            arrowFunction: false,
            const: false
        }
    },
    // 指定webpack打包时要使用的模块
    module: {
        // 指定webpack打包时要使用的模块
        rules: [
            {
                test: /\.ts$/,
                // 要使用的loader
                use: [
                    // 配置babel
                    {
                        // 指定加载器
                        loader: 'babel-loader',
                        // 设置babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标游览器
                                        targets: {
                                            "chrome": "58",
                                            "ie": "11"
                                        },
                                        // 指定core.js版本
                                        "corejs": "3",
                                        // 使用corejs的方式，usege表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude: /node-modules/  
            },
            // 设置less文件的处理
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    // 引入postcss
                    {
                        "loader": "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    // 配置webpackplugin
    plugins: [
        new HtmlWebpackPlugin({
            // title: 'zhangxianhong',
            template: './src/index.html'  //指定默认的html模板
        }),
        new CleanWebpackPlugin()
    ],
    // resolve用来设置引用的模块
    resolve: {
        extensions: ['.ts','.js'] //以ts，js文件结尾的文件都可以被打包
    }
}