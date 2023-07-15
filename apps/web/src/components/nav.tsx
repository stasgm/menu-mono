import { formatPrice } from '@packages/utils';

interface IProps {
  totalProductQuantity: number;
  totalAmount: number;
  placeOrder: () => void;
  resetCart: () => void;
}

export default function Nav(props: IProps) {
  const { resetCart, placeOrder, totalAmount, totalProductQuantity } = props;

  return (
    <>
      <div className="mb-2 flex justify-between rounded-b-md bg-gray-800 px-2 py-2 text-sm font-bold text-gray-500 sm:mb-4 sm:px-6 sm:py-4">
        <p className="flex-1 self-center">{`Total products: ${totalProductQuantity}`}</p>
        <div className="inline-flex w-2/5 justify-between sm:w-1/4">
          <p>Total price:</p>
          <p>{formatPrice(totalAmount)}</p>
        </div>
      </div>
      <nav className="mt-0 flex items-center justify-between rounded-md bg-gray-800 p-2 px-2 text-sm font-bold">
        <button
          className="rounded-md bg-slate-900 p-2 px-4 hover:bg-slate-700 focus:outline-none active:bg-gray-600 active:text-gray-400"
          onClick={resetCart}
        >
          New order
        </button>
        <button
          className="rounded-md bg-slate-950 p-2 px-4 hover:bg-slate-700 focus:outline-none active:bg-gray-600 active:text-gray-400"
          onClick={placeOrder}
        >
          Place order
        </button>
      </nav>
    </>
  );
}
