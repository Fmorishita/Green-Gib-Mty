/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
    // El endpoint de certificados lee las fuentes del disco con fs.readFileSync
    // en tiempo de ejecución; Next no siempre detecta esa dependencia por
    // análisis estático, así que se declara explícitamente para que Vercel
    // la incluya en el bundle de la función serverless.
    outputFileTracingIncludes: {
      "/api/certificados/**": ["./lib/certificates/fonts/**"],
    },
  },
};

export default nextConfig;
