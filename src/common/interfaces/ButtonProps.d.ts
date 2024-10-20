export interface ButtonProps{
  type?: "button" | "submit" | "reset" | undefined,
  title: string,
  name: string,
  children: React.ReactNode;
  handleClickFunc?: ()=>void
}