module.exports = ({ server } = {}) => ({
    presets: [
        [
            '@babel/preset-env',
            {
                targets: server
                    ? { node: 'current' }
                    : { browsers: ['> 5%', 'last 2 versions'] },
                modules: server ? 'commonjs' : false,
            },
        ],
        '@babel/preset-react',
    ],
    plugins: [
        !server && 'react-hot-loader/babel',
        !server && '@babel/plugin-transform-runtime',
        server && 'babel-plugin-dynamic-import-node',
        '@loadable/babel-plugin',
    ].filter(Boolean),
});
