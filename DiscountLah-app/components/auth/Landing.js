import React from 'react'
import { Text, View, Pressable, Image, StyleSheet } from 'react-native'
import logo from "../../assets/logo.png"

import {
  useFonts,
  Sunflower_500Medium,
  Sunflower_700Bold
} from "@expo-google-fonts/dev";

export default function Landing({ navigation }) {

  let [fontsLoaded] = useFonts({
    Sunflower_500Medium,
    Sunflower_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View>
          <Image source={logo} style={{ width: 300, height: 300 }} />
          <Text style={{fontFamily: "Sunflower_700Bold", fontSize: 24, textAlign: "left", marginLeft: 10}}> Welcome!</Text>
          <Text style={{fontFamily: "Sunflower_500Medium", fontSize: 18, color: "#9f9f9f", textAlign: "left", marginLeft: 15, marginTop: 5}}>Login or Sign Up to continue</Text>
        </View>
        <View style={{marginTop: 10}}>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Register")}>
          <Text style={styles.text}> Sign Up </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.text}> Login </Text>
        </Pressable>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: '#f3a256',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})