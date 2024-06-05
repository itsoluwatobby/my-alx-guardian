const pagination = async (pageNumber, limit, Model, queryObj = {}) => {
  const dataLength = +limit;
  const currentPage = +pageNumber;
  const startIndex = (currentPage * dataLength) - dataLength;
  const resultLength = await Model.find(queryObj).countDocuments();
  const data = await Model.find(queryObj).skip(startIndex).limit(dataLength);

  const total = Math.ceil(resultLength / dataLength);
  const pagesLeft = total - currentPage;
  const returnedVal = (currentPage > total) || (currentPage < 1);
  const pageable = {
    pages: {
      previous: (currentPage === 1 || returnedVal) ? null : currentPage - 1,
      current: currentPage,
      next: (currentPage === total || returnedVal) ? null : currentPage + 1,
    },
    length: data?.length,
    pagesLeft: pagesLeft >= 0 ? pagesLeft : 0,
    numberOfPages: total,
  };
  return { pageable, data };
};

module.exports = { pagination };
