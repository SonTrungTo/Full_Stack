module.exports = function () {
    return {
        categories: ["Economics", "Mathematics", "Computer Science"],
        products: [
            {
                id: 1, 
                name: "Microeconomic Theory",
                author: "MWG",
                category: "Economics",
                description: "A classic text in Microeconomics for first-year Ph.D students",
                price: 135
            },
            {
                id: 2,
                name: "Calculus",
                author: "Tom Apostol",
                category: "Mathematics",
                description: "A text used for freshmen at MIT in mathematics",
                price: 48.95
            },
            {
                id: 3,
                name: "Structure and Interpretation of Computer Programs",
                author: "Whatever",
                category: "Computer Science",
                description: "A classic text for UC Berkeley EECS CS61A",
                price: 19.50
            },
            {
                id: 4,
                name: "Advanced Macroeconomics",
                author: "David Romer",
                category: "Economics",
                description: "A text of macroeconomics for graduate students",
                price: 21.45
            },
            {
                id: 5,
                name:       "Principles of Mathematical Analysis",
                author:     "Walter Rudin",
                category:   "Mathematics",
                description: "Standard undegrad analysis at MIT",
                price: 46
            },
            {
                id: 6,
                name:       "Algebra",
                author:     "Michael Artin",
                category:   "Mathematics",
                description: "Standard undegrad algebra at Harvard",
                price: 23
            },
            {
                id: 7,
                name:       "Statistical Inference",
                author:     "George Casella",
                category:   "Mathematics",
                description: "First year grad student in Statistics",
                price: 22.95
            },
            {
                id: 8,
                name:       "Linear Algebra",
                author:     "Hoffman-Kunze",
                category:   "Mathematics",
                description: "Linear algebra for freshmen at MIT",
                price: 15.64
            },
            {
                id: 9,
                name:       "Introduction to Algorithms",
                author:     "CLRS",
                category:   "Computer Science",
                description: "Used at Harvard CS124 and Berkeley CS170",
                price: 27.5
            }
        ],
        orders: []
    };
}