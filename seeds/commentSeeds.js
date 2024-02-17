
const { Comment } = require('../models');

const data = [{
        body: "I've used it... It's alright...",
        user_id: 2,
        project_id: 1
    },
    {
        body: "Been looking for something like this... Might have to give it a try!",
        user_id: 3,
        project_id: 1
    },
    {
        body: "How about fix it instead of whining about it online?",
        user_id: 1,
        project_id: 2
    },
    {
        body: "Crazy story man... I just don't remember asking?",
        user_id: 3,
        project_id: 2
    },
    {
        body: "React good handlebars bad",
        user_id: 1,
        project_id: 3
    },
    {
        body: "Right because you're totalling not going back and working on this project after completing the React units or anything hahahaha totally not no way ahaha",
        user_id: 2,
        project_id: 3
    }
];

const commentSeeds = () => Comment.bulkCreate(data);

module.exports = commentSeeds;


