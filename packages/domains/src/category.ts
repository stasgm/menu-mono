export interface ICategory {
  id: number;
  name: string;
}

export const getCategory = (categories: ICategory[], categoryId: number): ICategory => {
  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    throw new Error('Category not found');
  }

  return category;
};
