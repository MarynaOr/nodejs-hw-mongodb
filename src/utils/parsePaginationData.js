export const calculatePagintionData = (count, perpage, page) => {
  const totalPages = Math.ceil(count / perpage);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    // data: [],

    page: page,
    perPage: perpage,
    totalItems: count,
    totalPages: totalPages,
    hasPreviousPage: hasPreviousPage,
    hasNextPage: hasNextPage,
  };
};
