import instance from "./request";
interface Boards {
  title: string;
  custom?: any;
  users: User[];
  lists: List[];
}
interface User {
  id: number;
  username: string;
}

interface List {
  id: number;
  title: string;
  cards: Card[];
}

interface Card {
  id: number;
  title: string;
  color: string;
  description: string;
  custom: {
    deadline: string;
  };
  users: number[];
  created_at: number;
}

export const getBoardData = (
  boardId: string,
  setTitleData: (title: string) => void,
  setLists: (lists: List[]) => void,
  setStyles: (styles: any) => void,
) => {
  const fetchData = async () => {
    try {
      // console.log(instance.defaults.baseURL); // Логування baseURL
      const response = (await instance.get(`board/${boardId}`)) as Boards;
      setTitleData(response.title);
      setLists(response.lists);
      console.log(JSON.stringify(response.custom.styles));
      if (response.custom.styles) {
        setStyles(response.custom?.styles);
      }

      console.log(JSON.stringify(response));
    } catch (err) {
      console.error("Failed to fetch board", err);
    }
  };

  fetchData();
};

export const putBoardData = (
  data: { title: string; custom?: any },
  board_id: string,
  setTitleData: (title: string) => void,
  setLists: (lists: List[]) => void,
  setStyles: (styles: any) => void,
) => {
  const fetchData = async () => {
    try {
      const putResponse = await instance.put(`board/${board_id}`, data);
      if (!putResponse) return;
      getBoardData(board_id, setTitleData, setLists, setStyles);
    } catch (err) {
      console.error("Failed to fetch board", err);
    }
  };
  fetchData();
};

