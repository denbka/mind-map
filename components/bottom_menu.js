import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  StyleSheet,
  View
} from 'react-native'
import shortid from 'shortid'
import { Button } from './button'
import { useTasks } from './task_context'

export const BottomMenu = () => {
  const { handleAddTask } = useTasks()
  const [text, setText] = useState()
  const handleChangeText = value => setText(value ?? '')

  const submit = ({ type }) => {
    const id = shortid.generate()
    handleAddTask({
      id,
      title: text?.trim() ?? '',
      type,
      relations: []
    })
    setText('')
    Keyboard.dismiss()
  }

  return (
    <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={40}>
      <View style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Введите текст'}
          value={text}
          onChangeText={handleChangeText}
        />
        <Button
          style={styles.roundedButton}
          onPress={() => submit({ type: 'main' })}
        >
          main
        </Button>
        <Button
          style={styles.roundedButton}
          onPress={() => submit({ type: 'child' })}
        >
          child
        </Button>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  roundedButton: {
    borderRadius: 99999,
    width: 60,
    height: 60
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})
