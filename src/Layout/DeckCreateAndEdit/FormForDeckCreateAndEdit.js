import { Link, useRouteMatch } from "react-router-dom";

//created a form component to use in deck create/edit screens
export default function FormForDeckCreateAndEdit({
  handleSubmit,
  handleChange,
  formData,
  location,
  deckId
}) {
  const { url } = useRouteMatch();

  /*
  *declaring a dynamic text variable, the value depends on 
  *the location(either edit or create deck screen)
  */
  let  createOrEditDeckText = "Create Deck"

  if (location === "edit") {
    createOrEditDeckText = "Edit Deck"
  }
  
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          {location === "edit" ? (
            <>
              <li className="breadcrumb-item">
                <Link to={`/decks/${deckId}`}>{formData.deck_name}</Link>
              </li>
            </>
          ) : (
            <></>
          )}
          <li className="breadcrumb-item active">{createOrEditDeckText}</li>
        </ol>
      </nav>
      <h1>{createOrEditDeckText}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          id="deck_name"
          name="deck_name"
          placeholder="Deck Name"
          required={true}
          style={{ width: "100%", marginBottom: ".6rem" }}
          onChange={handleChange}
          value={formData.deck_name}
        />
        <br />
        <label htmlFor="description ">Description </label>
        <br />
        <textarea
          type="textarea"
          id="deck_description"
          name="deck_description"
          required={true}
          placeholder="Brief description of the deck"
          style={{ width: "100%", height: "150px" }}
          onChange={handleChange}
          value={formData.deck_description}
        />
        <div className="d-flex mt-3">
          <Link to="/" className="btn btn-secondary pr-4 pl-4 mr-2">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary pr-4 pl-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
