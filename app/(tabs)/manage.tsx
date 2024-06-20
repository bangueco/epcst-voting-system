import { useEffect, useState } from "react"
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { writeStudentData } from "@/services/database"
import { DataTable } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons'
import {app} from "../../firebaseConfig"
import { getDatabase, onValue, ref } from "firebase/database"

interface Student {
  id: string;
  grade: string;
  name: string;
  party: string;
  position: string;
}

const Manage = () => {

  const db = getDatabase(app)

  const [students, setStudents] = useState<Student[]>([])
  const [studentName, setStudentName] = useState('')
  const [studentGrade, setStudentGrade] = useState('')
  const [studentPosition, setStudentPosition] = useState('')
  const [studentParty, setStudentParty] = useState('')

  useEffect(() => {

    const fetchStudents = async () => {
      const students = await ref(db, '/students')
      onValue(students, (snapshot) => {
        const data = snapshot.val()
        const studentsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setStudents(studentsArray)
      });
    }

    fetchStudents()
  }, [])

  const onPressWriteStudent = () => {
    writeStudentData(studentName, studentGrade, studentPosition, studentParty)
    Alert.alert('Success')
    setStudentName('')
    setStudentGrade('')
    setStudentPosition('')
    setStudentParty('')
  }

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
        <Pressable style={styles.pressableButton} onPress={onPressWriteStudent}>
          <Text style={{fontSize: 20, color: 'white'}}>Submit</Text>
        </Pressable>
      </View>
      <View>
        <DataTable style={styles.tableContainer}>
          <DataTable.Header style={styles.tableHeader}> 
            <DataTable.Title>Name</DataTable.Title> 
            <DataTable.Title>Grade</DataTable.Title> 
            <DataTable.Title>Position</DataTable.Title>
            <DataTable.Title>Actions</DataTable.Title>
          </DataTable.Header>
          {students.map(student => (
            <DataTable.Row style={{backgroundColor: 'white'}} key={student.id}>
              <DataTable.Cell>{student.name}</DataTable.Cell>
              <DataTable.Cell>{student.grade}</DataTable.Cell> 
              <DataTable.Cell>{student.position}</DataTable.Cell>
              <DataTable.Cell>
                <FontAwesome name="edit" size={24} color="blue" />
                <FontAwesome name="trash-o" size={24} color="red" />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
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
  },
  tableContainer: { 
    padding: 10,
    textAlign: 'center'
  }, 
  tableHeader: { 
    backgroundColor: '#DCDCDC', 
  },
  cellActions: {
    display: 'flex',
    gap: 50
  }
})

export default Manage