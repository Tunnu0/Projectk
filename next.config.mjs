/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Optimize for TensorFlow.js and face-api.js
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        encoding: false,
        path: false,
        os: false,
        stream: false,
        crypto: false,
        buffer: false,
        util: false,
        url: false,
        querystring: false,
        http: false,
        https: false,
        zlib: false,
        net: false,
        tls: false,
        child_process: false,
        // Additional fallbacks for TensorFlow.js and face-api.js
        canvas: false,
        'canvas-prebuilt': false,
        'utf-8-validate': false,
        'bufferutil': false,
      }
      
      // Ignore specific modules that cause warnings
      config.externals = config.externals || []
      config.externals.push({
        'encoding': 'commonjs encoding',
        'canvas': 'commonjs canvas',
        'canvas-prebuilt': 'commonjs canvas-prebuilt',
      })
      
      // Additional fallbacks for problematic modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'node-fetch': false,
        'form-data': false,
        'fetch-blob': false,
      }
    }
    
    // Add alias for better module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      'encoding': false,
      'canvas': false,
      'canvas-prebuilt': false,
    }
    
    return config
  },
}

export default nextConfig
