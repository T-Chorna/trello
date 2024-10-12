import { ICard } from "../../../../common/interfaces/ICard";
import "./list.scss";
import { Card } from "../Card/Card";
import { Button } from "../Button/Button";
import { useRef, useState } from "react";
import { CreateCardModal } from "../EditInputs/CreateCardModal";
import instance from "../../../../api/request";
import { useParams } from "react-router-dom";
import { handleError, showMessageDelete, showSuccessMessage } from "../../../../common/utils/message";

interface ListProps {
  listId: number;
  title: string;
  cards: ICard[];
  updateBoardData: () => void;
}

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
  const { board_id } = useParams();

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const deleteList = async () => {
    // Очікуємо на результат перед тим, як продовжувати
    const confirmation = await showMessageDelete('Ви впевнені, що хочете видалити список?');
    if (!confirmation) { 
      return; // Якщо користувач натиснув "Скасувати", припиняємо виконання
    }
    try {
      const deleteResponse = await instance.delete(
        `board/${board_id}/list/${listId}`,
      );
      showSuccessMessage('Видалено!', 'Ваш список був видалений.');
    } catch (err) {
      handleError(err);
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
