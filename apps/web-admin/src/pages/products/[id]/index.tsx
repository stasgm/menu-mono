import { useRouter as useNavigation } from 'next/navigation';
import { useRouter } from 'next/router';

import Container from '@/components/container';

const Header = ({ id }: { id: string | string[] | undefined }) => {
  const nav = useNavigation();

  return (
    <div className="mb-2 flex justify-between">
      <h1 className="self-center text-xl font-bold text-gray-100">View product: {id}</h1>
      <button
        className="rounded-md bg-gray-800 p-2 px-4 hover:bg-gray-900 focus:outline-none"
        onClick={() => nav.push(`/products/${id as string}`)}
      >
        Edit
      </button>
      <button
        className="rounded-md bg-gray-800 p-2 px-4 hover:bg-gray-900 focus:outline-none"
        onClick={() => nav.back()}
      >
        Back
      </button>
    </div>
  );
};

const Product = () => {
  const router = useRouter();

  return (
    <Container>
      <Header id={router.query.id} />
    </Container>
  );
};

export function generateStaticParams() {
  // Generate two pages at build time and the rest (3-100) on-demand
  return [{ id: '1' }, { id: '2' }];
}

export default Product;
