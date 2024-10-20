import React from "react"
import { CardProps } from "../../../../common/interfaces/CardProps"

export const Card = ({title}: CardProps) => {
  return <h3>{title}</h3>
}