import path from "path"
import { readRecipes, writeRecipes } from "../helpers/index.js"

const recipesPath = path.resolve("./data/recipes.json")

// ============================================
// GET ALL RECIPES
// ============================================

export const getRecipes = (req, res) => {
	try {
		const recipes = readRecipes(recipesPath)
		res.json(recipes)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// ============================================
// GET ONE RECIPE BY ID
// ============================================

export const getRecipeById = (req, res) => {
	try {
		const recipes = readRecipes(recipesPath)
		const id = parseInt(req.params.id)

		const recipe = recipes.find((r) => r.id === id)

		if (!recipe) {
			return res.status(404).json({ error: "Recette non trouvée" })
		}

		res.json(recipe)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// ============================================
// CREATE A NEW RECIPE
// ============================================

export const createRecipe = (req, res) => {
	try {
		const recipes = readRecipes(recipesPath)

		const newRecipe = {
			id: Date.now(),
			...req.body,
		}

		recipes.push(newRecipe)
		writeRecipes(recipesPath, recipes)

		res.status(201).json(newRecipe)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// ============================================
// UPDATE A RECIPE
// ============================================

export const updateRecipe = (req, res) => {
	try {
		const recipes = readRecipes(recipesPath)
		const id = parseInt(req.params.id)

		const index = recipes.findIndex((r) => r.id === id)

		if (index === -1) {
			return res.status(404).json({ error: "Recette non trouvée" })
		}

		recipes[index] = {
			...recipes[index],
			...req.body,
			id: id,
		}

		writeRecipes(recipesPath, recipes)
		res.json(recipes[index])
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// ============================================
// DELETE A RECIPE
// ============================================

export const deleteRecipe = (req, res) => {
	try {
