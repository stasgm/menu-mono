import { Button } from '@components';
import DefaultTooltip from '@components/default-tooltip';
import { StyledGrid, StyledGridColumns } from '@components/styled-grid';
import { Tooltip } from '@components/tooltip';
import { StoreContext } from '@lib/zustand-provider';
import { IProduct } from '@packages/domains';
import { DeleteIcon } from '@public/icons/delete';
import { EditIcon } from '@public/icons/edit';
import { IconButton } from '@public/icons/icon-button';
import { RefreshIcon } from '@public/icons/refresh';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useStore } from 'zustand';

export default function Page() {
  const store = useContext(StoreContext);
  const { products, isFetching, getProducts, removeProduct, refreshProduct, updateProduct } =
    useStore(store!);
  getProducts();

  const router = useRouter();

  const handleDelete = (product: IProduct) => () => {
    removeProduct(product);
  };

  const handleAdd = () => {
    router.push('/products/new');
  };

  const handleRefresh = () => {
    refreshProduct();
  };

  const onQtyMinus = (row: IProduct) => (_: any) => {
    updateProduct({ ...row, quantity: (row.quantity ?? 0) - 1 });
  };

  const onQtyPlus = (row: IProduct) => (_: any) => {
    updateProduct({ ...row, quantity: (row.quantity ?? 0) + 1 });
  };

  const columns: StyledGridColumns = [
    {
      headerName: 'Product name',
      fieldName: 'name',
      renderCell(value, row) {
        return (
          <div className="flex items-center space-x-4">
            <Image
              src={row.image ?? '/no-image.png'}
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
      headerName: 'Qty',
      fieldName: 'quantity',
      renderCell: (value, row) => (
        <div className="flex items-center space-x-3">
          <button
            className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white p-1 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            type="button"
            onClick={onQtyMinus(row)}
          >
            <svg
              className="h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <div>
            <input
              type="number"
              className="block w-14 rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={() => {}}
              value={value ?? 0}
              required
            />
          </div>
          <button
            className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white p-1 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            type="button"
            onClick={onQtyPlus(row)}
          >
            <svg
              className="h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
      ),
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

  return (
    <div className="relative overflow-x-auto px-32">
      <div className="relative overflow-x-auto">
        <div className="pb-4 dark:bg-gray-900">
          <div className="relative mt-1 flex gap-4">
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
            <IconButton onClick={handleRefresh}>
              <div className={isFetching ? 'animate-spin' : 'animate-none'}>
                <RefreshIcon />
              </div>
            </IconButton>
            <Button disabled={isFetching} onClick={handleAdd}>
              New
            </Button>
          </div>
        </div>
        <StyledGrid columns={columns} rows={products} fetching={isFetching} />
      </div>
    </div>
  );
}
