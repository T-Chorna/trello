import { RefObject, useState } from "react";
import "./Sidebar.scss";
import { Button } from "../Button/Button";

interface SidebarProps {
  isSidebarVisible: boolean;
  sidebarRef: RefObject<HTMLDivElement>;
}

const arrTitlesList = [
  { id: 1, title: "Моя дошка" },
  { id: 2, title: "Список" },
  { id: 3, title: "Картка" },
];

export const Sidebar = ({ isSidebarVisible, sidebarRef }: SidebarProps) => {
  const [listTitles, setListTitles] = useState(arrTitlesList);
  const [borderColor, setBorderColor] = useState("black");
  const [backgroundImg, setBackgroundImg] = useState("black");
  const [textColor, setTextColor] = useState("black");
  const [listColor, setListColor] = useState("black");

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
  }

  const deleteElementByIndex = (index:number) => {
    let array = [...listTitles];
    array.splice(index, 1);
  
    setListTitles(array);
  };

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
                  handleClickFunc={() => {swapAdjacent(index-1)}}
                >
                  <img src="/arrow-up.png" alt="<" width={10} height={10} />
                </Button>
                <Button
                  title={"Донизу"}
                  name={"btn-move-list-down"}
                  handleClickFunc={() => {swapAdjacent(index)}}
                >
                  <img src="/arrow-down.jpg" alt=">" width={10} height={10} />
                </Button>
                <Button
                  title={"Видалити"}
                  name={"btn-delete-list"}
                  handleClickFunc={() => {deleteElementByIndex(index)}}
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
          onChange={handleChangeTextColor}
          className="colorInput"
        />
      </label>
      <label htmlFor="listColor">
        Колір карток
        <input
          type="color"
          name="listColor"
          onChange={handleChangeListColor}
          className="colorInput"
        />
      </label>
    </div>
  );
};
