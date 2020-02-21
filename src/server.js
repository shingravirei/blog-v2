const app = require('./config/app');
const { PORT } = require('./config/utils');

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
