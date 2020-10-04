import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";
import { ProductsTable } from "./ProductsTable";
import { productsList } from "./clientQueries";
import { deleteProduct } from "./clientMutations";

const vars = {page: 1, pageSize: 10, sort: "id"};

export const ProductsConnector = compose(
    graphql(productsList, {
        options: (props) => ({variables: vars}),
        props: ({data: {loading, products, refetch}}) => ({
            totalSize: loading ? 0 : products.totalSize,
            products: loading ? [] : products.products,
            currentPage: vars.page,
            pageSize: vars.pageSize,
            pageCount: loading ? 0 : Math.ceil( products.totalSize / vars.pageSize ),
            sortKey: vars.sort,
            navigateToPage: (page) => {vars.page = page; refetch(vars)},
            setPageSize: (size) => {vars.pageSize = size; refetch(vars)},
            setSortProperty: (sort) => {vars.sort = sort; refetch(vars)}
        })
    }),
    graphql(deleteProduct, {
        options: {
            update: (cache, {data: {deleteProduct: {id}}}) => {
                const queryDetails = {query: productsList, variables: vars};
                const data = cache.readQuery(queryDetails);
                data.products.products =
                    data.products.products.filter(p => p.id !== id);
                data.products.totalSize -= 1;
                cache.writeQuery({...queryDetails, data});
            }
        },
        props: ({mutate}) => ({
            deleteProduct: (id) => mutate({variables: {id}})
        })
    })
)(ProductsTable);