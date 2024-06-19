import { useState } from "react"
import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native"

const Manage = () => {

  const [studentName, setStudentName] = useState('')
  const [studentGrade, setStudentGrade] = useState('')
  const [studentPosition, setStudentPosition] = useState('')
  const [studentParty, setStudentParty] = useState('')

  return (
    <View style={styles.manageContainer}>
      <View style={{padding: 10}}>
        <View>
          <Text style={{color: 'white', fontSize: 20}}>Name:</Text>
          <TextInput
            value={studentName}
            style={styles.textInput}
            onChangeText={(e) => setStudentName(e)}
          />
        </View>
        <View>
          <Text style={{color: 'white', fontSize: 20}}>Grade:</Text>
          <TextInput
            value={studentGrade}
            style={styles.textInput}
            onChangeText={(e) => setStudentGrade(e)}
          />
        </View>
        <View>
          <Text style={{color: 'white', fontSize: 20}}>Position:</Text>
          <TextInput
            value={studentPosition}
            style={styles.textInput}
            onChangeText={(e) => setStudentPosition(e)}
          />
        </View>
        <View>
          <Text style={{color: 'white', fontSize: 20}}>Party:</Text>
          <TextInput
            value={studentParty}
            style={styles.textInput}
            onChangeText={(e) => setStudentParty(e)}
          />
        </View>
      </View>
      <View>
        <Pressable style={styles.pressableButton}>
          <Text style={{fontSize: 20, color: 'white'}}>Submit</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  manageContainer: {
    height: '100%',
    backgroundColor: '#31363F'
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'green',
    padding: 5
  },
  pressableButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    width: '20%'
  }
})

export default Manage