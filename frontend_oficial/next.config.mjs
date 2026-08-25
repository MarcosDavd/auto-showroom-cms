/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

  allowedDevOrigins: [
    'hardiest-fabiola-reprimandingly.ngrok-free.dev'
  ],

  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;