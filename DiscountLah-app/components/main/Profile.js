import React, { Component } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import firebase from "firebase";

import {
  useFonts,
  Sunflower_500Medium,
  Sunflower_700Bold,
} from "@expo-google-fonts/dev";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from "../../redux/actions/index";

const onLogout = () => {
  firebase.auth().signOut();
};

export class Profile extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { currentUser } = this.props;
    console.log(currentUser);

    if (currentUser == undefined) {
      return <View></View>;
    }

    return (
      <View>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              fontFamily: "Sunflower_700Bold",
              fontSize: 24,
              textAlign: "left",
              marginLeft: 10,
              marginBottom: 5,
            }}
          >
            User Profile
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "Sunflower_500Medium",
              fontSize: 18,
              color: "#9f9f9f",
              textAlign: "left",
              marginLeft: 15,
              marginTop: 5,
              marginBottom: 10,
            }}
          >
            Name: {currentUser.name}
          </Text>
          <Text
            style={{
              fontFamily: "Sunflower_500Medium",
              fontSize: 18,
              color: "#9f9f9f",
              textAlign: "left",
              marginLeft: 15,
              marginTop: 5,
              marginBottom: 10,
            }}
          >
            Email: {currentUser.email}
          </Text>
        </View>
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Pressable style={styles.button} onPress={() => onLogout()}>
            <Text style={styles.text}> Logout </Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Profile);

const styles = StyleSheet.create({
  textinput: {
    borderWidth: 2,
    borderColor: "#9f9f9f",
    padding: 8,
    margin: 8,
    width: 250,
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#f3a256",
    marginTop: 20,
    width: 250,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
