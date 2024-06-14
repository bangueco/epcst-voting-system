import { app } from "../firebaseConfig"
import { getDatabase, ref, set } from "firebase/database"

const db = getDatabase(app)

const writeUserData = (uid:any, email:any, password:any) => {
  set(ref(db, `users/${uid}`), {
    email: email,
    password: password
  })
}

export {
  writeUserData
}