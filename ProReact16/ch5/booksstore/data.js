const faker = require('faker');
const products = [];
const orders = [];
const categories = ["Economics", "Mathematics", "Computer Science", "Psychology"];
faker.seed(100);
for (let i = 1; i <= 503; i++) {
    const category = faker.helpers.randomize(categories);
    products.push({
        id: i,
        image: faker.image.image(300, 300),
        name:   faker.commerce.productName(),
        author: faker.company.companyName(),
        category: category,
        description: `${category}: ${faker.lorem.sentence(3)}`,
        price: Number(faker.commerce.price())
    });
}
for (let i = 1; i <= 103; i++) {
    const fname = faker.name.firstName();
    const lname = faker.name.lastName();
    const order = {
        
    };
}

module.exports = function () {
    return {
        categories,
        products,
        orders: orders
    };
}