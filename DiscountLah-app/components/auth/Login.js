import React, { Component } from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  Image,
} from "react-native";

import * as firebase from "firebase";

import logo from "../../assets/logo.png";

import {
  useFonts,
  Sunflower_500Medium,
  Sunflower_700Bold,
} from "@expo-google-fonts/dev";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isValid: true,
    };
    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        this.setState({
          email: this.state.email,
          password: this.state.password,
          isValid: true,
        })
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          email: this.state.email,
          password: "",
          isValid: false,
        })
      });
  }

  render() {
    return (
      <>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <View>
          <Image source={logo} style={{width: 300, height: 300}} />
          <Text style={{fontFamily: "Sunflower_700Bold", fontSize: 24, textAlign: "left", marginLeft: 10}}> Login</Text>
          <Text style={{fontFamily: "Sunflower_500Medium", fontSize: 18, color: "#9f9f9f", textAlign: "left", marginLeft: 15, marginTop: 5, marginBottom: 10}}>Please sign in to continue</Text>
          </View>
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
          <Text style={{color: "#ff0000"}}>{this.state.isValid ? "" : "Incorrect Email or Password"}</Text>
          <Pressable style={styles.button} onPress={() => this.onSignUp()} testId="Login.Button">
            <Text style={styles.text}> Login </Text>
          </Pressable>
        </View>
      </>
    );
  }
}

export default Login;

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