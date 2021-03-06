import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { v4 as uuidv4 } from "uuid";
import { RecipeListsContext } from "../../App";
import "./CreateRecipes.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const CreateRecipes = ({
  modalIsOpen,
  closeModal,
  setIsAdded,
  updateRecipe,
  setUpdateRecipe,
}) => {
  const [recipeList, setRecipeList] = useContext(RecipeListsContext);

  const [recipe, setRecipe] = useState({
    recipeTitle: "",
    ingredients: "",
    id: "",
  });

  const onChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (updateRecipe) {
      setRecipe({
        recipeTitle: updateRecipe.recipeTitle,
        ingredients: updateRecipe.ingredients,
      });
    } else {
      setRecipe("");
    }
  }, [setRecipe, updateRecipe]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!updateRecipe) {
      setRecipeList([
        ...recipeList,
        {
          id: uuidv4(),
          recipeTitle: recipe.recipeTitle,
          ingredients: recipe.ingredients,
        },
      ]);
      setIsAdded(true);

      setRecipe({
        recipeTitle: "",
        ingredients: "",
      });
      closeModal();
    } else {
      updateRecipes(updateRecipe.id, recipe.recipeTitle, recipe.ingredients);
      setRecipe({
        recipeTitle: "",
        ingredients: "",
      });
      setIsAdded(true);
      closeModal();
    }
  };

  const updateRecipes = (id, recipeTitle, ingredients) => {
    const newRecipe = recipeList.map((recipe) =>
      recipe.id === id ? { id, recipeTitle, ingredients } : recipe
    );
    setRecipeList(newRecipe);
    setUpdateRecipe("");
  };

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipeList));
  }, [recipeList]);

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="textColor fw-bold">
          Recipe Builder {updateRecipe ? "Update" : "Add"} Form
        </h2>
        <hr />
        <form onSubmit={onFormSubmit} className="form">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label fw-bold">
              Recipe Title
            </label>
            <input
              value={recipe.recipeTitle}
              onChange={onChange}
              name="recipeTitle"
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              required
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label fw-bold">
              Ingredients
            </label>
            <textarea
              value={recipe.ingredients}
              onChange={onChange}
              name="ingredients"
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="4"
              required
            />
          </div>

          <div className="d-flex justify-content-end">
            <button onClick={closeModal} className="text-end btnStyle mx-2">
              Close
            </button>
            <button
              type="submit"
              onClick={setIsAdded(false)}
              className="btnStyle"
            >
              {updateRecipe ? (
                <span className="">Update</span>
              ) : (
                <span className="">Add</span>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CreateRecipes;
