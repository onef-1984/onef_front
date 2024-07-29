// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // reactStrictMode: true,
// };

// export default nextConfig;

// next.config.mjs
import removeImports from "next-remove-imports";

/** @type {function(import("next").NextConfig): import("next").NextConfig}} */
const removeImportsFun = removeImports({
  // test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/,
  // matchImports: "\\.(less|css|scss|sass|styl)$"
});

export default removeImportsFun({
  webpack(config) {
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.aladin.co.kr",
        port: "",
        pathname: "/**",
      },
    ],
  },
});
