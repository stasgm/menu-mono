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
      <div className="flex justify-between text-sm text-gray-500 bg-gray-800 rounded-b-md sm:py-4 py-2 sm:px-6 px-2 font-bold mb-2 sm:mb-4">
        <p className="flex-1 self-center">{`Total products: ${totalProductQuantity}`}</p>
        <div className="inline-flex justify-between sm:w-1/4 w-2/5">
          <p>Total price:</p>
          <p>{formatPrice(totalAmount)}</p>
        </div>
      </div>
      <nav className="flex justify-between items-center text-sm bg-gray-800 rounded-md px-2 p-2 mt-0 font-bold">
        <button
          className="hover:bg-slate-700 focus:outline-none bg-slate-900 rounded-md p-2 px-4 active:bg-gray-600 active:text-gray-400"
          onClick={resetCart}
        >
          New order
        </button>
        <button
          className="hover:bg-slate-700 focus:outline-none bg-slate-950 rounded-md p-2 px-4 active:bg-gray-600 active:text-gray-400"
          onClick={placeOrder}
        >
          Place order
        </button>
      </nav>
    </>
  );
}
