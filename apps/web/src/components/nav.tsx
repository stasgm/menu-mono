interface IProps {
  productAmount: number;
  orderPriceAmount: number;
  filter: 'all' | 'selected' | 'unselected';
  setFilter: (state: 'all' | 'selected' | 'unselected') => void;
  placeOrder: () => void;
  resetOrder: () => void;
}

export default function Nav(props: IProps) {
  const { productAmount, orderPriceAmount, filter, setFilter, placeOrder, resetOrder } = props;

  const showAllLines = () => {
    setFilter('all');
  };
  const showUnselectedLines = () => {
    setFilter('unselected');
  };
  const showSelectedLines = () => {
    setFilter('selected');
  };

  return (
    <>
      <div className="flex justify-between text-sm text-gray-500 bg-gray-800 rounded-b-md py-4 px-6 font-bold sm:mb-4 sm-0">
        <p className="hidden sm:block">{`${productAmount} products selected`}</p>
        <p>{`Total price: ${orderPriceAmount}`}</p>
      </div>
      <nav className="text-sm sm:flex justify-between items-center bg-gray-800 text-gray-500 rounded-md mt-6 px-2 pl-6 sm:mt-0">
        <ul className="flex justify-center items-center space-x-2 h-12 font-bold">
          <li>
            <button
              className={`${filter === 'all' && 'text-blue-600'} hover:text-blue-900 focus:outline-none `}
              onClick={showAllLines}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={`${filter === 'selected' && 'text-blue-600'} hover:text-blue-900 focus:outline-none`}
              onClick={showSelectedLines}
            >
              Selected
            </button>
          </li>
          <li>
            <button
              className={`${filter === 'unselected' && 'text-blue-600'} hover:text-blue-900 focus:outline-none`}
              onClick={showUnselectedLines}
            >
              Unselected
            </button>
          </li>
        </ul>
        <div className="flex justify-center space-x-2 font-bold">
          <button
            className="hover:text-gray-600 outline-slate-200 hidden sm:block focus:outline-none rounded-md p-2 px-4 active:text-gray-400"
            onClick={resetOrder}
          >
            Reset order
          </button>
          <button
            className="hover:bg-slate-700 hidden sm:block focus:outline-none bg-slate-950 rounded-md p-2 px-4 active:bg-gray-600 active:text-gray-400"
            onClick={placeOrder}
          >
            Place order
          </button>
        </div>
      </nav>
    </>
  );
}
