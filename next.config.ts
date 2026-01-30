import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Replace 'YOUR_PROJECT_ID' with your actual Supabase project reference ID
        hostname: 'gklynnabsubocvnasmwd.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;