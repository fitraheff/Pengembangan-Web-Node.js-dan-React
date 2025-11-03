const validationBodyMovies = (req, res, next) => {
    const { title, year } = req.body;

    if (!title || !year) {
        return res.status(400).json({ message:'Title and year are required'});
    }

    next();
};

const validationBodyCategory = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message:'Name is required'});
    }

    next();
};

module.exports = {
    validationBodyMovies,
    validationBodyCategory
};