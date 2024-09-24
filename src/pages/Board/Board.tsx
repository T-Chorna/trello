import { useState } from "react"
import { List } from "./components/List/List"
import './components/Board/board.scss'

const titleData = "Моя тестова дошка"
const listsData = [
  {
    id: 1,
    title: "Плани",
    cards: [
      {id: 1, title: "помити кота"},
      {id: 2, title: "приготувати суп"},
      {id: 3, title: "сходити в магазин"}
    ]
  },
  {
    id: 2,
    title: "В процесі",
    cards: [
      {id: 4, title: "подивитися серіал"}
    ]
  },
  {
    id: 3,
    title: "Зроблено",
    cards: [
      {id: 5, title: "зробити домашку"},
      {id: 6, title: "погуляти з собакой"} 
    ]
  }
]

interface ButtonProps{
    content: string,
}

const Button= ({content}:ButtonProps)=>{
    return <button>{content}</button>
}

export const Board = () =>{ 
    const [title, setTitle] = useState(titleData);
    const [lists, setLists] = useState(listsData);
    
    return (<>
        <div>{title}</div>
        <ul>
            {lists.map(list=>{
                return <li key={list.id}><List title={list.title} cards={list.cards}/></li>
            })}
        </ul>
        <Button content="Створити список" />
    </>)
}