import { ImageResponse } from "next/og";

export const alt = "VIRTUAL FIRA - Beyond Digital. Beyond Ordinary.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0B2A2D", color: "#F3F0E9", padding: 72 }}>
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>VIRTUAL FIRA</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 108, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>
          <span>BEYOND DIGITAL.</span>
          <span style={{ color: "#FF6A35" }}>BEYOND ORDINARY.</span>
        </div>
        <div style={{ display: "flex", fontSize: 30, opacity: 0.8 }}>Website design · 360° virtual tours · Brand identity</div>
      </div>
    ),
    size,
  );
}
