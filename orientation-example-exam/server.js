'use strict'

const routes = require('./routes');
const port = process.env.PORT || 3002;

routes.listen(port, () => {
    console.log(`Allo this is port ${port}`);
});