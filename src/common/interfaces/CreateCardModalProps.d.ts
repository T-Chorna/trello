export interface CreateCardModalProps{
  card: ICard,
  status: 'add' | 'edit',
  listId:number,
  closeModal: ()=>void,
  updateBoardData: ()=>void
}