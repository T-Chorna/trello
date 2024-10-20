import React from "react";
import { useForm } from "react-hook-form";
import './CreateBoardModal.scss';
import { validateBoardTitle } from "../../../../common/utils/validateUtils"; 
import { BoardModalProps } from "../../../../common/interfaces/BoardModalProps";

const CreateBoardModal = ({ saveBoard, toggleModal }: BoardModalProps) => {
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<{ board: string }>({
    defaultValues: {
      board: '',
    },
  });

  const closeModal = () => {
    toggleModal();
    reset(); 
  };

  const onSubmit = (data: { board: string }) => {
    const isCorrect = validateBoardTitle(data.board);
    if (!isCorrect) {
      return;
    }
    saveBoard(data.board);
    reset(); 
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Додати дошку</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="board">Введіть назву</label>
          <input
            id="board"
            type="text"
            {...register("board", { 
              required: "Назва дошки є обов'язковою", 
              validate: value => validateBoardTitle(value) || "Назва може містити лише літери, цифри, пробіли, тире, крапки та підкреслення" 
            })}
            placeholder="Введіть текст"
          />
          
          {errors.board && <p>{errors.board.message}</p>}

          <div className="modal-btns-container">
            <button type="button" onClick={closeModal} className="close-btn">Закрити</button>
            <button type="submit" className="submit-btn">Додати</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardModal;
