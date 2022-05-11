import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'

import { BottomMenu } from '../components/bottom_menu'
import { Relations } from '../components/relations'
import { Tasks } from '../components/tasks'
import { useTasks } from '../components/task_context'

const EditMode = () => {
  const { tasks, relations } = useTasks()

  return (
    <View style={styles.background}>
      <View style={styles.zoomContainer}>
        <ScrollView
          keyboardDismissMode="interactive"
          bounces={false}
          style={styles.background}
        >
          <Tasks tasks={tasks} />
          <Relations relations={relations} />
        </ScrollView>
      </View>
      <BottomMenu />
    </View>
  )
}

const styles = StyleSheet.create({
  zoomContainer: {
    width: '100%',
    height: 800,
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#fff'
  },
  background: {
    backgroundColor: '#f7f7f7',
    flex: 1,
    position: 'relative'
  }
})

export default EditMode
