// Prisma 7 Configuration
import "dotenv/config";
import { defineConfig } from "prisma/config";

function getMigrationUrl() {
  const directUrl = process.env.DIRECT_URL;

  if (directUrl) {
    try {
      const parsed = new URL(directUrl);
      const databaseName = decodeURIComponent(parsed.pathname).slice(1);

      if (databaseName && !/[\\\s"|]/.test(databaseName)) {
        return directUrl;
      }
    } catch {
      // Fall through to the runtime URL when DIRECT_URL is malformed.
    }
  }

  const runtimeUrl = process.env.DATABASE_URL;
  if (!runtimeUrl) {
    throw new Error("DATABASE_URL or a valid DIRECT_URL is required");
  }

  const parsed = new URL(runtimeUrl);
  if (parsed.hostname.endsWith(".pooler.supabase.com") && parsed.port === "6543") {
    parsed.port = "5432";
    parsed.searchParams.delete("pgbouncer");
  }

  return parsed.toString();
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Prefer a valid direct URL. Recover safely from a malformed local value.
    url: getMigrationUrl(),
  },
});
