/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow production checks alongside an already-running development server.
  distDir: process.env.NAVOCODE_BUILD_DIR || '.next',
};

export default nextConfig;
