import React, { useEffect, useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";

import CardsForStudyDeckScreen from "./CardsForStudyDeckScreen";
import LoaderAnimation from "../CommonFiles/LoaderAnimation";
import { readDeck } from "../../utils/api";

export default function StudyDeckScreen({ deckId }) {
  /*
  getting the current url to use in the deck name breadcrumb 
  link as a redundant path so it wont do anything
  */
  const { url } = useRouteMatch();

  /*
   *declared a state variable to get the current deck
   *information after the user clicks study from the home screen
   */
  const [currentDeck, setCurrentDeck] = useState({});

  //getting the current deck information
  useEffect(() => {
    setCurrentDeck({});
    async function loadDeck() {
      const { data } = await readDeck(deckId);
      setCurrentDeck(data);
    }
    loadDeck();
  }, [deckId]);

  //*checks if the api call for the deck information from readDeck has returned or not
  if (currentDeck.deck_id) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{currentDeck.deck_name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>{currentDeck.deck_name}: Study</h1>
        {currentDeck.cards.length > 2 ? (
          <CardsForStudyDeckScreen currentDeck={currentDeck.cards} />
        ) : (
          <div>
            <h3 className="text-danger">Not enough cards</h3>
            <p className="text-warning bg-dark">
              You need at least 3 cards to study. There are{" "}
              {currentDeck.cards.length} cards in this deck.
            </p>
            <Link
              to={`/decks/${currentDeck.deck_id}/cards/new`}
              className="btn btn-primary pr-4 pl-4"
            >
              Add Cards
            </Link>
          </div>
        )}
      </div>
    );
  }

  //Loading animation while the api call is being made
  return <LoaderAnimation />;
}
