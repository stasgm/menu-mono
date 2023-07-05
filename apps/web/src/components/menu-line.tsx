import { IMenuline } from '@packages/domains';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';

interface IMenuLineProps {
  item: IMenuline;
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
}

export default function MenuLine({ item, quantity, increaseQuantity, decreaseQuantity }: IMenuLineProps) {
  return (
    <div className={`${quantity ? 'bg-gray-700' : 'bg-gray-800'} py-4 px-4 border-b border-gray-600`}>
      <div className="flex gap-4">
        {quantity ? (
          <ShoppingBagIcon className="flex-none self-center text-sm h-5 w-5 text-blue-500" />
        ) : (
          <ShoppingBagIcon
            className="flex-none self-center text-sm h-5 w-5 text-gray-600"
            onMouseUp={increaseQuantity}
          />
        )}
        <p className="grow self-center text-sm text-gray-300">{item.product.name}</p>
        <p className="flex-none self-center w-24 text-sm text-gray-300 text-center">{item.price}</p>
        <button
          className="flex-none focus:outline-none bg-slate-950 rounded-lg w-8 h-8 font-bold hover:bg-slate-600"
          aria-label="Increase quantity"
          type="button"
          onClick={increaseQuantity}
        >
          +
        </button>
        <span className="flex-none w-10 text-center self-center text-gray-300">{quantity}</span>
        <button
          className="flex-none focus:outline-none bg-slate-950 rounded-lg w-8 h-8 font-bold hover:bg-slate-600"
          aria-label="Decrease quantity"
          type="button"
          onClick={decreaseQuantity}
        >
          -
        </button>
      </div>
    </div>
  );
}
