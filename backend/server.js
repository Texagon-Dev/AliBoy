// server.js
const express = require('express');
const bookPrintingOrderRoute = require('./routes/bookPrintingOrderRoute');
const storyBooksRoute = require('./routes/storyBooksRoute');
const profilePictureRoute = require('./routes/profilePictureRoute');
const romanticStoryRoute = require('./routes/romanticStoryRoute');
const actionStoryRoute = require('./routes/actionStoryRoute');
const comedyStoryRoute = require('./routes/comedyStoryRoute');
const mysteryStoryRoute = require('./routes/mysteryStoryRoute');
const fantasyStoryRoute = require('./routes/fantasyStoryRoute');
const scifiStoryRoute = require('./routes/scifiStoryRoute');
const horrorStoryRoute = require('./routes/horrorStoryRoute');



const app = express();
app.use(express.json());

// Use user routes
app.use('/api/v1', bookPrintingOrderRoute);
app.use('/api/v1', storyBooksRoute);
app.use('/api/v1', profilePictureRoute);
app.use('/api/v1', romanticStoryRoute);
app.use('/api/v1', actionStoryRoute);
app.use('/api/v1', comedyStoryRoute);
app.use('/api/v1', mysteryStoryRoute);
app.use('/api/v1', fantasyStoryRoute);
app.use('/api/v1', scifiStoryRoute);
app.use('/api/v1', horrorStoryRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
