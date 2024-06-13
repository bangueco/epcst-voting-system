import { useEffect, useState } from "react"
import { registerUser } from "../services/authentication"
import { Button, StyleSheet, Text, TextInput, View, Alert, Pressable } from "react-native"
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { app } from "../firebaseConfig"
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Register = () => {
  const auth = getAuth(app)
  const navigation = useNavigation<NavigationProp<any>>();

  const [authUser, setAuthUser] = useState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    onAuthStateChanged(auth, (user:any) => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(undefined)
      }
    })
  }, [])

  useEffect(() => {
    if (authUser) {
      navigation.navigate("Main")
    }
  }, [authUser])

  const onPressRegister = async () => {
    try {
      const response = await registerUser(email, password)

      if (response.user) {
        Alert.alert('Registerd successfully')
        navigation.navigate("Login")
      }

    } catch(error) {
      return Alert.alert('Email already in use')
    }
  }

  if (!authUser) {

    return (
      <>
  
        {/* TODO: Change user interface when backend is fully functional */}
  
        <View style={styles.container}>
          <View style={styles.registerContainer}>
            <Text style={{textAlign: 'center'}}>EPCST VOTING SYSTEM</Text>
            <View>
              <View>
                <Text>Username</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(e) => setEmail(e)}
                />
              </View>
              <View>
                <Text>Password</Text>
                <TextInput
                  style={styles.textInput}
                  secureTextEntry={true}
                  onChangeText={(e) => setPassword(e)}
                />
              </View>
            </View>
            <Button 
              title="Register"
              onPress={onPressRegister}
            />
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text>Already have account? Login here</Text>
            </Pressable>
          </View>
        </View>
  
      </>
    )

  } else {
    return null
  }

}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerContainer: {
    backgroundColor: '#7EBC23',
    borderRadius: 10,
    width: '80%',
    padding: 5
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'green'
  }
})

export default Register