const nextConfig = {
  async rewrites() {
    return [{ source: "/api/:ruta*", destination: "http://127.0.0.1:8080/api/:ruta*" }];
  },
  turbopack: { root: process.cwd() },
  agentRules: false,
};

export default nextConfig;
