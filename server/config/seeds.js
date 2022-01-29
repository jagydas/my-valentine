const db = require('./connection');
const { User, Category, Gift } = require('../models');

db.once('open', async() => {
    await Category.deleteMany();

    const categories = await Category.insertMany([
        { name: 'Cards' },
        { name: 'Teddy' },
        { name: 'Flowers' },
        { name: 'Wine' },
        { name: 'Chocolates' }
    ]);

    console.log('categories seeded');

    await Gift.deleteMany();

    const gifts = await Gift.insertMany([{
            name: 'I Love You',
            description: 'Express Your Love',
            image: 'Valentines-card-1.jpg',
            category: categories[0]._id,
            price: 2.99,
            quantity: 500
        },
        {
            name: 'Happy Valentines Day',
            description: 'Express Your Love From a Safe Distance',
            image: 'Valentines-card-2.jpg',
            category: categories[0]._id,
            price: 2.99,
            quantity: 500
        },

        {
            name: 'Valentines Day',
            description: 'Happy Valentines Day',
            image: 'Valentines-card-3.jpg',
            category: categories[0]._id,
            price: 2.99,
            quantity: 500
        },

        {
            name: 'You Won My Heart',
            description: 'Happy Valentines Day',
            image: 'Valentines-card-5.jpg',
            category: categories[0]._id,
            price: 2.99,
            quantity: 500
        },

        {
            name: 'Pink Teddy',
            category: categories[1]._id,
            description: 'Pink Teddy',
            image: 'Valentines-gift-1.jpg',
            price: 25.99,
            quantity: 2
        },
        {
            name: 'Brown Teddy',
            category: categories[1]._id,
            description: 'Brown Teddy with heart',
            image: 'Valentines-gift-2.jpg',
            price: 20.99,
            quantity: 1
        },
        {
            name: 'Couple Teddy',
            category: categories[1]._id,
            description: 'Teddy Couple',
            image: 'Valentines-gift-3.jpg',
            price: 30.99,
            quantity: 10
        },
        {
            name: 'Flower',
            category: categories[2]._id,
            description: 'Flower with red Vase',
            image: 'Valentines-flower-1.jpg',
            price: 80.99,
            quantity: 30
        },
        {
            name: 'Roses and Lily Flower',
            category: categories[2]._id,
            description: 'Mixed flower bunch',
            image: 'Valentines-flower-2.jpg',
            price: 90.99,
            quantity: 30
        },
        {
            name: 'To The Eternity',
            category: categories[2]._id,
            description: 'Single red Rose',
            image: 'Valentines-flower-3.jpg',
            price: 9.99,
            quantity: 100
        },

        {
            name: 'Wine',
            category: categories[3]._id,
            description: 'Wine.',
            image: 'Valentines-wine-1.jpg',
            price: 2.99,
            quantity: 1000
        },
        {
            name: 'Red Wine',
            category: categories[3]._id,
            description: 'Red Wine.',
            image: 'Valentines-wine-3.jpg',
            price: 30.99,
            quantity: 10
        },
        {
            name: 'Wine Combo',
            category: categories[3]._id,
            description: 'Red Wine.',
            image: 'Valentines-wine-4.jpg',
            price: 35.99,
            quantity: 10
        },
        {
            name: 'Chocolate',
            category: categories[4]._id,
            description: 'Box of Chocolate.',
            image: 'Valentines-chocolate-4.jpg',
            price: 70.99,
            quantity: 10
        },
        {
            name: 'Chocolate',
            category: categories[4]._id,
            description: 'Red Box of Chocolate.',
            image: 'Valentines-chocolate-2.jpg',
            price: 90.99,
            quantity: 10
        },

        {
            name: 'Chocolate Pop',
            category: categories[4]._id,
            description: 'Chocolate Pop.',
            image: 'Valentines-chocolate-5.jpg',
            price: 90.99,
            quantity: 10
        }
    ]);

    console.log('gift seeded');

    await User.deleteMany();

    await User.create({
        firstName: 'Jagy',
        lastName: 'Das',
        email: 'jagy@testmail.com',
        password: 'password12345',
        orders: [{
            gifts: [gifts[0]._id, gifts[0]._id, gifts[1]._id]
        }]
    });

    await User.create({
        firstName: 'Mital',
        lastName: 'Goha',
        email: 'mital@testmail.com',
        password: 'password12345'
    });

    console.log('users seeded');

    process.exit();
});