const handler404 = (req, res) => {
    return res.status(404).json(
        {
            status: 404,
            message: 'Error 404! Page not found'
        }
    )
}

module.exports = handler404;