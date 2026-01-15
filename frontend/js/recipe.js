// ============================================
// IMPORTS - Modules nécessaires
// ============================================
import { getOneRecipe, deletOneRecipe } from "./api.js"
import { renderSingleRecipe } from "./ui.js"

// ============================================
// CHARGER UNE RECETTE PAR ID
// ============================================

const loadRecipe = async (recipeId) => {
	try {
		// Appeler l'API pour récupérer la recette
		const recipe = await getOneRecipe(recipeId)

		const recipeDetail = document.getElementById("recipe-detail")
		recipeDetail.innerHTML = renderSingleRecipe(recipe)
	} catch (error) {
		console.error("Erreur lors du chargement de la recette:", error)
		alert(
			"Impossible de charger la recette. Vérifiez que le serveur est démarré."
		)
	}
}

// ============================================
// SUPPRIMER UNE RECETTE
// ============================================

const handleDeleteRecipe = async (recipeId) => {
	const confirmDelete = confirm(
		"Êtes-vous sûr de vouloir supprimer cette recette ?"
	)

	if (!confirmDelete) return

	try {
		await deletOneRecipe(recipeId)
		alert("Recette supprimée avec succès")

		// Redirection vers la page principale
		window.location.href = "index.html"
	} catch (error) {
		console.error("Erreur lors de la suppression:", error)
		alert("Erreur lors de la suppression de la recette")
	}
}

// ============================================
// INITIALISATION DE L'APPLICATION
// ============================================

const setupEventListeners = (recipeId) => {
	const loader = document.getElementById("loading-spinner")
	const recipeDetail = document.getElementById("recipe-detail")
	const deleteButton = document.getElementById("delete-recipe-btn")

	if (loader) loader.classList.add("d-none")
	if (recipeDetail) recipeDetail.classList.remove("d-none")

	if (deleteButton) {
		deleteButton.addEventListener("click", () => {
			handleDeleteRecipe(recipeId)
		})
	}
}

document.addEventListener("DOMContentLoaded", () => {
	// Récupérer l'id depuis l'URL
	const urlParams = new URLSearchParams(window.location.search)
	const recipeId = urlParams.get("id")

	if (!recipeId) {
		alert("Aucune recette sélectionnée")
		return
	}

	loadRecipe(recipeId)
	setupEventListeners(recipeId)
})
