"use client";

import type { PacketId } from "@/content/site";
import { Magnetic } from "./Motion";

export const PACKET_EVENT = "pinta:select-packet";

export default function PacketButton({ id, label, primary }: { id: PacketId; label: string; primary: boolean }) {
  const link = (
    <a
      className={`btn ${primary ? "btn-light" : "btn-line"}`}
      href="#contact"
      onClick={() => window.dispatchEvent(new CustomEvent<PacketId>(PACKET_EVENT, { detail: id }))}
    >
      {label}
    </a>
  );
  return primary ? <Magnetic>{link}</Magnetic> : link;
}
