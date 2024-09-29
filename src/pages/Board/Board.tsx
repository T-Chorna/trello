import { useEffect, useRef, useState } from "react";
import List from "./components/Lists/List";
import "./components/Board/board.scss";
import { Button } from "./components/Button/Button";
import { useParams } from "react-router-dom";
import instance from "../../api/request";
import { EditBoardInput } from "./components/EditInputs/EditBoardInput";
import { CreateListModal } from "./components/EditInputs/CreateListModal";
import { Sidebar } from "./components/Sidebar/Sidebar";


interface BoardData {
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

export const Board = () => {
  const [title, setTitleData] = useState<string>("");
  const [lists, setLists] = useState<List[]>([]);
  const [isOpenEditIntup, setIsOpenEditInput] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const { board_id } = useParams();
  const pushPinsImg = `<img src="/push-pins.png" alt="+"/>`;

  const openEditInput = ()=>{
    setIsOpenEditInput(true)
  }


  const saveNewTitle = (newTitle:string)=>{
    const fetchData = async () => {
      try {
        const data = {
          title: newTitle
        }
        const putResponse = await instance.put(`board/${board_id}`, data);
        if(!putResponse)return
        const getResponse = await instance.get(`board/${board_id}`)  as BoardData;
        setTitleData(getResponse.title);
        setLists(getResponse.lists);
      } catch (err) {
        console.error("Failed to fetch board", err);
      }
    };

    fetchData();
  }

  const toggleModal = ()=>{
    setModalIsOpen(!modalIsOpen);
  }

  const toggleSidebar = ()=>{
    setSidebarIsOpen(!sidebarIsOpen);
  }

  const addList = (newListTitle:string, newListPosition:number)=>{
    const fetchData = async () => {
      try {
        const data = {
          title: newListTitle,
          position: newListPosition
        }
        const putResponse = await instance.post(`board/${board_id}/list`, data);
        if(!putResponse)return
        const getResponse = await instance.get(`board/${board_id}`)  as BoardData;
        setTitleData(getResponse.title);
        setLists(getResponse.lists);
      } catch (err) {
        console.error("Failed to fetch board", err);
      }
    };

    fetchData();
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(instance.defaults.baseURL); // Логування baseURL
        const response = (await instance.get(`board/${board_id}`)) as BoardData;
        setTitleData(response.title);
        setLists(response.lists);

        console.log(JSON.stringify(response));
      } catch (err) {
        console.error("Failed to fetch board", err);
      }
    };

    fetchData();
  }, []);

  // Ховаємо сайдбар при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Перевіряємо, що sidebarRef.current існує і перевіряємо, чи елемент event.target не знаходиться всередині сайдбару
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarIsOpen(false);
      }
    };

    // Додаємо обробник кліку до всього документа
    document.addEventListener('mousedown', handleClickOutside);

    // Чистимо ефект, щоб уникнути витоків пам'яті
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarIsOpen]);

  return (
    <>
      <div className="board">
        <header>
          <Button
            title="Відкрити налаштування"
            name="open-settings-btn"
            handleClickFunc={toggleSidebar}
          >
            <img src="/settings.png" alt=">>" height={40} />
          </Button>
          {isOpenEditIntup ? (
            <EditBoardInput value={title} closeInputFunc={setIsOpenEditInput} saveInputValueFunc={saveNewTitle}/>
          ) : (
            <h1 className="board-title" onClick={openEditInput}>
              {title}
            </h1>
          )} 
          <Button
            title="Вийти"
            name="log-out-btn"
            handleClickFunc={()=>{console.log('logout')}}
          >
            Вийти
          </Button>         
        </header>

        <Sidebar isSidebarVisible={sidebarIsOpen} sidebarRef={sidebarRef}/>

        <ul className="board-list">
          {lists.map((list) => {
            return (
              <li key={list.id}>
                <List title={list.title} cards={list.cards} listId={list.id}/>
              </li>
            );
          })}
        </ul>
        <Button
          title="Додати список"
          name="add-list-btn"
          handleClickFunc={toggleModal}
        >
          <img src="/push-pins.png" alt="+" height={80} />
        </Button>
      </div>
      {modalIsOpen && (
        <CreateListModal
          saveNewList={addList}
          closeModal={toggleModal}/>
      )}
    </>
  );
};
