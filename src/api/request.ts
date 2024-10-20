import instance from "./instance";
import { BoardData } from "../common/interfaces/BoardData";
import { AllBoards } from "../common/interfaces/AllBoards";

const boardPath = process.env.REACT_APP_API_BOARD || '';
const listPath = process.env.REACT_APP_API_LIST || '';
const cardPath = process.env.REACT_APP_API_CARD || '';

export const getAllBoards = async () => {
  const res: AllBoards = await instance.get(boardPath);
  return res;
};

export const postBoard = async (data: { title: string }) => {
  await instance.post("board", data);
};

export const getBoard = async (boardId: string | undefined) => {
  const res: BoardData = await instance.get(`${boardPath}/${boardId}`);
  return res;
};

export const putBoard = async (
  board_id: string | undefined,
  data:
    | {
        custom: {
          styles: {
            borderColor: string;
            backgroundImg: string;
            textColor: string;
            listColor: string;
          };
        };
      }
    | { title: string },
) => {
  await instance.put(`${boardPath}/${board_id}`, data);
};

export const deleteBoard = async (boardId: string | undefined) => {
  return await instance.delete(`${boardPath}/${boardId}`);
};

export const postList = async (
  boardId: string | undefined,
  data: {
    title: string;
    position: number;
  },
) => {
  await instance.post(`${boardPath}/${boardId}/${listPath}`, data);
};

export const putLists = async (
  boardId: string | undefined,
  data: {
    id: number;
    position: number;
  }[],
) => {
  await instance.put(`${boardPath}/${boardId}/${listPath}`, data);
};

export const deleteList = async (
  boardId: string | undefined,
  listId: number,
) => {
  await instance.delete(`${boardPath}/${boardId}/${listPath}/${listId}`);
};

export const postCard = async (
  boardId: string | undefined,
  data: {
    title: string;
    list_id: number;
    position: number;
    description: string;
    custom: {
      deadline: string;
    };
  },
) => {
  await instance.post(`${boardPath}/${boardId}/${cardPath}`, data);
};

export const putCard = async (
  boardId: string | undefined,
  cardId: number,
  data: {
    title: string;
    list_id: number;
    position: number;
    description: string;
    custom: {
      deadline: string;
    };
  },
) => {
  await instance.put(
    `${boardPath}/${boardId}/${cardPath}/${cardId}`,
    data,
  );
};
