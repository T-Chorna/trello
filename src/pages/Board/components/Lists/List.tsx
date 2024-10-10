import { ICard } from "../../../../common/interfaces/ICard"
import './list.scss'
import { Card } from "../Card/Card"
import { Button } from "../Button/Button"
import { useRef, useState } from "react"
import { CreateCardModal } from "../EditInputs/CreateCardModal"
import instance from "../../../../api/request"
import { useParams } from "react-router-dom"

interface ListProps {
  listId: number,
  title: string,
  cards: ICard[],
  updateBoard: ()=> void
}

interface CardData{
  title: string,
  position: number,
  description: string,
  deadline: string,
}

const List = ({listId, title, cards, updateBoard}: ListProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [editCardData, setEditCardData] = useState<CardData>({title:'', position:1, description:'', deadline:''});
  const createNewCard = useRef(true);
  const { board_id } = useParams();

  // card: CardData,
  // saveCard: (cardTitle:string, cardPosition:number, cardDescription:string, cardDeadline:string) =>void,
  // closeModal: ()=>void

  const addCard = (cardTitle:string, cardPosition:number, cardDescription:string, cardDeadline:string) => {
    const fetchData = async () => {
      try {
        const data = {
          title: cardTitle,
          list_id: listId,
          position: cardPosition,
          description: cardDescription,
          custom: {
            deadline: cardDeadline
          }
        };
        const postResponse = await instance.post(`board/${board_id}/card`, data);
        if (!postResponse) return;
        updateBoard()
      } catch (err) {
        console.error("Failed to fetch board", err);
      }
    };

    fetchData();
  };

  const toggleModal = () =>{
    setModalIsOpen(!modalIsOpen);
  }

  return <>
  <h2>{title}</h2>  
  <ul className="cards-list">
    {cards.map((card) => {
      return <li key={card.id}><Card title={card.title}/></li>
    })}
  </ul>
  <Button title="Додати картку" name="add-card-btn" handleClickFunc={toggleModal}>+</Button>
  {modalIsOpen && (
        <CreateCardModal card={editCardData} saveCard={addCard} closeModal={toggleModal} />
  )}
  </>
}

export default List;