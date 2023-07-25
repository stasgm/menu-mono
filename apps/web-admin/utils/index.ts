import { IProduct } from '@packages/domains';
import { getProductsMock } from '@packages/mocks';
import { IProductsFilterProps } from '@types';

interface IFetchedData {
  idMeal: string;
  strMealThumb?: string;
  strMeal: string;
  strInstructions?: string;
  strArea?: string;
}

export async function fetchProducts(filters: IProductsFilterProps): Promise<IProduct[]> {
  const { limit } = filters;

  const headers = {};

  /** Free datasets
   * https://tiny-blue-vulture-shoe.cyclic.app/burgers
   * www.themealdb.com/api/json/v1/1/list.php?i=list
   */
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=b`, {
    headers: headers,
  });

  if (!response.ok) {
    throw new Error('Failure ' + response.statusText);
  }

  // console.log('response', await response.json());

  const result: { meals: IFetchedData[] } = await response.json();
  const convertedResult: IProduct[] = result.meals.map((r) => ({
    id: r.idMeal,
    name: r.strMeal,
    description: r.strInstructions ?? '',
    image: r.strMealThumb ?? '',
    categories: [],
  }));

  // const mock = getProductsMock();
  // console.log('productsMock', mock);

  // https://goldbelly.imgix.net/uploads/showcase_media_asset/image/137148/Gramercy-Tavern-Burger-and-Kielbasa-Kit-6.4.21-72ppi-1x1-15.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1

  // console.log('convertedResult', convertedResult);

  return convertedResult;
}
