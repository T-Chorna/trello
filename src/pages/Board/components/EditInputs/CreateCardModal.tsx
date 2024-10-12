import { useEffect, useState } from "react";
import instance from "../../../../api/request";
import { validateBoardTitle } from "../../../../common/utils/validateUtils";
import { ICard } from "../../../../common/interfaces/ICard";
import { useParams } from "react-router-dom";
import { handleError } from "../../../../common/utils/message";

interface ModalProps{
  card: ICard,
  status: 'add' | 'edit',
  listId:number,
  closeModal: ()=>void,
  updateBoardData: ()=>void
}

export const CreateCardModal = ({card, status, listId, updateBoardData, closeModal}:ModalProps)=>{
    const [inputTitleValue, setInputTitleValue]=useState('');
    const [inputPositionValue, setInputPositionValue]=useState(1);
    const [inputDescriptionValue, setInputDescriptionValue]=useState('');
    const [inputDeadlineValue, setInputDeadlineValue]=useState('2024-10-10')
    const [isCorrectValue, setIsCorrectValue] = useState(true);
    const { board_id } = useParams();

    const handleInputChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputTitleValue(e.target.value);
    };

    const handleInputChangePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPositionValue(+e.target.value);
    };

    const handleInputChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputDescriptionValue(e.target.value);
    }

    const handleInputChangeDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputDeadlineValue(e.target.value);
    }
  
    const handleInputSubmit = async () => {
      let isCorrect = validateBoardTitle(inputTitleValue);
      setIsCorrectValue(isCorrect);
      if(!isCorrect){
        return;
      }
      status === 'add' ? await addCard() : await editCard();
      closeModal()
      updateBoardData()
    };

    const addCard = async () => {
      try {
        const data = {
          title: inputTitleValue,
          list_id: listId,
          position: inputPositionValue,
          description: inputDescriptionValue,
          custom: {
            deadline: inputDeadlineValue,
          },
        };
        const postResponse = await instance.post(
          `board/${board_id}/card`,
          data,
        );
      } catch (err) {
        handleError(err);
      }
    }
    const editCard = async () => {
      try {
        const data = {
          title: inputTitleValue,
          list_id: listId,
          position: inputPositionValue,
          description: inputDescriptionValue,
          custom: {
            deadline: inputDeadlineValue,
          },
        };
        const putResponse = await instance.put(
          `board/${board_id}/card/${card.id}`,
          data,
        );
      } catch (err) {
        handleError(err);
      }
    }

    useEffect(()=>{
      setInputTitleValue(card.title);
      setInputPositionValue(card.position);
      setInputDescriptionValue(card.description);
      setInputDeadlineValue(card.custom.deadline);
    },[])
  
  
    return (
      <div className="modal-overlay">
        <div className="modal add-card-modal">
          {status === 'add'?<h2>Додати картку</h2>:<h2>Картка</h2>}
          <label htmlFor="title">Введіть назву</label>
          <input 
            type="text" 
            value={inputTitleValue}
            name="title"
            onChange={handleInputChangeTitle} 
            placeholder="Введіть назву" 
          />
          <label htmlFor="position">Вкажіть позицію</label>
          <input 
            type="number" 
            value={inputPositionValue}
            name="position"
            onChange={handleInputChangePosition} 
            placeholder="Вкажіть номер позиції" 
            min={1}
          />
          <label htmlFor="description">Введіть опис</label>
          <input 
            type="text" 
            value={inputDescriptionValue}
            name="description"
            onChange={handleInputChangeDescription} 
            placeholder="Введіть опис"
          />
          <label htmlFor="deadline">Вкажіть дедлайн</label>
          <input 
            type="datetime-local" 
            value={inputDeadlineValue}
            name="deadline"
            onChange={handleInputChangeDeadline} 
            placeholder="Вкажіть дедлайн"
          />
          {!isCorrectValue && <p>Назва картки не повинна бути порожньою і може містити лише літери, цифри, пробіли, тире, крапки та підкреслення.</p>}
          <div className="modal-btns-container">
            <button onClick={closeModal} className="close-btn">Закрити</button>
            <button onClick={handleInputSubmit} className="submit-btn">{status === 'add' ? 'Додати' : 'Зберегти'}</button>          
          </div>
  
        </div>
      </div>
  
    );
}