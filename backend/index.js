const app = require('./app'); // the actual Express app
const config = require('./utils/config');

const PORT = process.env.PORT || config.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`If frontend built, access the app at http://localhost:${PORT}`);
});