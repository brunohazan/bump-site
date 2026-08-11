export type FaqEntry = { question: string; answer: string; category?: string };

export function FaqList({ items }: { items: readonly FaqEntry[] }) {
  return (
    <div className="divide-y divide-line-1 border-y border-line-1">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-5 py-4 text-left font-semibold transition-colors hover:text-accent">
            <span>{item.question}</span>
            <span aria-hidden="true" className="text-xl text-accent transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="max-w-3xl pb-6 pr-10 leading-relaxed text-mute-1">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
