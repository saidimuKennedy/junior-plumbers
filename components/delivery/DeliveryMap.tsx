"use client";

import dynamic from "next/dynamic";
import type { DeliveryMapLeafletProps } from "./DeliveryMapLeaflet";

const DeliveryMapLeaflet = dynamic(
  () => import("./DeliveryMapLeaflet").then((m) => m.DeliveryMapLeaflet),
  {
    ssr: false,
    loading: () => (
      <div className="relative flex h-full min-h-0 items-center justify-center bg-paper-2">
        <span className="t-meta">Loading map…</span>
      </div>
    ),
  }
);

export type DeliveryMapProps = DeliveryMapLeafletProps;

export function DeliveryMap(props: DeliveryMapProps) {
  return <DeliveryMapLeaflet {...props} />;
}
