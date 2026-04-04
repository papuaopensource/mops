/// <reference path="../.astro/types.d.ts" />

type KVNamespace = import("@cloudflare/workers-types").KVNamespace;

type Runtime = import("@astrojs/cloudflare").Runtime<{
  REACTIONS: KVNamespace;
}>;

declare namespace App {
  interface Locals extends Runtime {}
}
