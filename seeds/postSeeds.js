const { Post } = require('../models');

const data = [{
        title: 'New UI Package Is Awesome!',
        body: "Y'all ever hear of Material UI? Just discovered it and am having a blast working with it. Looks great and feels amazing to use.",
        user_id: 1,
    },
    {
        title: 'Package Updates Broke Everything... Again!',
        body: "Been working on my new project for a long time now... Had to update a couple of my dependancies and guess what? SYNTAX CHANGES! Hello ERRORS!!! If anyone needs me, I'll be crying and reading the new documentation.",
        user_id: 2,
    },
    {
        title: 'Anybody have experience with React?',
        body: "I've been playing around with handlebars.js and I gotta say... Kinda bad! I've seen people talk about how great React is. Wondering if I should give it a try? (Definitely not foreshadowing...)",
        user_id: 3,
    }
];

const postSeeds = () => Post.bulkCreate(data);

module.exports = postSeeds;

