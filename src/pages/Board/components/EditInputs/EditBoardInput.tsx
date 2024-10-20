import React from "react";
import { useForm } from "react-hook-form";
import { validateBoardTitle } from "../../../../common/utils/validateUtils";
import "../EditInputs/EditInputs.scss";
import { useParams } from "react-router-dom";
import { showErrorMessage } from "../../../../common/utils/message";
import { putBoard } from "../../../../api/request";
import { EditBoardInputProps } from "../../../../common/interfaces/EditBoardInputProps";

export const EditBoardInput = ({
  value,
  closeInputFunc,
  updateBoardData,
}: EditBoardInputProps) => {
  const { board_id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>({
    defaultValues: {
      title: value,
    },
  });

  const saveNewTitle = async (newTitle: string) => {
    const isCorrectValue = validateBoardTitle(newTitle);
    if (!isCorrectValue) {
      await showErrorMessage(
        "",
        "Назва дошки не повинна бути порожньою і може містити лише літери, цифри, пробіли, тире, крапки та підкреслення.",
      );
      return;
    }
    const data = { title: newTitle };
    await putBoard(board_id, data);
  };

  const onSubmit = async (data: { title: string }) => {
    await saveNewTitle(data.title);
    updateBoardData();
    closeInputFunc(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onBlur={handleSubmit(onSubmit)}>
      <input
        className="inputBoardTitle"
        type="text"
        {...register("title", {
          required: "Назва дошки обов'язкова",
          validate: validateBoardTitle,
        })}
      />
      {errors.title && (
        <p className="error-message">{errors.title.message}</p>
      )}
    </form>
  );
};
