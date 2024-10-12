import { useState } from "react";
import instance from "../../../../api/request";
import { validateBoardTitle } from "../../../../common/utils/validateUtils";
import { useParams } from "react-router-dom";
import { handleError } from "../../../../common/utils/message";

interface ModalProps{
    updateBoardData: ()=>void,
    closeModal: ()=>void
}

export const CreateListModal = ({updateBoardData, closeModal}:ModalProps)=>{
    const [inputTitleValue, setInputTitleValue]=useState('');
    const [inputPositionValue, setInputPositionValue]=useState(1)
    const [isCorrectValue, setIsCorrectValue] = useState(true);
    const { board_id } = useParams();

    const handleInputChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputTitleValue(e.target.value);
    };

    const handleInputChangePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPositionValue(+e.target.value);
      };
  
    const handleInputSubmit = async () => {  // Робимо метод async
      let isCorrect = validateBoardTitle(inputTitleValue);
      setIsCorrectValue(isCorrect);
      if (!isCorrect) {
        return;
      }
      
      // Використовуємо await, щоб дочекатися завершення addList
      await addList(inputTitleValue, inputPositionValue); 
      
      updateBoardData(); 
      closeModal();
    };
      
    const addList = async (listTitle:string, listPosition:number) => {  // async функція
      try {
        const data = {
          title: listTitle,
          position: listPosition,
        };
        const postResponse = await instance.post(`board/${board_id}/list`, data);
        if (!postResponse) return;
      } catch (err) {
        handleError(err)
      }
    };
  
  
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
          {!isCorrectValue && <p>Назва списку не повинна бути порожньою і може містити лише літери, цифри, пробіли, тире, крапки та підкреслення.</p>}
          <div className="modal-btns-container">
            <button onClick={closeModal} className="close-btn">Закрити</button>
            <button onClick={handleInputSubmit} className="submit-btn">Додати</button>          
          </div>
  
        </div>
      </div>
  
    );
}