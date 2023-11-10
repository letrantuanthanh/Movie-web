function paginateData(data, currentPage, pageSize = 20) {
  if (!currentPage) {
    currentPage = 1;
  }

  const totalItems = data?.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  if (currentPage < 1 || currentPage > totalPages) {
    return [];
  }

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return {
    data: data?.slice(startIndex, endIndex),
    page: currentPage,
    totalPages: totalPages,
  };
}

module.exports = paginateData;
