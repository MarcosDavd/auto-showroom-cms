import Link from 'next/link';

export function BackButton({ href, classBack,text }) {
  return (
    <Link href={href} className={classBack}>
      {text}
    </Link>
  );
}