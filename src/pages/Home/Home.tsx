import React, { useEffect, useState } from "react";
import "./Home.scss";
import { Button } from "../Board/components/Button/Button";
import { Link } from "react-router-dom";
import CreateBoardModal from "./components/CreateBoardModal/CreateBoardModal";
import { showSuccessMessage } from "../../common/utils/message";
import { BoardData } from "../../common/interfaces/BoardData";
import { getAllBoards, postBoard } from "../../api/request";
import defaultBackgroundImg from './texture.webp';


export const Home = () => {
  const [boards, setBoards] = useState<BoardData[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const gettingDataAbourdBoards = async ()=>{
    const allBoards = await getAllBoards();
    setBoards(allBoards.boards);
  }

  const addBoard = async (title:string) => {
    const data = {
      title: title,
      custom: {
        styles: {
          borderColor: "#8B4513",
          backgroundImg: defaultBackgroundImg,
          textColor: "#44352b",
          listColor: "#fffa90",
        }
      }
    }
    await postBoard(data);
    showSuccessMessage('Виконано!',  `Дошка "${title}" створена`);
    gettingDataAbourdBoards();
  }

  useEffect(() => {
    gettingDataAbourdBoards();
  }, []);

  return (
    <div className="home">
        <header>
          <Button
            title="Вийти"
            name="log-out-btn"
            handleClickFunc={() => {
              console.log("logout");
            }}
          >
            Вийти
          </Button>
        </header>
      <h1 className="home-title">Домашня сторінка</h1>
      <ul className="all-boards-list">
        {boards.map((board) => {
          return (
            <li key={board.id}>
              <Link to={`/board/${board.id}`}>
                {board.title}
              </Link>
            </li>
          );
        })}
        <li>
          <Button title="Додати доску" name="add-board-btn" handleClickFunc={toggleModal}>
            +
          </Button>
        </li>
      </ul>

      {modalIsOpen && (
        <CreateBoardModal
          saveBoard={addBoard}
          toggleModal={toggleModal}/>
      )}
    </div>
  );
};
