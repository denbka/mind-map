import React from 'react'
import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { useAnimatedProps } from 'react-native-reanimated'
import { Svg, Polyline } from 'react-native-svg'
import { useTasks } from './task_context'

const AnimatedPolyline = Animated.createAnimatedComponent(Polyline)

export const Line = ({ relation, id }) => {
  const [firstId, secondId] = relation
  const { relationPositions } = useTasks()

  const animatedLineProps = useAnimatedProps(() => {
    const firstPoint = relationPositions.value[firstId]
    const secondPoint = relationPositions.value[secondId]

    if (!firstPoint || !secondPoint) return {}

    return {
      points: `${firstPoint.x + 25} ${firstPoint.y + 10},${
        secondPoint.x + 25
      } ${secondPoint.y + 10}`
    }
  }, [relationPositions])

  return (
    <Animated.View style={[styles.item]} pointerEvents="none" key={id}>
      <Svg width="400" height="800" fill="none" color="green">
        <AnimatedPolyline
          animatedProps={animatedLineProps}
          stroke="rgba(0, 0, 256, 1)"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </Svg>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 20,
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
    top: 0,
    left: 0,
    position: 'absolute',
    zIndex: -1
  },
  title: {}
})
