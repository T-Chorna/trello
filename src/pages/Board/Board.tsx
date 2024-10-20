import React, { useEffect, useRef, useState } from "react";
import List from "./components/Lists/List";
import "./board.scss";
import { Button } from "./components/Button/Button";
import { Link, useParams } from "react-router-dom";
import { EditBoardInput } from "./components/EditInputs/EditBoardInput";
import { CreateListModal } from "./components/EditInputs/CreateListModal";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { ListData } from "../../common/interfaces/ListData";
import { StyleSettings } from "../../common/interfaces/StyleSettings";
import { getBoard } from "../../api/request";
import defaultBackgroundImg from './texture.webp';
import { changeCSSProperties } from "../../common/utils/changeCssVarUtils";
import { useClickOutside } from "../../common/hook/clickoutside";



export const Board = () => {
  const [title, setTitleData] = useState<string>("");
  const [lists, setLists] = useState<ListData[]>([]);
  const [isOpenEditIntup, setIsOpenEditInput] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);
  const [styles, setStyles] = useState<StyleSettings>({
    borderColor: "#8B4513",
    backgroundImg: defaultBackgroundImg,
    textColor: "#44352b",
    listColor: "#fffa90",
  });

  const sidebarRef = useRef<HTMLDivElement>(null);
  const { board_id } = useParams();

  const openEditInput = () => {
    setIsOpenEditInput(true);
  };

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  const updateBoardData = async () => {
      const board = await getBoard(board_id);
      setTitleData(board.title);
      setLists(board.lists);
      if(board.custom?.styles){
        setStyles(board.custom.styles);
      }
      changeCSSProperties(styles);
  }

  useEffect(() => {
    changeCSSProperties(styles)
  }, [styles]);

  useEffect(() => {
    updateBoardData();
  }, []);

  useClickOutside(sidebarRef, () => setSidebarIsOpen(false), sidebarIsOpen);

  return (
    <>
      <div className="board">
        <header>
          <Button
            title="Відкрити налаштування"
            name="open-settings-btn"
            handleClickFunc={toggleSidebar}
          >
            <img src="settings.png" alt=">>" height={40} />
          </Button>
          <div>
            <Link to="/" className="header-link">Перейти на головну</Link>
            <Button
              title="Вийти"
              name="log-out-btn"
              handleClickFunc={() => {
                console.log("logout");
              }}
            >
              Вийти
            </Button>
          </div>
        </header>

        {isOpenEditIntup ? (
            <EditBoardInput
              value={title}
              closeInputFunc={setIsOpenEditInput}
              updateBoardData={updateBoardData}
            />
          ) : (
            <h1 className="board-title" onClick={openEditInput}>
              {title}
            </h1>
          )}
          
        <Sidebar
          isSidebarVisible={sidebarIsOpen}
          sidebarRef={sidebarRef}
          styles={styles}
          lists={lists}
          updateBoardData={updateBoardData}
          toggleSidebar={toggleSidebar}
        />

        <ul className="board-list">
          {lists.map((list) => {
            return (
              <li key={list.id}>
                <List title={list.title} cards={list.cards} listId={list.id} updateBoardData={updateBoardData}/>
              </li>
            );
          })}
        </ul>
        <Button
          title="Додати список"
          name="add-list-btn"
          handleClickFunc={toggleModal}
        >
          <img src="push-pins.png" alt="+" height={80} />
        </Button>
      </div>
      {modalIsOpen && (
        <CreateListModal updateBoardData={updateBoardData} closeModal={toggleModal} />
      )}
    </>
  );
};
