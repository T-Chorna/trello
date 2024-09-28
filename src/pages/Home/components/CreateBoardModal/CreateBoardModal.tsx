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
  inputValue: string,
  setInputValue: (input:string)=>void
  setBoards:(boards:BoardData[])=>void
  toggleModalFunc: ()=>void
}


const CreateBoardModal = ({inputValue, setInputValue, setBoards, toggleModalFunc}:ModalProps) => {
  const [isCorrectValue, setIsCorrectValue] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = () => {
    let isCorrect = validateBoardTitle(inputValue);
    setIsCorrectValue(isCorrect);
    if(!isCorrect){
      return;
    }
    const fetchData = async () => {
      try {
        const data = {
          title: inputValue
        }
        const postResponse = await instance.post("board", data);
        if(!postResponse)return
        const getResponse = await instance.get("board")  as {boards: BoardData[]};
        setBoards(getResponse.boards);
        
        setInputValue("");
        toggleModalFunc();
      } catch (err) {
        console.error("Failed to fetch boards", err);
      }
    };

    fetchData();
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
          <button onClick={toggleModalFunc} className="close-btn">Закрити</button>
          <button onClick={handleInputSubmit} className="submit-btn">Додати</button>          
        </div>

      </div>
    </div>

  );
};

export default CreateBoardModal;
