export const processCategories = (categories) => {
  return categories.map((category) => ({
    where: { category },
    create: { category, slug },
  }));
};
