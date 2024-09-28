
interface BoardProps{
  title: string,
  custom?: {
  }
}

export const Board = ({title, custom}: BoardProps)=>{
  return <div>{title}</div>
}