/**
 * Inject a stylesheet into `<head>` exactly once per `id`, no matter how many
 * component instances mount. The CSS is static, so the tag is never removed.
 *
 * Internal helper — intentionally not part of the public export surface.
 */
export function ensureStyleSheet(id: string, css: string): void {
  if (typeof document === "undefined") return
  if (document.getElementById(id)) return

  const style = document.createElement("style")
  style.id = id
  style.textContent = css
  document.head.appendChild(style)
}
