"use client";

import { useEffect, useMemo, useState } from "react";

type Review = {
  id: number;
  name: string;
  date?: string;
  rating?: number;
  message?: string;
  initial?: string;
};

type ReviewCarouselProps = {
  reviews: Review[];
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function ReviewStars({ value = 5 }: { value?: number }) {
  const safeValue = Math.max(0, Math.min(5, value));

  return (
    <div className="flex items-center gap-1 text-[#FBD90F]">
      {Array.from({ length: safeValue }).map((_, index) => (
        <span key={index} className="text-base leading-none">
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const fallbackReviews: Review[] = [
    {
      id: 1,
      name: "Pengunjung",
      initial: "P",
      rating: 5,
      message:
        "Tempatnya nyaman, suasananya asri, dan cocok untuk menikmati wisata alam bersama keluarga.",
    },
    {
      id: 2,
      name: "Wisatawan",
      initial: "W",
      rating: 5,
      message:
        "Informasi wisata mudah dipahami. Katalog flora dan bebatuan juga menarik untuk edukasi.",
    },
    {
      id: 3,
      name: "Tamu Desa",
      initial: "TD",
      rating: 5,
      message:
        "Pengalaman berkunjung terasa menyenangkan karena tempatnya unik dan punya identitas lokal yang kuat.",
    },
  ];

  const data = reviews.length > 0 ? reviews : fallbackReviews;
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleReviews = useMemo(() => {
    return Array.from({ length: Math.min(3, data.length) }).map(
      (_, index) => data[(activeIndex + index) % data.length],
    );
  }, [activeIndex, data]);

  useEffect(() => {
    if (data.length <= 3) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [data.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % data.length);
  };

  return (
    <div className="relative">
      <div className="grid gap-6 md:grid-cols-3">
        {visibleReviews.map((review, index) => (
          <article
            key={`${review.id}-${index}`}
            className={cn(
              "group relative min-h-[260px] overflow-hidden rounded-[30px] border border-[#00532B]/10 bg-white p-6 shadow-lg shadow-[#00532B]/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00532B]/15",
            )}
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#FBD90F]/20 blur-2xl transition group-hover:bg-[#FBD90F]/35" />

            <div className="relative">
              <div className="mb-5 flex items-center justify-between gap-4">
                <ReviewStars value={review.rating ?? 5} />

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00532B] text-xs font-black text-white">
                  {review.initial ?? review.name.slice(0, 2).toUpperCase()}
                </div>
              </div>

              <p className="line-clamp-4 min-h-[96px] text-sm leading-7 text-zinc-600">
                “{review.message ?? "Pengalaman wisata yang menyenangkan."}”
              </p>

              <div className="mt-6 border-t border-[#00532B]/10 pt-5">
                <p className="font-black text-[#00532B]">{review.name}</p>

                <p className="mt-1 text-xs font-semibold text-zinc-500">
                  {review.date ?? "Pengunjung Alas Watu"}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={handlePrev}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#00532B]/15 bg-white text-xl font-black text-[#00532B] shadow-sm transition hover:bg-[#00532B] hover:text-white"
          aria-label="Review sebelumnya"
        >
          ←
        </button>

        <div className="flex items-center gap-2">
          {data.slice(0, Math.min(data.length, 5)).map((review, index) => (
            <button
              key={review.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-2.5 rounded-full transition-all",
                index === activeIndex
                  ? "w-8 bg-[#00532B]"
                  : "w-2.5 bg-[#00532B]/20 hover:bg-[#00532B]/40",
              )}
              aria-label={`Pilih review ${index + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FBD90F] text-xl font-black text-[#00532B] shadow-sm transition hover:bg-[#00532B] hover:text-white"
          aria-label="Review berikutnya"
        >
          →
        </button>
      </div>
    </div>
  );
}