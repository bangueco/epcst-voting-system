import { Button, StyleSheet, Text, TextInput, View } from "react-native"

const Login = () => {
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
              />
            </View>
            <View>
              <Text>Password</Text>
              <TextInput
                style={styles.textInput}
                secureTextEntry={true}
              />
            </View>
          </View>
          <Button title="Login" />
        </View>
      </View>

    </>
  )
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