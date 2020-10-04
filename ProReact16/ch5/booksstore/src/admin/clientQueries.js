import gql from "graphql-tag";

export const ordersSummaryQuery = gql`
    query($onlyShipped: Boolean, $page: Int, $pageSize: Int, $sort: String) {
        orders(onlyUnshipped: $onlyShipped) {
            totalSize,
            orders(sort: $sort, page: $page, pageSize: $pageSize) {
                id, name, email, shipped,
                products {
                    quantity,
                    product {
                        price
                    }
                }
            }
        }
    }
`;

export const productsList = gql`
    query($page: Int, $pageSize: Int, $sort: String) {
        products {
            totalSize,
            products(sort: $sort, page: $page, pageSize: $pageSize) {
                id, name, category, price
            }
        }
    }
`;

export const product = gql`
    query($id: ID!) {
        product(id: $id) {
            id, name, description, category, price, image, author
        }
    }
`;