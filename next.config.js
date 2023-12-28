/** @type {import('next').NextConfig} */
const { NODE_ENV, } = process.env;

const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    experimental: { esmExternals: true },
    // cssModules: true,
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [''],
    },
    serverRuntimeConfig: {
    },
    publicRuntimeConfig: {
        REDUX_DEV_TOOLS: NODE_ENV !== 'production',
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|mp4)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                },
            },
        });
        config.resolve.modules.push(__dirname);
        return config;
    },
}

module.exports = nextConfig;