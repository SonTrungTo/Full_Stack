const paginateQuery = (query, page = 1, pageSize = 5) =>
    query.drop((page - 1) * pageSize).take(pageSize);