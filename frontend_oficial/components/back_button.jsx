import Link from 'next/link';

export function BackButton({ href }) {
  return (
    <Link href={href} className="back-button">
      ← <span>Volver</span>
    </Link>
  );
}