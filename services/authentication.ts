import { app } from "../firebaseConfig"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

const auth = getAuth(app)

const registerUser = async (email: any, password: any) => {
  const response = await createUserWithEmailAndPassword(auth, email, password)
  return response
}

const loginUser = async (email: any, password: any) => {
  const response = await (signInWithEmailAndPassword(auth, email, password))
  return response
}

export {
  registerUser,
  loginUser
}