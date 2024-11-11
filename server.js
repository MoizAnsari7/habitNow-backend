const seedDefaultCategories = require('./seeds/defaultCategories');

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, async () => {
    console.log("Database connected");
    await seedDefaultCategories();
});
