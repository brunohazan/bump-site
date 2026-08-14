"use client";

import Image from "next/image";
import { useState } from "react";

type VideoEmbedProps = {
  videoId: string;
  title: string;
  caption?: string;
};

/**
 * Player com carregamento sob clique: enquanto o usuário não interage, nada do
 * YouTube é carregado. Isso preserva LCP e evita requisições de terceiros na
 * primeira visita. A miniatura passa pelo otimizador do Next, servida da própria
 * origem.
 */
export function VideoEmbed({ videoId, title, caption }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="m-0">
      <div className="relative aspect-video overflow-hidden border border-line-2 bg-ink">
        {playing ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Assistir ao vídeo: ${title}`}
            className="group absolute inset-0 size-full"
          >
            <Image
              src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02] [filter:saturate(.8)_contrast(1.05)]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/10" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-20 place-items-center rounded-full border border-accent bg-ink/70 text-accent transition-colors group-hover:bg-accent group-hover:text-ink md:size-24">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-1 size-7 fill-current md:size-8">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      {caption && <figcaption className="mt-4 text-sm leading-relaxed text-mute-2">{caption}</figcaption>}
    </figure>
  );
}
