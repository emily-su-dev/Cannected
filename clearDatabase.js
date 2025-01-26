const mongoose = require('mongoose');

// MongoDB Connection URI (update with your database URI if different)
const dbURI = 'mongodb://localhost:27017/myapp'; // Replace 'myapp' with your database name

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');

        // Get all the collections in the database
        const collections = await mongoose.connection.db.listCollections().toArray();

        if (collections.length === 0) {
            console.log('No collections found in the database.');
            process.exit(0);
        }

        // Loop through each collection and delete all documents
        for (const collection of collections) {
            await mongoose.connection.db.collection(collection.name).deleteMany({});
            console.log(`Deleted all documents from collection: ${collection.name}`);
        }

        // Optional: Drop all collections (Uncomment if you want to drop collections entirely)
        // for (const collection of collections) {
        //   await mongoose.connection.db.collection(collection.name).drop();
        //   console.log(`Dropped collection: ${collection.name}`);
        // }

        console.log('All collections cleared!');
        mongoose.connection.close(); // Close the connection after clearing the database
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error);
        process.exit(1);
    });
