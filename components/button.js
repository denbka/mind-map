import React from 'react'
import { Text, View, Pressable, StyleSheet } from 'react-native'

export const Button = ({ children, ...props }) => {
  return (
    <Pressable onPress={props.onPress}>
      <View {...props} style={[styles.button, props.style]}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#fff'
  },
  button: {
    backgroundColor: '#4B5FEB',
    borderRadius: 40,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
