import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { fetchApi } from "@/lib/api";

type Review = {
  id: number;
  name: string;
  date?: string;
  rating: number;
  message: string;
  initial?: string;
};

type ReviewResponse = {
  message: string;
  data: Review[];
};

export default async function ReviewsPage() {
  const reviews = await fetchApi<ReviewResponse>("/reviews");

  return (
    <Container>
      <SectionTitle
        eyebrow="Review"
        title="Kesan Pengunjung"
        description="Ulasan pengunjung tentang pengalaman wisata di Alas Watu Kebonan."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {reviews.data.map((review) => (
          <article
            key={review.id}
            className="rounded-3xl border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-900 text-lg font-bold text-white">
                {review.initial ?? review.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="font-bold text-slate-950">{review.name}</h2>
                {review.date && (
                  <p className="text-sm text-slate-500">{review.date}</p>
                )}
              </div>
            </div>

            <p className="mt-4 text-yellow-500">
              {"★".repeat(review.rating)}
            </p>

            <p className="mt-4 text-slate-700">{review.message}</p>
          </article>
        ))}
      </div>
    </Container>
  );
}