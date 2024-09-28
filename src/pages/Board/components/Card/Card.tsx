interface CardProps{
  title:string
}

export const Card = ({title}: CardProps) => {
  return <h3>{title}</h3>
}