const server = require('./server');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

mongoose
  .connect('mongodb://localhost/jscript-330-week-2', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
    });
  });
