const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({"error": err.message, "message": "Something went wrong in the server"})
};

export default errorHandler

