import { IProduct } from '@packages/domains';

interface IProps {
  data: IProduct[];
}

const ProductList = ({ data }: IProps) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-slate-700 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-400">
              <thead className="bg-gray-800 text-xs font-medium uppercase  tracking-wider text-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Status
                  </th>
                  <th scope="col" colSpan={2} className="px-6 py-3 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-500 bg-gray-700 bg-opacity-50">
                {data.map((product) => (
                  <tr key={product.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-base text-gray-200">{product.name}</div>
                      <div className="text-xs text-gray-400">
                        {product.categories.map((el) => el.name).join(' | ')}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-xs font-normal text-gray-400">
                      <span
                        className={`${
                          product.disabled ? ' bg-amber-950' : ' bg-emerald-950'
                        } inline-flex rounded-xl px-4 py-2`}
                      >
                        {product.disabled ? 'Not active' : 'Active'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                      <a href="#" className="text-gray-400 hover:text-gray-200 ">
                        Edit
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                      <a href="#" className="text-rose-500 hover:text-rose-200">
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
