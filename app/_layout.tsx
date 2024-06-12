import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabLayout from './(tabs)/_layout';
import Login from './login'
import Register from './register'

const Stack = createNativeStackNavigator()

export default function RootLayout() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{contentStyle: {backgroundColor: '#31363F'}}}>
        <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Main" component={TabLayout} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
