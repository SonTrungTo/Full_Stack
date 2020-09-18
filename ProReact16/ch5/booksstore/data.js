module.exports = function () {
    return {
        categories: ["Economics", "Mathematics", "Computer Science"],
        products: [
            {
                id: 1, 
                name: "Microeconomic Theory",
                category: "Economics",
                description: "A classic text in Microeconomics for first-year Ph.D students",
                price: 135
            },
            {
                id: 2,
                name: "Calculus",
                category: "Mathematics",
                description: "A text used for freshmen at MIT in mathematics",
                price: 48.95
            },
            {
                id: 3,
                name: "Structure and Interpretation of Computer Programs",
                category: "Computer Science",
                description: "A classic text for UC Berkeley EECS CS61A",
                price: 19.50
            }
        ],
        orders: []
    };
}