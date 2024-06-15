import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native"
import { loginUser } from "@/services/authentication"
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { app } from "../firebaseConfig"
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";

const Login = () => {
  const navigation = useNavigation<NavigationProp<any>>()
  const auth = getAuth(app)
  const [authUser, setAuthUser] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (user:any) => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(undefined)
      }
    })
  }, []);

  useEffect(() => {
    if (authUser) {
      navigation.navigate("Main");
    }
  }, [authUser]);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onPressLogin = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence)
      
      const response = await loginUser(email, password)

      if (response.user.uid) {
        Alert.alert('Login successfully')
        navigation.navigate("Main")
      }

    } catch (error) {
      Alert.alert(error.message)
    }
  }

  if (!authUser) {
    return (
      <>
  
        {/* TODO: Change user interface when backend is fully functional */}
  
        <View style={styles.container}>
          <View style={styles.loginContainer}>
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
            <Button onPress={onPressLogin} title="Login" />
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
  loginContainer: {
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

export default Login