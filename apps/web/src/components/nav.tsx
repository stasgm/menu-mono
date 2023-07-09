import { formatPrice } from '@packages/utils';

interface IProps {
  productAmount: number;
  orderPriceAmount: number;
  placeOrder: () => void;
  resetOrder: () => void;
}

export default function Nav(props: IProps) {
  const { productAmount, orderPriceAmount, placeOrder, resetOrder } = props;

  return (
    <>
      <div className="flex justify-between text-sm text-gray-500 bg-gray-800 rounded-b-md sm:py-4 py-2 sm:px-6 px-2 font-bold mb-2 sm:mb-4">
        <p className="flex-1 self-center">{`Total products: ${productAmount}`}</p>
        <div className="inline-flex justify-between sm:w-1/4 w-2/5">
          <p>Total price:</p>
          <p>{formatPrice(orderPriceAmount)}</p>
        </div>
      </div>
      <nav className="flex justify-between items-center text-sm bg-gray-800 rounded-md px-2 p-2 mt-0 font-bold">
        <button
          className="hover:bg-slate-700 focus:outline-none bg-slate-900 rounded-md p-2 px-4 active:bg-gray-600 active:text-gray-400"
          onClick={resetOrder}
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
