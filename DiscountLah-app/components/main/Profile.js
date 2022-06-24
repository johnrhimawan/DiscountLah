import React, { Component } from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import firebase from "firebase";

import {
  useFonts,
  Sunflower_500Medium,
  Sunflower_700Bold,
} from "@expo-google-fonts/dev";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from "../../redux/actions/index";

import ProfileModal from "../feature/ProfileModal"

const onLogout = () => {
  firebase.auth().signOut();
};

export class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    }
    this.toggleOpenModal = this.toggleOpenModal.bind(this);
    this.toggleCloseModal = this.toggleCloseModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  toggleOpenModal() {
    this.setState({
      modalIsOpen: true,
    })
  }

  toggleCloseModal() {
    this.setState({
      modalIsOpen: false,
    })
  }

  render() {
    const { currentUser } = this.props; 
    console.log(currentUser);

    if (currentUser == undefined) {
      return <View></View>;
    } 

    return (
      <View style={styles.container}>
        <View style={styles.textContent}>
          <Text
            style={{
              fontFamily: "Sunflower_700Bold",
              fontSize: 24,
              textAlign: "left",
              marginLeft: 15,
              marginTop: 10,
              marginBottom: 5,
            }}
          >
            {currentUser.name}
          </Text>
          <Text
            style={{
              fontFamily: "Sunflower_500Medium",
              fontSize: 18,
              color: "#9f9f9f",
              textAlign: "left",
              width: "60%",
              marginLeft: 15,
              marginTop: 5,
              marginBottom: 10,
            }}
          >
            {currentUser.email}
          </Text>
          <Pressable style={[styles.button, {marginLeft: 10}]} onPress={this.toggleOpenModal}>
            <Text style={styles.text}> Edit Profile </Text>
          </Pressable>
        </View>
        <View style={{ marginTop: 20, alignItems: "center", flex: 1 }}>
          <Pressable style={styles.button} onPress={() => onLogout()}>
            <Text style={styles.text}> Logout </Text>
          </Pressable>
        </View>
        <Modal visible={this.state.modalIsOpen} transparent={true} onRequestClose={this.toggleCloseModal} style={styles.modalBackground}>
          <ProfileModal user={currentUser} closeModal={this.toggleCloseModal} />
        </Modal>
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
  container: {
    flex: 1,
  },
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#f3a256",
    marginTop: 20,
    width: "55%",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  textContent: {
    marginLeft: 10,
    marginTop: 10,
    flex: 4,
    padding: 10,
  },
});
