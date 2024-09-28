import { useEffect, useState } from "react";
import { Board } from "./components/Board/Board";
import "./Home.scss";
import { Button } from "../Board/components/Button/Button";
import { Link } from "react-router-dom";
import instance from "../../api/request";
import CreateBoardModal from "./components/CreateBoardModal/CreateBoardModal";

interface BoardData {
  id: number;
  title: string;
  custom?: any;
}

export const Home = () => {
  const [boards, setBoards] = useState<BoardData[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const addBoard = (title:string) => {
    const fetchData = async () => {
      try {
        const data = {
          title: title
        }
        const postResponse = await instance.post("board", data);
        if(!postResponse)return
        const getResponse = await instance.get("board")  as {boards: BoardData[]};
        setBoards(getResponse.boards);
      } catch (err) {
        console.error("Failed to fetch boards", err);
      }
    };

    fetchData();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("board") as {boards: BoardData[]};
        console.log(JSON.stringify(response));
        setBoards(response.boards);
        
      } catch (err) {
        console.error("Failed to fetch boards", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <h1 className="home-title">Домашня сторінка</h1>
      <ul className="all-boards-list">
        {boards.map((board) => {
          return (
            <li key={board.id}>
              <Link to={`/board/${board.id}`}>
                <Board title={board.title} custom={board.custom} />
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
