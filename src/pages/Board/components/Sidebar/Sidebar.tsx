import { RefObject, useEffect, useState } from "react";
import "./Sidebar.scss";
import { Button } from "../Button/Button";
import instance from "../../../../api/request";
import { useNavigate, useParams } from "react-router-dom";
import { ListData } from "../../../../common/interfaces/ListData";
import { handleError, showMessageDelete, showSuccessMessage } from "../../../../common/utils/message";

interface SidebarProps {
  isSidebarVisible: boolean;
  sidebarRef: RefObject<HTMLDivElement>;
  styles: {
    borderColor: string;
    backgroundImg: string;
    textColor: string;
    listColor: string; 
  };
  lists: ListData[];
  updateBoardData: ()=>void,
  toggleSidebar: ()=>void
}


export const Sidebar = ({
  isSidebarVisible,
  sidebarRef,
  styles,
  lists,
  updateBoardData,
  toggleSidebar
}: SidebarProps) => {
  const [listTitles, setListTitles] = useState<ListData[]>([]);
  const [borderColor, setBorderColor] = useState('');
  const [backgroundImg, setBackgroundImg] = useState('');
  const [textColor, setTextColor] = useState('');
  const [listColor, setListColor] = useState('');
  const { board_id } = useParams();
  const navigate = useNavigate(); 

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Отримуємо файл
    if (file) {
      const reader = new FileReader(); // Створюємо FileReader

      // Коли файл буде завантажено
      reader.onloadend = () => {
        setBackgroundImg(reader.result as string); // Зберігаємо Base64-рядок в стані
      };

      reader.readAsDataURL(file); // Читаємо файл як Data URL (Base64)
    }
  };

  const handleChangeBorderColor = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBorderColor(event.target.value);
  };
  const handleChangeTextColor = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTextColor(event.target.value);
  };
  const handleChangeListColor = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setListColor(event.target.value);
  };

  //Функція для обміну місцями елементів масиву
  const swapAdjacent = (index: number) => {
    let array = [...listTitles];
    if (index < 0 || index >= array.length - 1) {
      return;
    }
    [array[index], array[index + 1]] = [array[index + 1], array[index]];
    setListTitles(array);
  };

  const handleSaveChanges = async () => {
    toggleSidebar();
    await saveSettings();
    await updateLists(listTitles);
    updateBoardData();
  };

  const handleDeleteBoard = async () => { 
    // Очікуємо на результат перед тим, як продовжувати
    const confirmation = await showMessageDelete('Ви впевнені, що хочете видалити дошку?');
    if (!confirmation) { 
      return; // Якщо користувач натиснув "Скасувати", припиняємо виконання
    }
    try {
      const deleteResponse = await instance.delete(`board/${board_id}`);
      if (deleteResponse) {
        navigate('/'); 
      }
      showSuccessMessage('Видалено!', 'Ваша дошка була видалена.');
    } catch (err) {
      handleError(err);
    }
  };

  const updateLists = async (lists:{id:number, title:string}[])=>{
    try {
      const data = lists.map((list, index)=>{
        return {
          id: list.id,
          position: index+1
        }
      })
      const putResponse = await instance.put(`board/${board_id}/list`, data);
    } catch (err) {
      console.error("Failed to fetch board", err);
    }
  }

  const saveSettings = async () => {
    try {
      const data = { custom: { styles: {
        borderColor: borderColor,
        backgroundImg: backgroundImg,
        textColor: textColor,
        listColor: listColor,
      } } };
      if (!board_id) return;
      const putResponse = await instance.put(`board/${board_id}`, data);
    } catch (err) {
      console.error("Failed to fetch board", err);
    }
  };

  const settingInitialStyleValues=()=>{
    setBorderColor(styles.borderColor);
    setBackgroundImg(styles.backgroundImg);
    setTextColor(styles.textColor);
    setListColor(styles.listColor);
  }

  useEffect(()=>{
    setListTitles([...lists])
  },[lists])

  useEffect(()=>{
    settingInitialStyleValues()
  },[styles])

  useEffect(()=>{
    settingInitialStyleValues()
    setListTitles([...lists])
  },[isSidebarVisible])

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${isSidebarVisible ? "visible" : ""}`}
    >
      <h2>Налаштування дошки</h2>
      <h3 className="sidebarTitle">Списки:</h3>
      <ol className="sidebarList">
        {listTitles.map((item, index) => {
          return (
            <li key={item.id} className="sidebarListItem">
              <p>{item.title}</p>
              <div className="btn-list-container">
                <Button
                  title={"Вгору"}
                  name={"btn-move-list-up"}
                  handleClickFunc={() => {
                    swapAdjacent(index - 1);
                  }}
                >
                  <img src="arrow-up.png" alt="<" width={10} height={10} />
                </Button>
                <Button
                  title={"Донизу"}
                  name={"btn-move-list-down"}
                  handleClickFunc={() => {
                    swapAdjacent(index);
                  }}
                >
                  <img src="arrow-down.jpg" alt=">" width={10} height={10} />
                </Button>
              </div>
            </li>
          );
        })}
      </ol>
      <label htmlFor="borderColor">
        Колір дошки
        <input
          type="color"
          name="borderColor"
          value={borderColor}
          onChange={handleChangeBorderColor}
          className="colorInput"
        />
      </label>
      <label htmlFor="backgroundImg">
        Фонове зображення
        <input
          type="file"
          name="backgroundImg"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </label>
      <label htmlFor="textColor">
        Колір тексту
        <input
          type="color"
          name="textColor"
          value={textColor}
          onChange={handleChangeTextColor}
          className="colorInput"
        />
      </label>
      <label htmlFor="listColor">
        Колір карток
        <input
          type="color"
          name="listColor"
          value={listColor}
          onChange={handleChangeListColor}
          className="colorInput"
        />
      </label>
      <Button title={"Зберегти налаштування"} name={"btn-save-settings btn-sidebar"} handleClickFunc={handleSaveChanges}>Зберегти зміни</Button>
      <Button title={"Видалити дошку"} name={"btn-delete-board btn-sidebar"} handleClickFunc={handleDeleteBoard}>Видалити дошку</Button>
    </div>
  );
};
