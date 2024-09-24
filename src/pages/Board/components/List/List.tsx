import { ICard } from "../../../../common/interfaces/ICard"
import './list.scss'

interface ListProps{
    title:string,
    cards: ICard[]
}

export const List = ({title, cards}: ListProps)=>{
    return <p>{title}</p>
}

