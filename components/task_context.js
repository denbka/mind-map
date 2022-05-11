import React, { useState, useContext, createContext } from 'react'
import { useSharedValue } from 'react-native-reanimated'
import shortid from 'shortid'

const context = createContext({
  tasks: [],
  relations: [],
  relationPositions: {},
  focusedTaskId: null,
  handleAddTask: () => {}
})

export const useTasks = () => useContext(context)

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [relations, setRelations] = useState([])
  const relationPositions = useSharedValue({})
  const [focusedTaskId, setFocusedTaskId] = useState(null)

  const handleAddTask = props => setTasks(prev => [...prev, props])

  const handleDeleteTask = id => {
    let itemsCopy = JSON.parse(JSON.stringify(tasks))
    itemsCopy.splice(
      itemsCopy.findIndex(item => item.id === id),
      1
    )

    let relationsCopy = JSON.parse(JSON.stringify(relations)).filter(item => {
      return !item.relationIds.includes(id)
    })
    setRelations(relationsCopy)
    setTasks(itemsCopy)
  }

  const handlePair = task_id => {
    if (!focusedTaskId) {
      setFocusedTaskId(task_id)
      return
    }
    if (focusedTaskId === task_id) {
      setFocusedTaskId(null)
      return
    }

    const id = shortid.generate()
    setRelations(prev => [
      ...prev,
      { id, relationIds: [focusedTaskId, task_id] }
    ])
    setFocusedTaskId(null)
  }

  const setPosition = ({ id, x, y }) => {
    relationPositions.value = {
      ...relationPositions.value,
      [id]: { x, y }
    }
  }

  return (
    <context.Provider
      value={{
        tasks,
        relations,
        relationPositions,
        focusedTaskId,
        setPosition,
        handleAddTask,
        handleDeleteTask,
        handlePair
      }}
    >
      {children}
    </context.Provider>
  )
}
