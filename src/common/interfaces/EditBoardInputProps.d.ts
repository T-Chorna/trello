export interface EditBoardInputProps{
  value: string,
  closeInputFunc: Dispatch<SetStateAction<boolean>>,
  updateBoardData: ()=>void
}