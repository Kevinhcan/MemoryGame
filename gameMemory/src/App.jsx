import { useState } from "react";
import "./App.css";
import cardsData from "./cardsData";

function App() {
  const [cardsList, setCardsList] = useState(
    cardsData.sort(() => Math.random() - 0.5)
  );
  const [prevIndexCard, setPrevIndexCard] = useState(-1);

  //const cardsList = cardsData.sort(() => Math.random() - 0.5);

  const selectCard = (index) => {
    cardsList[index].status = "selected";
    setCardsList([...cardsList]);
    if (prevIndexCard === -1) {
      setPrevIndexCard(index);
    } else {
      validateCards(index);
    }
  };

  const validateCards = (newIndex) => {
    setTimeout(() => {
      const prev = cardsList[prevIndexCard];
      const current = cardsList[newIndex];
      if (prev.icon === current.icon) {
        prev.status = "up"
        current.status = "up"
      } else {
        prev.status = "down";
        current.status = "down";
      }
      setCardsList([...cardsList]); 
      setPrevIndexCard(-1);
    }, 500);
  };

  return (
    <>
      <h1 className="tittle">Memoria en react</h1>
      <div className="cards-container">
        {cardsList.map((card, i) => (
          <div
            className={`card ${card.status}`}
            key={card.id}
            onClick={() => selectCard(i)}
          >
            {card.status !== "down" && <i className={card.icon}></i>}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
