import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{
      contentStyle: {backgroundColor: '#31363F'}
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" options={{headerShown: false}} />
    </Stack>
  );
}
