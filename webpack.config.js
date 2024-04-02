let path = require('path');
let conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: "mobmain.js",
        publicPath: "/dist/"
    },
    module: {
        rules: [
            {
                 test: /\.html$/,
                 loader: 'html-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            ["@babel/preset-react", {"runtime": "automatic"}]
                        ],
                        plugins: ["@babel/plugin-transform-react-jsx"],
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader", // 3. Inject styles into DOM
                    "css-loader", // 2. Turns css into commonjs
                ],
            },
        ]
    }
}

module.exports = conf;
