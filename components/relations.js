import React from 'react'
import { Line } from './Line'

export const Relations = ({ relations }) => {
  return relations.map(relation => (
    <Line key={relation.id} id={relation.id} relation={relation.relationIds} />
  ))
}
