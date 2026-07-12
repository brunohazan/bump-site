"use client";

import { useState } from "react";
import Image from "next/image";

export function BeforeAfterSlider({
  image,
  alt,
}: {
  image: string;
  alt: string;
}) {
  const [value, setValue] = useState(50);

  return (
    <div
      data-reveal
      className="relative aspect-[4/3] select-none overflow-hidden border border-line-1 md:aspect-[21/9]"
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="object-cover saturate-105"
        />
      </div>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
      >
        <Image
          src={image}
          alt={`${alt} — original`}
          fill
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="object-cover grayscale-50 brightness-75"
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-px bg-accent"
        style={{ left: `${value}%` }}
      >
        <span className="absolute top-1/2 left-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent bg-ink text-xs text-accent">
          ⇄
        </span>
      </div>
      <span className="absolute top-5 left-5 font-mono text-[11px] tracking-[0.18em] text-mute-2">
        ORIGINAL
      </span>
      <span className="absolute top-5 right-5 font-mono text-[11px] tracking-[0.18em] text-accent">
        BUMP
      </span>
      <input
        type="range"
        min={5}
        max={95}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        aria-label="Comparar antes e depois"
      />
    </div>
  );
}
