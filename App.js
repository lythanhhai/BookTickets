import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import { useState, useEffect } from 'react'
import utilities from "./tailwind.json";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import BookingTickets from "./screens/BookingTickets/BookingTickets";


export default function App() {
  const [isLoginScreen, setIsLoginScreen] = useState(true)
  const checkScreen = (data) => {
    setIsLoginScreen(data)
  }
  return (
    <TailwindProvider utilities={utilities}>
      <View style={styles.container}>
        {/* { isLoginScreen ? <Login checkScreen={checkScreen}/> : <Register checkScreen={checkScreen}/>} */}
        <BookingTickets />
      </View>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
