import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { IMenuline } from '@packages/domains';

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
      } flex justify-between gap-2 border-b border-gray-600 px-2 py-2 sm:gap-4 sm:px-4 sm:py-3`}
    >
      <div className="flex grow gap-2 sm:gap-4">
        {quantity ? (
          <ShoppingBagIcon
            className="h-5 w-5 flex-none cursor-pointer self-center text-blue-500 sm:h-6 sm:w-6"
            onClick={onResetQuantityClicked}
          />
        ) : (
          <ShoppingBagIcon
            className="h-5 w-5 flex-none cursor-pointer self-center text-gray-600 sm:h-6 sm:w-6"
            onClick={onIncreaseQuantityClicked}
          />
        )}
        <div className="flex-1">
          <p className="text-sm text-gray-300  sm:text-base">{item.product.name}</p>
          <p className="text-xs text-gray-500">
            {item.product.categories.reduce(
              (acc, cur) => `${acc}${acc ? ' : ' : ''} ${cur.name}`,
              ''
            )}
          </p>
        </div>
        <p className="self-center text-right text-sm text-gray-300">{item.price}</p>
      </div>
      <div className="flex select-none">
        <button
          className="h-8 w-8 flex-none self-center rounded-lg bg-slate-950 font-bold hover:bg-slate-600 focus:outline-none"
          aria-label="Decrease quantity"
          type="button"
          onClick={onDecreaseQuantityClicked}
        >
          -
        </button>
        <span className="w-10 flex-none self-center text-center text-gray-300">{quantity}</span>
        <button
          className="h-8 w-8 flex-none self-center rounded-lg bg-slate-950 font-bold hover:bg-slate-600 focus:outline-none"
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
