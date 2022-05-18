function paginate(page = 1, limit = 8) {
  const offset = (page - 1) * limit;
  return offset;
}

module.exports = {
  paginate,
};
