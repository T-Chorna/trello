import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { validateBoardTitle } from "../../../../common/utils/validateUtils";
import { useParams } from "react-router-dom";
import { CreateCardModalProps } from "../../../../common/interfaces/CreateCardModalProps";
import { postCard, putCard } from "../../../../api/request";
import { getCurrentDate } from "../../../../common/utils/dateUtils";

export const CardModal = ({
  card,
  status,
  listId,
  updateBoardData,
  closeModal,
}: CreateCardModalProps) => {
  const { board_id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ title: string; position: number; description: string; deadline: string }>({
    defaultValues: {
      title: '',
      position: 1,
      description: '',
      deadline: getCurrentDate(),
    },
  });

  useEffect(() => {
    if (status !== 'add') {
      setValue('title', card.title);
      setValue('position', card.position);
      setValue('description', card.description);
      setValue('deadline', card.custom.deadline);
    }
  }, [card, setValue, status]);

  const onSubmit = async (data: { title: string; position: number; description: string; deadline: string }) => {
    const isCorrect = validateBoardTitle(data.title);
    if (!isCorrect) {
      return;
    }

    const cardData = {
      title: data.title,
      list_id: listId,
      position: +data.position,
      description: data.description,
      custom: {
        deadline: data.deadline,
      },
    };

    if (status === 'add') {
      await postCard(board_id, cardData);
    } else {
      await putCard(board_id, card.id, cardData);
    }

    closeModal();
    updateBoardData();
  };

  return (
    <div className="modal-overlay">
      <div className="modal add-card-modal">
        {status === "add" ? <h2>Додати картку</h2> : <h2>Картка</h2>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Введіть назву</label>
          <input
            type="text"
            {...register("title", {
              required: "Назва картки обов'язкова",
              validate: validateBoardTitle,
            })}
            placeholder="Введіть назву"
          />
          {errors.title && (
            <p>
              Назва картки не повинна бути порожньою і може містити лише літери, цифри, пробіли, тире, крапки та підкреслення.
            </p>
          )}

          <label htmlFor="position">Вкажіть позицію</label>
          <input
            type="number"
            {...register("position", {
              required: "Позиція обов'язкова",
              min: { value: 1, message: "Позиція повинна бути більше або дорівнювати 1" },
            })}
            placeholder="Вкажіть номер позиції"
            min={1}
          />
          {errors.position && <p>{errors.position.message}</p>}

          <label htmlFor="description">Введіть опис</label>
          <input
            type="text"
            {...register("description")}
            placeholder="Введіть опис"
          />

          <label htmlFor="deadline">Вкажіть дедлайн</label>
          <input
            type="datetime-local"
            {...register("deadline")}
            placeholder="Вкажіть дедлайн"
          />

          <div className="modal-btns-container">
            <button type="button" onClick={closeModal} className="close-btn">
              Закрити
            </button>
            <button type="submit" className="submit-btn">
              {status === "add" ? "Додати" : "Зберегти"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
