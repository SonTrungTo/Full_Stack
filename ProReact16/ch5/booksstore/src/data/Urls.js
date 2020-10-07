import { DataTypes } from "./Types";

// const protocol = "http";
// const hostname = "localhost";
// const port     = 3500;

export const RestUrls = {
    [DataTypes.CATEGORIES]: `/api/categories`,
    [DataTypes.PRODUCTS]: `/api/products`,
    [DataTypes.ORDERS]: `/api/orders`
};

export const GraphQlUrl = `/graphql`;

export const authUrl = `$/login`;