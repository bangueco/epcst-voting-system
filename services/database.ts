import { app } from "../firebaseConfig"
import { getDatabase, push, ref, set } from "firebase/database"

const db = getDatabase(app)

const writeUserData = (uid:any, email:any, username:any, password:any) => {
  set(ref(db, `users/${uid}`), {
    email: email,
    username: username,
    password: password,
    user_type: 'normal'
  })
}

const writeStudentData = (name:any, grade:any, position:any, party:any) => {
  const newStudentRef = push(ref(db, 'students/'));
  set(newStudentRef, {
    name: name,
    grade: grade,
    position: position,
    party: party,
    votes: []
  });
}

export {
  writeUserData,
  writeStudentData
}