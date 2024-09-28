interface ButtonProps{
  title: string,
  name: string,
  children: React.ReactNode;
  handleClickFunc: ()=>void
}

export const Button = ({title, name, children, handleClickFunc}:ButtonProps) => {
  return <button className={name} title={title} onClick={handleClickFunc}>{children}</button>
}