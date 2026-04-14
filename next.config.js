/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/wl",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
