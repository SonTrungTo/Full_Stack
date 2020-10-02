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