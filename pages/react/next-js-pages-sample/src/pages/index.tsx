"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input ref={inputRef} placeholder="type search" />
      <button
        onClick={() => {
          route.push(
            `/search?searchstax[query]=${inputRef.current?.value}&searchstax[page]=1`
          );
        }}
      >
        Search
      </button>
    </>
  );
}
