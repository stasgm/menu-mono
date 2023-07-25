'use client';
import useProductsStore from '@app/store/products-store';
import { StyledGrid, StyledGridColumns } from '@components/styled-grid';
import { IProduct } from '@packages/domains';
import { DeleteIcon } from '@public/icons/delete';
import { EditIcon } from '@public/icons/edit';
import { IconButton } from '@public/icons/icon-button';
import { Button } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const { products, getProducts, removeProduct, isFetching } = useProductsStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleDelete = (product: IProduct) => () => {
    removeProduct(product);
  };

  const columns: StyledGridColumns = [
    {
      headerName: 'Product name',
      fieldName: 'name',
      renderCell(value, row) {
        return (
          <div className="flex items-center space-x-4">
            <Image
              src={row.image ?? ''}
              alt={row.name}
              className="rounded-lg transition-all duration-500 hover:-rotate-2 hover:scale-110"
              width={80}
              height={80}
            />
            <div className="space-y-4">
              <div>{value}</div>
              <div className="line-clamp-3 max-w-sm overflow-hidden text-ellipsis whitespace-normal text-xs text-gray-400">
                {row.description}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      headerName: 'Status',
      fieldName: 'disabled',
      renderCell: (value) => (
        <div className="flex items-center">
          <div
            className={`mr-2 h-2.5 w-2.5 rounded-full ${value ? 'bg-red-500' : 'bg-green-500'}`}
          />
          {value ? 'Disabled' : 'Active'}
        </div>
      ),
    },
    {
      headerName: 'Actions',
      fieldName: 'actions',
      type: 'actions',
      renderCell: (_, row) => (
        <div>
          <IconButton>
            <Link href={`/products/${row.id}`}>
              <EditIcon />
            </Link>
          </IconButton>
          <IconButton onClick={handleDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const router = useRouter();

  const handleAdd = () => {
    router.push('/products/new');
  };

  return (
    <div className="relative overflow-x-auto px-32 shadow-md">
      <div className="relative overflow-x-auto shadow-md">
        <div className="pb-4 dark:bg-gray-900">
          <div className="relative mt-1 flex">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search for items"
            />
            <div className="w-full" />
            <Button
              disabled={isFetching}
              className="border-none bg-blue-700 font-semibold disabled:bg-blue-400"
              onClick={handleAdd}
            >
              New
            </Button>
          </div>
        </div>
        <StyledGrid columns={columns} rows={products} fetching={isFetching} />
      </div>
    </div>
  );
}
