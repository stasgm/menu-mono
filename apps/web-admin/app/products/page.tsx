import { Container } from '@components';
import Image from 'next/image';
import Link from 'next/link';

const data = [
  { id: 1, name: 'product 1' },
  { id: 2, name: 'product 2' },
  { id: 3, name: 'product 3' },
  { id: 4, name: 'product 4' },
  { id: 5, name: 'product 5' },
  { id: 6, name: 'product 6' },
  { id: 7, name: 'product 7' },
  { id: 8, name: 'product 8' },
];

export default function Page() {
  return (
    <Container className="grid grid-cols-2 gap-1 py-5 md:grid-cols-3 lg:grid-cols-4">
      {data.map((item) => (
        <Link className="overflow-hidden rounded-md" key={item.id} href="">
          <Image
            src=""
            alt={item.name}
            className="transition-all duration-500 hover:-rotate-2 hover:scale-110"
            width={500}
            height={500}
          />
        </Link>
      ))}
    </Container>
  );
}
