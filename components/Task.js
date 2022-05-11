import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Animated, {
  interpolateColor,
  runOnJS,
  useDerivedValue
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated'
import { useTasks } from './task_context'

export const Task = ({ title, id, type }) => {
  const { focusedTaskId, handlePair, handleDeleteTask, setPosition } =
    useTasks()

  const offset = useSharedValue({ x: 0, y: 0 })
  const start = useSharedValue({ x: 0, y: 0 })

  const scale = useSharedValue(1)

  const panGesture = Gesture.Pan()
    .onStart(() => {
      scale.value = withTiming(1.05)
    })
    .onUpdate(e => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y
      }

      runOnJS(setPosition)({ id, title, ...offset.value })
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y
      }
      runOnJS(setPosition)({ id, title, ...start.value })
      scale.value = withTiming(1)
    })

  const oneTap = Gesture.Tap()
    .numberOfTaps(1)
    .onEnd(() => {
      runOnJS(handlePair)(id)
    })

  const longPress = Gesture.LongPress().onStart(() => {
    runOnJS(handleDeleteTask)(id)
  })

  const animatedStyles = useAnimatedStyle(() => {
    return {
      left: offset.value.x,
      top: offset.value.y,
      transform: [{ scale: scale.value }]
    }
  }, [offset.value, scale.value])

  const isFocused = useDerivedValue(() => {
    return withTiming(focusedTaskId === id ? 1 : 0, { duration: 150 })
  }, [focusedTaskId])

  const animatedBorder = useAnimatedStyle(
    () => ({
      borderColor: interpolateColor(
        isFocused.value,
        [0, 1],
        ['transparent', 'rgba(0, 0, 256, 1)']
      )
    }),
    [isFocused]
  )

  const animatedContainer = useAnimatedStyle(() => {
    const isMain = type === 'main'
    return {
      backgroundColor: isMain ? '#cde7f2' : 'white',
      padding: isMain ? 15 : 10
    }
  }, [isFocused])

  return (
    <GestureDetector
      gesture={Gesture.Race(oneTap, longPress, panGesture)}
      key={id}
    >
      <Animated.View
        style={[styles.item, animatedStyles, animatedContainer, animatedBorder]}
      >
        <Text>{title}</Text>
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#8e8e8e',
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 100,
    justifyContent: 'space-between',
    borderWidth: 2,
    position: 'absolute',
    top: 0,
    left: 0
  }
})
