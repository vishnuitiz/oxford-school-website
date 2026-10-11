import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function OpengraphImage() {
  const emblem = `data:image/png;base64,${(await readFile(join(process.cwd(), "public/logo-og.png"))).toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#16322b",
          color: "#f6f1e7",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 36 }}>
          <img src={emblem} width={200} height={78} alt="" />
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 1.05, maxWidth: 900 }}>
            A school where every child is known.
          </div>
          <div style={{ marginTop: 28, fontSize: 32, color: "#fb8430" }}>
            Nursery to Grade 10
          </div>
        </div>
      </div>
    ),
    size,
  );
}
