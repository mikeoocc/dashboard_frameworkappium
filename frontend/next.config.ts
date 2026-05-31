import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this folder so Next doesn't pick up an unrelated
  // lockfile elsewhere on the machine.
  turbopack: {
    root: path.resolve(),
  },
};

export default nextConfig;
