// import axios from "axios";
// import Checkbox from "./checkbox";
// import CrossIcon from "../icons/cross";

import { useState } from 'react';
import { IMenuline } from '@packages/shared';

export default function MenuLine({ item }: { item: IMenuline }) {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    // axios
    //   .post("/api/Lines/update", {
    //     id: Line._id,
    //     text: Line.text,
    //     completed: !Line.completed,
    //   })
    //   .then(reloadLines);
  };

  const decreaseQuantity = () => {
    // axios.post("/api/Lines/delete", { id: Line._id }).then(reloadLines);
  };

  return (
    <div className="flex justify-around items-center bg-white dark:bg-gray-800 shadow-sm py-4 px-6 border-b dark:border-gray-700">
      <p
        className={`flex-1 text-sm text-gray-900 dark:text-gray-100 ${
          item.quantity && 'line-through text-gray-400 dark:text-gray-500'
        }`}
      >
        {item.product.name}
      </p>
      <div className="space-x-2">
        <button
          aria-label="Increase quantity"
          className="focus:outline-none bg-slate-950 rounded-lg w-8 h-8 font-bold hover:bg-slate-600"
          type="button"
          onClick={increaseQuantity}
        >
          +
        </button>
        <text className="flex-1 border-none text-xs sm:text-base bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-0">
          {quantity}
        </text>
        <button
          aria-label="Increase quantity"
          className="focus:outline-none bg-slate-950 rounded-lg w-8 h-8 font-bold hover:bg-slate-600"
          type="button"
          onClick={increaseQuantity}
        >
          -
        </button>
      </div>
    </div>
  );
}
