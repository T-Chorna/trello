import { Dispatch, SetStateAction, useState } from "react";
import { validateBoardTitle } from "../../../../common/utils/validateUtils";
import '../EditInputs/EditInputs.scss'
import instance from "../../../../api/request";
import { useParams } from "react-router-dom";

interface EditBoardInputProps{
    value: string,
    closeInputFunc: Dispatch<SetStateAction<boolean>>,
    updateBoardData: ()=>void
}

export const EditBoardInput = ({value, closeInputFunc, updateBoardData}:EditBoardInputProps) => {
    const [inputValue, setInputValue] = useState<string>(value);
    const { board_id } = useParams();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setInputValue(e.target.value);
    }

    function closeInput(){
        saveNewTitle(inputValue);
        updateBoardData();
        closeInputFunc(false);
    }

    function saveNewTitle(newTitle:string){
        const isCorrectValue = validateBoardTitle(inputValue);
        if(!isCorrectValue){
            alert('Назва дошки не повинна бути порожньою і може містити лише літери, цифри, пробіли, тире, крапки та підкреслення.');
            return;
        }
        // saveInputValueFunc(inputValue);
        const data = { title: newTitle};
        const fetchData = async () => {
          try {
            const putResponse = await instance.put(`board/${board_id}`, data);
            if (!putResponse) return;
          } catch (err) {
            console.error("Failed to fetch board", err);
          }
        };
        fetchData();
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
          closeInput();
        }
    }

    return (
        <input 
            className="inputBoardTitle"
            type="text" 
            value={inputValue}
            onChange={handleChange}
            onBlur={closeInput}
            onKeyDown={handleKeyDown}></input>
    )
}