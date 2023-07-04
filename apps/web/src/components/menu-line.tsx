import { useState } from 'react';
import { IMenuline } from '@packages/shared';

interface IMenuLineProps {
  item: IMenuline;
  quantity: number;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
}

export default function MenuLine({ item, quantity, increaseQuantity, decreaseQuantity }: IMenuLineProps) {
  return (
    <div
      className={`flex justify-around items-center ${
        quantity ? 'bg-gray-700' : 'bg-gray-800'
      } py-4 px-6 border-b border-gray-600`}
    >
      <p className="flex-1 text-sm text-gray-100">{item.product.name}</p>
      <div>
        <button
          aria-label="Increase quantity"
          className="focus:outline-none bg-slate-950 rounded-lg w-8 h-8 font-bold hover:bg-slate-600"
          type="button"
          onClick={() => increaseQuantity(item.product.id)}
        >
          +
        </button>
        <span className="inline-block w-10 text-center">{quantity}</span>
        <button
          aria-label="Increase quantity"
          className="focus:outline-none bg-slate-950 rounded-lg w-8 h-8 font-bold hover:bg-slate-600"
          type="button"
          onClick={() => decreaseQuantity(item.product.id)}
        >
          -
        </button>
      </div>
    </div>
  );
}
