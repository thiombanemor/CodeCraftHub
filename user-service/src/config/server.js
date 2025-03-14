const app = require('../app');

const PORT = process.env.PORT || 5000;

/**
 * Starts the Express server on the specified port.
 */
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
