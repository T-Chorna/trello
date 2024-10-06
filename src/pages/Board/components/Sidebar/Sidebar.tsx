import { RefObject, useEffect, useState } from "react";
import "./Sidebar.scss";
import { Button } from "../Button/Button";

interface SidebarProps {
  isSidebarVisible: boolean;
  sidebarRef: RefObject<HTMLDivElement>;
  saveChange: (changes: {
    lists: List[];
    borderColor: string;
    backgroundImg: string;
    textColor: string;
    listColor: string;
  },) => void;
  styles: {
    borderColor: string;
    backgroundImg: string;
    textColor: string;
    listColor: string; 
  };
  lists: List[];
  updateLists: (lists:List[])=>void;
  deleteList: (listId:number)=>void;
}

interface List {
  id: number;
  title: string;
}

export const Sidebar = ({
  isSidebarVisible,
  sidebarRef,
  saveChange,
  styles,
  lists,
  updateLists,
  deleteList
}: SidebarProps) => {
  const [listTitles, setListTitles] = useState<List[]>([]);
  const [borderColor, setBorderColor] = useState('');
  const [backgroundImg, setBackgroundImg] = useState('');
  const [textColor, setTextColor] = useState('');
  const [listColor, setListColor] = useState('');

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

  const swapAdjacent = (index: number) => {
    let array = [...listTitles];
    if (index < 0 || index >= array.length - 1) {
      return;
    }

    // Обмін місцями
    [array[index], array[index + 1]] = [array[index + 1], array[index]];
    setListTitles(array);
  };

  const deleteElementByIndex = (index: number) => {
    // let array = [...listTitles];
    // array.splice(index, 1);

    // setListTitles(array);
    deleteList(listTitles[index].id)
  };

  const handleSaveChanges = () => {
    saveChange({
      lists: listTitles,
      borderColor: borderColor,
      backgroundImg: backgroundImg,
      textColor: textColor,
      listColor: listColor,
    });
    updateLists(listTitles)
  };

  useEffect(()=>{
    setListTitles([...lists])
  },[lists])

  useEffect(()=>{
    setBorderColor(styles.borderColor);
    setBackgroundImg(styles.backgroundImg);
    setTextColor(styles.textColor);
    setListColor(styles.listColor);
  },[styles])

  useEffect(()=>{
    setBorderColor(styles.borderColor);
    setBackgroundImg(styles.backgroundImg);
    setTextColor(styles.textColor);
    setListColor(styles.listColor);
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
                  <img src="/arrow-up.png" alt="<" width={10} height={10} />
                </Button>
                <Button
                  title={"Донизу"}
                  name={"btn-move-list-down"}
                  handleClickFunc={() => {
                    swapAdjacent(index);
                  }}
                >
                  <img src="/arrow-down.jpg" alt=">" width={10} height={10} />
                </Button>
                <Button
                  title={"Видалити"}
                  name={"btn-delete-list"}
                  handleClickFunc={() => {
                    deleteElementByIndex(index);
                  }}
                >
                  <img src="/redCross.png" alt="X" width={10} height={10} />
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
      <Button title={"Зберегти налаштування"} name={"btn-save-settings"} handleClickFunc={handleSaveChanges}>Зберегти</Button>
    </div>
  );
};
