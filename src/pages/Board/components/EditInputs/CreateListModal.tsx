import React from "react";
import { useForm } from "react-hook-form";
import { validateBoardTitle } from "../../../../common/utils/validateUtils";
import { useParams } from "react-router-dom";
import { postList } from "../../../../api/request";
import { CreateListModalProps } from "../../../../common/interfaces/CreateListModalProps";

export const CreateListModal = ({ updateBoardData, closeModal }: CreateListModalProps) => {
  const { board_id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ title: string; position: number }>({
    defaultValues: {
      title: '',
      position: 1,
    },
  });

  const onSubmit = async (data: { title: string; position: number }) => {
    const isCorrect = validateBoardTitle(data.title);
    if (!isCorrect) {
      return;
    }

    const listData = {
      title: data.title,
      position: +data.position,
    };

    await postList(board_id, listData);
    updateBoardData();
    closeModal();
    reset();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Додати список</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Введіть назву</label>
          <input
            id="title"
            type="text"
            {...register("title", {
              required: "Назва списку обов'язкова",
              validate: validateBoardTitle,
            })}
            placeholder="Введіть назву"
          />
          {errors.title && (
            <p>Назва списку не повинна бути порожньою і може містити лише літери, цифри, пробіли, тире, крапки та підкреслення.</p>
          )}

          <label htmlFor="position">Вкажіть позицію</label>
          <input
            id="position"
            type="number"
            {...register("position", {
              required: "Позиція обов'язкова",
              min: { value: 1, message: "Позиція повинна бути більше або дорівнювати 1" },
            })}
            placeholder="Вкажіть номер позиції"
          />
          {errors.position && <p>{errors.position.message}</p>}

          <div className="modal-btns-container">
            <button type="button" onClick={closeModal} className="close-btn">
              Закрити
            </button>
            <button type="submit" className="submit-btn">
              Додати
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
