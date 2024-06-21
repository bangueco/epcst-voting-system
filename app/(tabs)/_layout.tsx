import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './home';
import Profile from './profile';
import Manage from './manage';

import { app } from "../../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

interface dbUser {
  id: string;
  email: string;
  password: string;
  user_type: string;
  username: string;
}

interface authUser {
  uid: string;
}

const TabLayout = () => {
  const auth = getAuth(app);
  const db = getDatabase(app);
  const Tab = createBottomTabNavigator();

  const [authUser, setAuthUser] = useState<authUser | null>(null);
  const [dbUser, setDBUser] = useState<dbUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (authUser) {
      const userRef = ref(db, `/users/${authUser.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setDBUser(data as dbUser);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [authUser, db]);

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: 'green' }}>
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
      {dbUser && dbUser.user_type === 'admin' && (
        <Tab.Screen
          name="Manage"
          component={Manage}
          options={{
            title: 'Manage Students',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default TabLayout;
