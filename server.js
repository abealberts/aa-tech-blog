const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const { sequelize } = require('./config/connection');
const path = require('path');
const routes = require('./controllers');
const seed = require('./seeds/seed');
const { User } = require('./models');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create Express application
const app = express();
const PORT = process.env.PORT || 3001;

// Create Handlebars instance
const hbs = exphbs.create({ helpers });



// Session configuration
const sess = {
  secret: 'youwillneverguessit!',
  cookie: { maxAge: 3600000 }, // 1 hour
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Set up session middleware
app.use(session(sess));

// Set up Handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server after syncing database
sequelize.sync({ force: false }).then(async () => {
  const seeds = await User.findAll();
  if (seeds) {
    await sequelize.drop();
    await seed();
  }
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});