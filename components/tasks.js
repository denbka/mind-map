import React from 'react'
import { Task } from './Task'

export const Tasks = ({ tasks }) => {
  return tasks.map(props => <Task key={props.id} {...props} />)
}
