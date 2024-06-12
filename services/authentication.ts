import { app } from "../firebaseConfig"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

const auth = getAuth(app)

const registerUser = async (email: any, password: any) => {
  const response = await createUserWithEmailAndPassword(auth, email, password)
  return response
}

export {
  registerUser
}