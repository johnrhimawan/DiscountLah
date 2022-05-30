import React, { Component } from 'react'
import {
    View,
    Button,
    TextInput,
    StyleSheet,
    Pressable,
    Text,
    Image,
  } from "react-native";

import * as firebase from "firebase"

import logo from "../../assets/logo.png";

import {
  useFonts,
  Sunflower_500Medium,
  Sunflower_700Bold,
} from "@expo-google-fonts/dev";

export class Register extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: ""
        }
        this.onSignUp = this.onSignUp.bind(this)
    }
    
    onSignUp() {
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            firebase.firestore().collection("users")
                .doc(firebase.auth().currentUser.uid)
                .set({
                    name,
                    email
                })
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View>
          <Image source={logo} style={{width: 300, height: 300}} />
          <Text style={{fontFamily: "Sunflower_700Bold", fontSize: 24, textAlign: "left", marginLeft: 10, marginBottom: 5}}> Create Account</Text>
          </View>
                <TextInput
                    placeholder="Full name"
                    onChangeText={(name) => this.setState({ name })}
                    style={styles.textinput}
                />
                <TextInput
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={(email) => this.setState({ email })}
                    style={styles.textinput}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                    style={styles.textinput}
                />
                
          <Pressable style={styles.button} onPress={() => this.onSignUp()}>
            <Text style={styles.text}> Register </Text>
          </Pressable>
            </View>
        )
    }
}

export default Register


const styles = StyleSheet.create({
    textinput: {
      borderWidth: 2,
      borderColor: "#9f9f9f",
      padding: 8,
      margin: 8,
      width: 250,
      borderRadius: 10
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 15,
      paddingHorizontal: 70,
      borderRadius: 10,
      elevation: 3,
      backgroundColor: "#f3a256",
      marginTop: 20,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
    },
  });
  