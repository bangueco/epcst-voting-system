import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from './home'
import Profile from './profile'
import Manage from './manage'

const TabLayout = () => {

  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: 'green'}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Your Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
      <Tab.Screen
        name="Manage"
        component={Manage}
        options={{
          title: 'Manage Students',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabLayout