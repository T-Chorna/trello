import React from "react"
import { ButtonProps } from "../../../../common/interfaces/ButtonProps"

export const Button = ({title, name, children, handleClickFunc, type}:ButtonProps) => {
  return <button type={type || 'button'} className={name} title={title} onClick={handleClickFunc}>{children}</button>
}