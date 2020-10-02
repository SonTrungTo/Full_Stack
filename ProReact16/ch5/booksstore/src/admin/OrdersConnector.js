import { graphql } from "react-apollo";
import { ordersSummaryQuery } from "./clientQueries";
import { OrdersTable } from "./OrdersTable";

const vars = { onlyShipped: false, };