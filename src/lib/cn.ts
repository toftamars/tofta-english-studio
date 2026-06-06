/** Basit classnames birleştirici (koşullu sınıflar için). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
