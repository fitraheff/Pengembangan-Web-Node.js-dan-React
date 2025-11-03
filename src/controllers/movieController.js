const prisma = require('../config/utils')

const getAllMovies = async (req, res) => {
    try {
        const movies = await prisma.movie.findMany({
            include: {
                category: true
            }
        })
        res.status(200).json(movies)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: error.message })
    }
}

const getMovieById = async (req, res) => {
    try {
        const { id } = req.params
        const movie = await prisma.movie.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                category: true
            }
        })
        
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" })
        }
        res.status(200).json(movie)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: error.message })
    }
}

const createMovie = async (req, res) => {
    try {
        const { title, year, categoryId } = req.body
        const data = {
            title,
            year
        }

        if (categoryId !== undefined && categoryId !== null) {
            data.categoryId = Number(categoryId)
        }

        const movie = await prisma.movie.create({
            data,
            include: {
                category: true
            }
        })
        res.status(201).json(movie)
    } catch (error) {
        console.error(error)
        return res.status(400).json({ message: error.message })
    }
}

const updateMovie = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const { title, year, categoryId } = req.body
        const data = {
            title,
            year
        }

        if ("categoryId" in req.body) {
            data.categoryId = categoryId === null ? null : Number(categoryId)
        }

        const movie = await prisma.movie.update({
            where: {
                id
            },
            data,
            include: {
                category: true
            }
        })

        res.status(200).json(movie)
    } catch (error) {
        console.error(error)
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Movie not found" })
        }
        return res.status(400).json({ message: error.message })
    }
}

const deleteMovie = async (req, res) => {
    try {
        const id = Number(req.params.id)
        await prisma.movie.delete({
            where: {
                id
            }
        })
        res.status(200).json({ message: "Movie deleted successfully" })
    } catch (error) {
        console.error(error)
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Movie not found" })
        }
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { 
    createMovie, 
    getAllMovies, 
    getMovieById, 
    updateMovie, 
    deleteMovie 
} 