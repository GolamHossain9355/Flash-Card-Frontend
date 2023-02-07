import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { readDeck } from "../../utils/api";
import ListAllCardsForDeck from "./ListAllCardsForDeck";
import LoaderAnimation from "../CommonFiles/LoaderAnimation";
import DeleteDeckBTN from "../Home/DeleteDeckBTN";

export default function ViewDeckScreen() {
  //deckId to use in the links
  const { deckId } = useParams();

  /*
   *declared a state variable to get the current deck
   *information after the user clicks view from the home screen
   */
  const [currentDeck, setCurrentDeck] = useState({});
  const id = currentDeck.deck_id;

  //getting the current deck information
  useEffect(() => {
    setCurrentDeck({});
    async function loadCurrentDeck() {
      const { data } = await readDeck(deckId);
      setCurrentDeck(data);
    }
    loadCurrentDeck();
  }, [deckId]);

  //*checks if the api call for the deck information from readDeck has returned or not
  if (id) {
    const cards = currentDeck.cards;
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">{currentDeck.deck_name}</li>
          </ol>
        </nav>
        <h3>{currentDeck.deck_name}</h3>
        <p>{currentDeck.deck_description}</p>
        <div className="d-flex justify-content-between">
          <div>
            <Link
              to={`/decks/${id}/edit`}
              className="btn btn-secondary pr-4 pl-4 mr-2"
            >
              Edit
            </Link>
            <Link
              to={`/decks/${id}/study`}
              className="btn btn-primary pr-4 pl-4 mr-2"
            >
              Study
            </Link>
            <Link
              to={`/decks/${id}/cards/new`}
              className="btn btn-primary pr-4 pl-4"
            >
              Add Cards
            </Link>
          </div>
          <DeleteDeckBTN deckId={deckId} checkLocation={"viewDeckScreen"} />
        </div>
        <br />
        <ListAllCardsForDeck
          cards={cards}
          setCurrentDeck={setCurrentDeck}
          deckId={deckId}
        />
      </div>
    );
  }

  //Loading animation while the api call is being made
  return <LoaderAnimation />;
}
