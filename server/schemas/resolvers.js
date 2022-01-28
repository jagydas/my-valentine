const { AuthenticationError } = require('apollo-server-express');
const { User, Gift, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        categories: async() => {
            return await Category.find();
        },
        gifts: async(parent, { category, name }) => {
            const params = {};

            if (category) {
                params.category = category;
            }

            if (name) {
                params.name = {
                    $regex: name
                };
            }

            return await Gift.find(params).populate('category');
        },
        gift: async(parent, { _id }) => {
            return await Gift.findById(_id).populate('category');
        },
        user: async(parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.gifts',
                    populate: 'category'
                });

                user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return user;
            }

            throw new AuthenticationError('Not logged in');
        },
        order: async(parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.gifts',
                    populate: 'category'
                });

                return user.orders.id(_id);
            }

            throw new AuthenticationError('Not logged in');
        }
    },
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addOrder: async(parent, { gifts }, context) => {
            console.log(context);
            if (context.user) {
                const order = new Order({ gifts });

                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

                return order;
            }

            throw new AuthenticationError('Not logged in');
        },
        updateUser: async(parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }

            throw new AuthenticationError('Not logged in');
        },
        updateGift: async(parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;

            return await Gift.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        },
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        }
    }
};

module.exports = resolvers;