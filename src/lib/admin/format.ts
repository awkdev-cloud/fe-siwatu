export function getByPath(
  source: Record<string, unknown>,
  path: string,
): unknown {
  return path.split(".").reduce<unknown>((current, segment) => {
    if (
      current &&
      typeof current === "object" &&
      segment in current
    ) {
      return (current as Record<string, unknown>)[segment];
    }

    return undefined;
  }, source);
}

export function formatDate(value: unknown): string {
  if (!value || typeof value !== "string") {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
  }).format(date);
}

export function formatCurrency(value: unknown): string {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "—";
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function truncate(value: unknown, max = 84): string {
  if (typeof value !== "string" || !value.trim()) {
    return "—";
  }

  return value.length > max
    ? `${value.slice(0, max).trim()}…`
    : value;
}
