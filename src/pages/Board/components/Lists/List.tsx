import { ICard } from "../../../../common/interfaces/ICard"
import './list.scss'
import { Card } from "../Card/Card"
import { Button } from "../Button/Button"

interface ListProps {
  listId: number,
  title: string,
  cards: ICard[] 
}

const List = ({listId, title, cards}: ListProps) => {
  return <>
  <h2>{title}</h2>  
  <ul className="cards-list">
    {cards.map((card) => {
      return <li key={card.id}><Card title={card.title}/></li>
    })}
  </ul>
  <Button title="Додати картку" name="add-card-btn" handleClickFunc={()=>console.log('add list')}>+</Button>
  </>
}

export default List;