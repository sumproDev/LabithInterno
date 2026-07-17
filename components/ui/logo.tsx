import Image from "next/image";
import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Labith Interno home"
      className={compact ? "logo-lockup logo-lockup-compact" : "logo-lockup"}
    >
      <Image
        src="/images/logo.webp"
        alt="Labith Interno"
        width={536}
        height={88}
        priority
        className="logo-image"
      />
    </Link>
  );
}
