export const clearURLParams = (
  params: Array<string>,
  searchParams: URLSearchParams,
): void => {
  params.forEach(item => {
    searchParams.delete(item);
  });
};
