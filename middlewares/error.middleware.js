// Create a subscription => middleware (check for renewal date) => middleware (check for errors) => next => controller (handles logic of making subscription)

// err = error, req = request, res = response
const errorMiddleware = (err, req, res, next) => {
    try {
        let error = {...err};

        error.message = err.message;

        console.error(err);

        // E.g. Kind of error could be Mongoose bad ObjectID
        if (err.name === 'CastError') {
            const message = 'Resourse not found.';
            error = new Error(message);
            error.statusCode = 404;
        }

        // E.g Kind of error could be Mongoose duplicate key
        if (err.code === 11000) {
            const message = 'Duplicate field value entered'
            error = new Error(message);
            error.statusCode = 400;
        }

        // E.g. Kind of error could be Mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        res.status(err.statusCode || 500).json({success: false, error: error.message || 'Server Error'});
    } catch (error) {
        next(error);
    }
}

export default errorMiddleware