import { ICard } from "../../../../common/interfaces/ICard";
import "./list.scss";
import { Card } from "../Card/Card";
import { Button } from "../Button/Button";
import { useRef, useState } from "react";
import { CreateCardModal } from "../EditInputs/CreateCardModal";
import instance from "../../../../api/request";
import { useParams } from "react-router-dom";

interface ListProps {
  listId: number;
  title: string;
  cards: ICard[];
  updateBoardData: () => void;
}

// interface CardData{
//   title: string,
//   position: number,
//   description: string,
//   deadline: string,
// }

const List = ({ listId, title, cards, updateBoardData }: ListProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState<'add' | 'edit'>('add');
  const [editCardData, setEditCardData] = useState<ICard>({
    title: "",
    position: 1,
    description: "",
    custom: {
      deadline: "",
    },
  });
  const createNewCard = useRef(true);
  const { board_id } = useParams();

  // card: CardData,
  // saveCard: (cardTitle:string, cardPosition:number, cardDescription:string, cardDeadline:string) =>void,
  // closeModal: ()=>void



  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const deleteList = async () => {
    try {
      const deleteResponse = await instance.delete(
        `board/${board_id}/list/${listId}`,
      );
    } catch (err) {
      console.error("Failed to fetch board", err);
    }
  };

  const handleClickOnCard = (card:ICard)=>{
    setModalStatus('edit');
    setEditCardData(card);
    setModalIsOpen(true);
  }

  return (
    <>
      <Button
        title={"Видалити"}
        name={"btn-delete-list"}
        handleClickFunc={async () => {
          await deleteList();
          updateBoardData();
        }}
      >
        <img src="/redCross.png" alt="X" width={10} height={10} />
      </Button>
      <h2>{title}</h2>
      <ul className="cards-list">
        {cards.map((card) => {
          return (
            <li key={card.id} onClick={()=>{handleClickOnCard(card)}}>
              <Card title={card.title} />
            </li>
          );
        })}
      </ul>
      <Button
        title="Додати картку"
        name="add-card-btn"
        handleClickFunc={toggleModal}
      >
        +
      </Button>
      {modalIsOpen && (
        <CreateCardModal
          card={editCardData}
          status={modalStatus}
          listId={listId}
          updateBoardData={updateBoardData}
          closeModal={toggleModal}
        />
      )}
    </>
  );
};

export default List;
