import { useEffect, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import {app} from "../../firebaseConfig"
import { get, getDatabase, onValue, ref, runTransaction } from "firebase/database"
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface Student {
  id: string;
  grade: string;
  name: string;
  party: string;
  position: string;
  votes: number;
}

interface User {
  uid: string;
}

const Home = () => {

  const db = getDatabase(app)
  const auth = getAuth(app);

  const [students, setStudents] = useState<Student[]>([])
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {

    const fetchStudents = () => {
      const students = ref(db, '/students')
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
  
  useEffect(() => {
    onAuthStateChanged(auth, (user:any) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }, []);

  const handleVote = async (studentId: string) => {

    if (!user) return

    const voteRef = ref(db, `/votes/${user.uid}/${studentId}`);
    const studentVoteRef = ref(db, `/students/${studentId}/votes`);

    try {

      const voteSnapshot = await get(voteRef);
      
      if (voteSnapshot.exists()) {
        throw new Error("User has already voted for this student");
      }

      await runTransaction(voteRef, (currentData) => {
        if (currentData === null) {
          // User has not voted for this student yet
          return true;
        } else {
          // User has already voted
          return; // Abort the transaction
        }
      });

      await runTransaction(studentVoteRef, (currentVotes) => {
        if (currentVotes === null) {
          return 1;
        } else {
          return currentVotes + 1;
        }
      });
    } catch (error) {
      console.error("Error voting: ", error);
    }
  }

  return (
    <View style={styles.homeContainer}>
      <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5, padding: 10,}}>
        {students.map(student => (
          <View style={styles.voteCard} key={student.id}>
            <Text>Name: {student.name}</Text>
            <Text>Grade: {student.grade}</Text>
            <Text>Party: {student.party}</Text>
            <Text>Position: {student.position}</Text>
            <Text>Votes: {student.votes}</Text>
            <Pressable style={styles.voteButton} onPress={() => handleVote(student.id)}>
              <Text style={{fontSize: 15, color: 'white', textAlign: 'center'}}>Vote</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  homeContainer: {
    height: '100%',
    backgroundColor: '#31363F',
  },
  voteCard: {
    backgroundColor: 'white',
    padding: 10,
    width: '50%',
    borderRadius: 20
  },
  voteButton: {
    backgroundColor: 'green',
    padding: 5,
    width: '40%',
    borderRadius: 5
  }
})

export default Home