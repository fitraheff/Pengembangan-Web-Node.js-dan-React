// src/controllers/categoryController.js
const prisma = require('../config/utils');

//READ
const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: { movies: true } // sertakan movies yang berhubungan
        });
        return res.json(categories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getCategoryById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const category = await prisma.category.findUnique({
            where: { id },
            include: { movies: true }
        });

        if (!category) return res.status(404).json({ message: 'Category not found' });
        return res.json(category);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

//CREATE
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = await prisma.category.create({
            data: { name, description }
        });
        return res.status(201).json(category);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
}

//UPDATE
const updateCategory = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, description } = req.body;

        const category = await prisma.category.update({
            where: { id },
            data: { name, description }
        });
        return res.json(category);
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Category not found' });
        }
        return res.status(400).json({ message: error.message });
    }
}

//DELETE
const deleteCategory = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        // Karena relation di prisma onDelete: SetNull, saat delete category, movie.categoryId akan jadi null
        await prisma.category.delete({ where: { id } });
        return res.json({ message: 'Category deleted' });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Category not found' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
