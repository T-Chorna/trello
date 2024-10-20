import { ICard } from "../../../../common/interfaces/ICard";
import "./list.scss";
import { Card } from "../Card/Card";
import { Button } from "../Button/Button";
import React, { useState } from "react";
import { CardModal } from "../EditInputs/CardModal";
import { useParams } from "react-router-dom";
import { showMessageDelete, showSuccessMessage } from "../../../../common/utils/message";
import { ListProps } from "../../../../common/interfaces/ListProps";
import { deleteList } from "../../../../api/request";


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
    setEditCardData({
      title: "",
      position: 1,
      description: "",
      custom: {
        deadline: "",
      }})
  };

  const deleteCurrentList = async () => {
    const confirmation = await showMessageDelete('Ви впевнені, що хочете видалити список?');
    if (!confirmation) { 
      return; 
    }
    await deleteList(board_id, listId);
    showSuccessMessage('Видалено!', 'Ваш список був видалений.');
    
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
          await deleteCurrentList();
          updateBoardData();
        }}
      >
        <img src="redCross.png" alt="X" width={10} height={10} />
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
        <CardModal
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
