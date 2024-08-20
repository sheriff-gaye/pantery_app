import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="relative h-8 w-8 mr-4 gap-3">
        <Image
          src="/logo.png"
          alt="logo"
          fill
        />
        <h2 className="text-xl font-bold ml-9">Pantry</h2>
      </div>
    </Link>
  );
}
