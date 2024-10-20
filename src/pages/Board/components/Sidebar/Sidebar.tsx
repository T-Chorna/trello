import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Sidebar.scss";
import { Button } from "../Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { ListData } from "../../../../common/interfaces/ListData";
import { showMessageDelete, showSuccessMessage } from "../../../../common/utils/message";
import { SidebarProps } from "../../../../common/interfaces/SidebarProps";
import { deleteBoard, putBoard, putLists } from "../../../../api/request";
import { SidebarForm } from "../../../../common/interfaces/SidebarForm";

export const Sidebar = ({
  isSidebarVisible,
  sidebarRef,
  styles,
  lists,
  updateBoardData,
  toggleSidebar
}: SidebarProps) => {
  const [listTitles, setListTitles] = useState<ListData[]>([]);
  const { board_id } = useParams();
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    setValue, 
    reset 
  } = useForm<SidebarForm>({
    defaultValues: {
      borderColor: '',
      backgroundImg: '',
      textColor: '',
      listColor: ''
    }
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setValue('backgroundImg', base64Image);
      };
      reader.readAsDataURL(file); 
    }
  };

  const swapAdjacent = (index: number) => {
    const array = [...listTitles];
    if (index < 0 || index >= array.length - 1) {
      return;
    }
    [array[index], array[index + 1]] = [array[index + 1], array[index]];
    setListTitles(array);
  };

  const onSubmit = async (data: SidebarForm) => {
    toggleSidebar();
    await saveSettings(data);
    await updateLists(listTitles);
    updateBoardData();
  };

  const handleDeleteBoard = async () => { 
    const confirmation = await showMessageDelete('Ви впевнені, що хочете видалити дошку?');
    if (!confirmation) { 
      return; 
    }
    const deleteResult = await deleteBoard(board_id);
    if (deleteResult) {
      navigate('/');
    }
    showSuccessMessage('Видалено!', 'Ваша дошка була видалена.');
  };

  const updateLists = async (lists: { id: number, title: string }[]) => {
    const data = lists.map((list, index) => ({
      id: list.id,
      position: index + 1
    }));
    await putLists(board_id, data);
  };

  const saveSettings = async (data: SidebarForm) => {
    const settings = { custom: { styles: data } };
    await putBoard(board_id, settings);
  };

  const settingInitialStyleValues = () => {
    reset({
      borderColor: styles.borderColor,
      backgroundImg: styles.backgroundImg,
      textColor: styles.textColor,
      listColor: styles.listColor
    });
  };


  

  useEffect(() => {
    setListTitles([...lists]);
  }, [lists]);

  useEffect(() => {
    settingInitialStyleValues();
  }, [styles]);

  useEffect(() => {
    settingInitialStyleValues();
    setListTitles([...lists]);
  }, [isSidebarVisible]);

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${isSidebarVisible ? "visible" : ""}`}
    >
      <h2>Налаштування дошки</h2>
      <h3 className="sidebarTitle">Списки:</h3>
      <ol className="sidebarList">
        {listTitles.map((item, index) => (
          <li key={item.id} className="sidebarListItem">
            <p>{item.title}</p>
            <div className="btn-list-container">
              <Button
                title={"Вгору"}
                name={"btn-move-list-up"}
                handleClickFunc={() => swapAdjacent(index - 1)}
              >
                <img src="arrow-up.png" alt="<" width={10} height={10} />
              </Button>
              <Button
                title={"Донизу"}
                name={"btn-move-list-down"}
                handleClickFunc={() => swapAdjacent(index)}
              >
                <img src="arrow-down.jpg" alt=">" width={10} height={10} />
              </Button>
            </div>
          </li>
        ))}
      </ol>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="borderColor">
          Колір дошки
          <input
            id="borderColor"
            type="color"
            {...register("borderColor")}
            className="colorInput"
          />
        </label>
        <label htmlFor="backgroundImg">
          Фонове зображення
          <input
            id="backgroundImg"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        <label htmlFor="textColor">
          Колір тексту
          <input
            id="textColor"
            type="color"
            {...register("textColor")}
            className="colorInput"
          />
        </label>
        <label htmlFor="listColor">
          Колір карток
          <input
            id="listColor"
            type="color"
            {...register("listColor")}
            className="colorInput"
          />
        </label>
        <Button type="submit" title={"Зберегти налаштування"} name={"btn-save-settings btn-sidebar"}>Зберегти зміни</Button>
      </form>
      <Button title={"Видалити дошку"} name={"btn-delete-board btn-sidebar"} handleClickFunc={handleDeleteBoard}>Видалити дошку</Button>
    </div>
  );
};
