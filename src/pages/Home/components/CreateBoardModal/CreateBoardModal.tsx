import React, { useState } from "react";
import './CreateBoardModal.scss'; 
import instance from "../../../../api/request";
import { validateBoardTitle


 } from "../../../../common/utils/validateUtils"; 
interface BoardData {
  id: number;
  title: string;
  custom?: {
    description: string;
  };
}

interface ModalProps{
  saveBoard: (title:string)=>void,
  toggleModal: ()=>void
}


const CreateBoardModal = ({saveBoard, toggleModal}:ModalProps) => {
  const [inputValue, setInputValue] = useState('')
  const [isCorrectValue, setIsCorrectValue] = useState(true);

  const closeModal = ()=>{
    toggleModal();
    setInputValue('');
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = () => {
    let isCorrect = validateBoardTitle(inputValue);
    setIsCorrectValue(isCorrect);
    if(!isCorrect){
      return;
    }
    saveBoard(inputValue);
    setInputValue('');
    closeModal();
  };


  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Додати дошку</h2>
        <label htmlFor="board">Введіть назву</label>
        <input 
          type="text" 
          value={inputValue}
          name="board"
          onChange={handleInputChange} 
          placeholder="Введіть текст" 
        />
        {!isCorrectValue && <p>Назва дошки не повинна бути порожньою і може містити лише літери, цифри, пробіли, тире, крапки та підкреслення.</p>}
        <div className="modal-btns-container">
          <button onClick={closeModal} className="close-btn">Закрити</button>
          <button onClick={handleInputSubmit} className="submit-btn">Додати</button>          
        </div>

      </div>
    </div>

  );
};

export default CreateBoardModal;
