import Link from 'next/link';

const Logo = () => {
  return (
    <Link href={'/'} className="font-bold text-3xl bg-gradient-to-r bg-clip-text hover:cursor-pointer">
      CV-Improver
    </Link>
  );
};

export default Logo;
