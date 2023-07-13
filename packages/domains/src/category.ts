export interface ICategory {
  id: string;
  name: string;
}

export type ICategoryData = ICategory;

export const getCategory = (categories: ICategory[], categoryId: string): ICategory => {
  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    throw new Error('Category not found');
  }

  return category;
};
