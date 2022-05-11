import * as React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TaskProvider } from './components/task_context'
import EditMode from './screens/EditMode'

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TaskProvider>
          <EditMode />
        </TaskProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

export default App
