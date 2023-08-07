const paginateResults = (req, res, next) => {
    const limit = req.query.limit || 5;
    const page = req.query.page || 1;
    req.pagination.page = page;
    req.pagination.limit = limit;
    req.pagination.offset = (page - 1) * limit
}

module.exports = paginateResults