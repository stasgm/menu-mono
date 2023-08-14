import Link from 'next/link';

interface NavLinkProps {
  href: string;
  link: string;
}

export default function NavLink({ href, link }: NavLinkProps) {
  return (
    <li className="mx-4 my-6 capitalize md:my-0">
      <Link href={href} className="text-xl duration-500 hover:text-dorado">
        {link}
      </Link>
    </li>
  );
}
