import { useEffect, useRef, useState } from "react";
import List from "./components/Lists/List";
import "./components/Board/board.scss";
import { Button } from "./components/Button/Button";
import { Link, useParams } from "react-router-dom";
import instance from "../../api/request";
import { EditBoardInput } from "./components/EditInputs/EditBoardInput";
import { CreateListModal } from "./components/EditInputs/CreateListModal";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { darken } from "polished";
import { BoardData } from "../../common/interfaces/BoardData";
import { ListData } from "../../common/interfaces/ListData";
import { StyleSettings } from "../../common/interfaces/StyleSettings";
import { handleError } from "../../common/utils/message";



export const Board = () => {
  const [title, setTitleData] = useState<string>("");
  const [lists, setLists] = useState<ListData[]>([]);
  const [isOpenEditIntup, setIsOpenEditInput] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);
  const [styles, setStyles] = useState<StyleSettings>({
    borderColor: "#8B4513",
    backgroundImg: "url('texture.webp')",
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
    try {
      const getResponse = (await instance.get(
        `board/${board_id}`,
      )) as BoardData;
      setTitleData(getResponse.title);
      setLists(getResponse.lists);
      if(getResponse.custom?.styles){
        setStyles(getResponse.custom.styles);
      }
    } catch (err) {
      handleError(err);
    }
    
  }

  useEffect(() => {
    if (!styles) return;
    document.documentElement.style.setProperty(
      "--board-border-color",
      styles.borderColor,
    );
    document.documentElement.style.setProperty(
      "--main-color",
      styles.textColor,
    );
    document.documentElement.style.setProperty(
      "--title-color",
      darken(0.2, styles.textColor),
    );
    document.documentElement.style.setProperty(
      "--sticker-color",
      styles.listColor,
    );
    document.documentElement.style.setProperty(
      "--add-card-btn-color",
      darken(0.1, styles.listColor),
    );
    document.documentElement.style.setProperty(
      "--board-background",
      `url(${styles.backgroundImg})`,
    );
    // console.log("Styles updated:", JSON.stringify(styles));
  }, [styles]);

  useEffect(() => {
    if (!board_id) return;
    updateBoardData()
  }, []);

  // Ховаємо сайдбар при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Перевіряємо, що sidebarRef.current існує і перевіряємо, чи елемент event.target не знаходиться всередині сайдбару
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarIsOpen(false);
      }
    };

    // Додаємо обробник кліку до всього документа
    document.addEventListener("mousedown", handleClickOutside);

    // Чистимо ефект, щоб уникнути витоків пам'яті
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
