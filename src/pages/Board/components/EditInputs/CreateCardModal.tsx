import { useEffect, useState } from "react";
import instance from "../../../../api/request";
import { validateBoardTitle } from "../../../../common/utils/validateUtils";
import { ICard } from "../../../../common/interfaces/ICard";

interface ModalProps{
  card: ICard,
  saveCard: (cardTitle:string, cardPosition:number, cardDescription:string, cardDeadline:string) =>void,
  closeModal: ()=>void
}

// interface CardData{
//   title: string,
//   position: number,
//   description: string,
//   deadline: string,
// }
/**{
  title: "to wash a cat",
  list_id: 2,
  position: 5,
  description: "washing process",
  custom: {
    deadline: "2022-08-31 12:00"
  }
}
 */
export const CreateCardModal = ({card, saveCard, closeModal}:ModalProps)=>{
    const [inputTitleValue, setInputTitleValue]=useState('');
    const [inputPositionValue, setInputPositionValue]=useState(1);
    const [inputDescriptionValue, setInputDescriptionValue]=useState('');
    const [inputDeadlineValue, setInputDeadlineValue]=useState('2024-10-10')
    const [isCorrectValue, setIsCorrectValue] = useState(true);

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
  
    const handleInputSubmit = () => {
      let isCorrect = validateBoardTitle(inputTitleValue);
      setIsCorrectValue(isCorrect);
      if(!isCorrect){
        return;
      }
      saveCard(inputTitleValue, inputPositionValue, inputDescriptionValue, inputDeadlineValue);
      closeModal()
    };

    useEffect(()=>{
      setInputTitleValue(card.title);
      setInputPositionValue(card.position);
      setInputDescriptionValue(card.description);
      setInputDeadlineValue(card.custom.deadline);
    },[])
  
  
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Додати список</h2>
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
            <button onClick={handleInputSubmit} className="submit-btn">Додати</button>          
          </div>
  
        </div>
      </div>
  
    );
}