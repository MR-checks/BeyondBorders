/**
 * Structured data block.
 *
 * Deliberately carries no CSP nonce. The HTML "prepare the script element"
 * algorithm returns early for a non-JavaScript type, before the CSP check, so
 * application/ld+json is never blocked by script-src. Adding a nonce would only
 * break hydration: browsers hide the nonce content attribute after parsing, so
 * React reads it back as "" and reports a mismatch.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
