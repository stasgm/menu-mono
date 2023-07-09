import { IMenuline } from '@packages/domains';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';

interface IProps {
  item: IMenuline;
  quantity: number;
  onIncreaseQuantityClicked: () => void;
  onDecreaseQuantityClicked: () => void;
  onResetQuantityClicked: () => void;
}

export default function MenuLine({
  item,
  quantity,
  onIncreaseQuantityClicked,
  onDecreaseQuantityClicked,
  onResetQuantityClicked,
}: IProps) {
  return (
    <div
      className={`${
        quantity ? 'bg-gray-700' : 'bg-gray-800'
      } flex sm:py-3 py-2 sm:px-4 px-2 border-b border-gray-600 sm:gap-4 gap-2 justify-between`}
    >
      <div className="flex grow sm:gap-4 gap-2">
        {quantity ? (
          <ShoppingBagIcon
            className="flex-none self-center sm:h-6 sm:w-6 h-5 w-5 text-blue-500 cursor-pointer"
            onClick={onResetQuantityClicked}
          />
        ) : (
          <ShoppingBagIcon
            className="flex-none self-center sm:h-6 sm:w-6 h-5 w-5 text-gray-600 cursor-pointer"
            onClick={onIncreaseQuantityClicked}
          />
        )}
        <div className="flex-1">
          <p className="sm:text-base text-sm  text-gray-300">{item.product.name}</p>
          <p className="text-xs text-gray-500">
            {item.product.categories.reduce((acc, cur) => `${acc}${acc ? ' : ' : ''} ${cur.name}`, '')}
          </p>
        </div>
        <p className="self-center text-sm text-gray-300 text-right">{item.price}</p>
      </div>
      <div className="flex">
        <button
          className="flex-none focus:outline-none bg-slate-950 rounded-lg w-8 h-8 font-bold hover:bg-slate-600 self-center"
          aria-label="Decrease quantity"
          type="button"
          onClick={onDecreaseQuantityClicked}
        >
          -
        </button>
        <span className="flex-none w-10 text-center self-center text-gray-300">{quantity}</span>
        <button
          className="flex-none focus:outline-none bg-slate-950 rounded-lg w-8 h-8 font-bold hover:bg-slate-600 self-center"
          aria-label="Increase quantity"
          type="button"
          onClick={onIncreaseQuantityClicked}
        >
          +
        </button>
      </div>
    </div>
  );
}
