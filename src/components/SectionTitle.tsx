type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-700">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl font-bold text-slate-950">{title}</h1>
      {description && (
        <p className="mt-3 max-w-2xl text-slate-600">{description}</p>
      )}
    </div>
  );
}