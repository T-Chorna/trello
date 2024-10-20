export interface ListProps {
  listId: number;
  title: string;
  cards: ICard[];
  updateBoardData: () => void;
}