// ============================================
// IMPORTS - Modules nécessaires
// ============================================
import { getAllRecipes, createRecipe } from "./api.js"
import { renderRecipeCard, clearRecipesList } from "./ui.js"

// ============================================
// INITIALISATION DE L'APPLICATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
	loadRecipes()
	setupEventListeners()
})

// ============================================
// CHARGER ET AFFICHER LES RECETTES
// ============================================

const loadRecipes = async () => {
	try {
		const recipes = await getAllRecipes()
		displayRecipes(recipes)
	} catch (error) {
		console.error("Erreur lors du chargement des recettes:", error)
		alert(
			"Impossible de charger les recettes. Vérifiez que le serveur est démarré."
		)
	}
}

// ============================================
// AFFICHER LES RECETTES DANS LA GRID
// ============================================

const displayRecipes = (recipes) => {
	const recipesContainer = document.getElementById("recipes-container")

	clearRecipesList(recipesContainer)

	if (recipes.length === 0) {
		recipesContainer.innerHTML = `
			<div class="col-12">
				<div class="alert alert-info text-center" role="alert">
					Aucune recette disponible. Ajoutez-en une !
				</div>
			</div>
		`
		return
	}

	recipes.forEach((recipe) => {
		const cardHTML = renderRecipeCard(recipe)
		recipesContainer.innerHTML += cardHTML
	})
}

// ============================================
// CONFIGURATION DES EVENT LISTENERS
// ============================================

const setupEventListeners = () => {
	const addRecipeForm = document.getElementById("addRecipeForm")

	if (addRecipeForm) {
		addRecipeForm.addEventListener("submit", handleAddRecipe)
	}
}

// ============================================
// AJOUTER UNE NOUVELLE RECETTE
// ============================================

export const handleAddRecipe = async (event) => {
	// TODO 1: Empêcher le rechargement de la page
	event.preventDefault()

	try {
		// TODO 2: Récupérer les valeurs des champs du formulaire
		const name = document.getElementById("recipeName").value
		const ingredientsRaw = document.getElementById("recipeIngredients").value
		const instructions = document.getElementById("recipeInstructions").value
		const prepTime = parseInt(
			document.getElementById("recipePrepTime").value
		)
		const imageUrl = document.getElementById("recipeImageUrl").value

		// Transformer les ingrédients en tableau
		const ingredients = ingredientsRaw
			.split(",")
			.map((ingredient) => ingredient.trim())

		// TODO 3: Créer un objet recette
		const newRecipe = {
			name,
			ingredients,
			instructions,
			prepTime,
			imageUrl,
		}

		// TODO 4: Appeler l'API pour créer la recette
		await createRecipe(newRecipe)

		// TODO 5: Fermer le modal
		const modalElement = document.getElementById("addRecipeModal")
		const modal = bootstrap.Modal.getInstance(modalElement)
		modal.hide()

		// TODO 6: Afficher un message de succès
		alert("Recette ajoutée avec succès !")

		// TODO 7: Recharger la liste des recettes
		loadRecipes()

		// TODO 8: Réinitialiser le formulaire
		event.target.reset()
	} catch (error) {
		console.error("Erreur lors de l'ajout de la recette:", error)
		alert("Erreur lors de l'ajout de la recette. Veuillez réessayer.")
	}
}
