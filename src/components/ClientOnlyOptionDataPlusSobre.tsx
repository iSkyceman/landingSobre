"use client";

import dynamic from "next/dynamic";

const OptionDataPlusSobre = dynamic(() => import("./OptionDataPlusSobre"), {
  ssr: false,
});

export default function ClientOnlyOptionDataPlusSobre() {
  return <OptionDataPlusSobre />;
}
