import { Dispatch, SetStateAction, useState } from "react";
import { validateBoardTitle } from "../../../../common/utils/validateUtils";
import '../EditInputs/EditInputs.scss'

interface EditBoardInputProps{
    value: string,
    closeInputFunc: Dispatch<SetStateAction<boolean>>,
    saveInputValueFunc: (newTitle:string)=> void
}

export const EditBoardInput = ({value, closeInputFunc, saveInputValueFunc}:EditBoardInputProps) => {
    const [inputValue, setInputValue] = useState<string>(value);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setInputValue(e.target.value);
    }

    function closeInput(){
        const isCorrectValue = validateBoardTitle(inputValue);
        if(!isCorrectValue){
            alert('Назва дошки не повинна бути порожньою і може містити лише літери, цифри, пробіли, тире, крапки та підкреслення.');
            return;
        }
        saveInputValueFunc(inputValue);
        closeInputFunc(false);
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