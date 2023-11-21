/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        loader: "custom",
        // loaderFile
        path: "",
        domains: ["localhost"],
    },
}

module.exports = nextConfig
