{
  description = "DiscordBot with Node.js 23, PNPM, and Prisma support";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_23
            prisma-engines
            nodePackages.pnpm
          ];

          PRISMA_QUERY_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/query-engine";
          PRISMA_SCHEMA_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/schema-engine";
          PRISMA_FMT_BINARY = "${pkgs.prisma-engines}/bin/prisma-fmt";
          PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING = "1";

          shellHook = ''
            echo "🚀 Entered dev shell with Node.js 23, PNPM, and Prisma engines."
          '';
        };
      });
}
