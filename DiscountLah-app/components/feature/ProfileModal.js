import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Dimensions,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Touchable,
} from "react-native";

import firebase from "firebase";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export class ProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.user.email,
      newPassword: "",
      toConfirmPassword: "",
      name: this.props.user.name,
      updated: false,
      isNameChange: false,
      isEmailChange: false,
      buttonText: "Update Profile",
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  async handleUpdate() {
    const email = this.state.email;
    const password = this.state.newPassword;
    const confirmPassword = this.state.toConfirmPassword;
    const name = this.state.name;

    if (password !== confirmPassword) {
      console.log("wrong password");
    } else if (password === "") {
      this.setState({
        email: this.state.email,
        password: this.state.password,
        toConfirmPassword: this.state.password,
        name: this.state.name,
        updated: true,
        isNameChange: this.state.isNameChange,
        isEmailChange: this.state.isEmailChange,
        buttonText: "Updating...",
      });

      firebase
        .auth()
        .currentUser.updateEmail(email)
        .then(() => {
          console.log("email updated");
        })
        .catch((error) => {
          console.log(error);
        });

      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          email: email,
          name: name,
        })
        .then(() => {
          console.log("User Updated!");
          this.props.closeModal();
        });
    } else {
      this.setState({
        email: this.state.email,
        password: this.state.password,
        toConfirmPassword: this.state.password,
        name: this.state.name,
        updated: true,
        isNameChange: this.state.isNameChange,
        isEmailChange: this.state.isEmailChange,
        buttonText: "Updating...",
      });
      firebase
        .auth()
        .currentUser.updateEmail(email)
        .then(() => {
          console.log("email updated");
        })
        .catch((error) => {
          console.log(error);
        });

      firebase
        .auth()
        .currentUser.updatePassword(password)
        .then(() => {
          console.log("password updated");
        })
        .catch((error) => {
          console.log(error);
        });

      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          email: email,
          name: name,
        })
        .then(() => {
          console.log("User Updated!");
          this.props.closeModal();
        });
    }
  }

  render() {
    return (
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => this.props.closeModal()}
          >
            <MaterialCommunityIcons name="close" color={"#a0a0a0"} size={30} />
          </TouchableOpacity>

          <ScrollView>
            <View style={{ paddingBottom: 40 }}>
              <View style={[styles.profilePlaceholder, { marginTop: 0 }]}>
                <Text
                  style={{
                    fontFamily: "Sunflower_700Bold",
                    fontSize: 24,
                    textAlign: "left",
                    marginLeft: 10,
                    marginBottom: 5,
                  }}
                >
                  {" "}
                  Edit Profile
                </Text>
                <View style={styles.specificPlaceholders}>
                  <Text style={{ marginTop: 10, marginLeft: 10 }}>Name</Text>
                  <TextInput
                    placeholder={this.props.user.name}
                    onChangeText={(name) => this.setState({ name })}
                    style={styles.textinput}
                  />
                  <Text style={{ marginTop: 10, marginLeft: 10 }}>Email</Text>
                  <TextInput
                    placeholder={this.props.user.email}
                    keyboardType="email-address"
                    onChangeText={(email) => this.setState({ email })}
                    style={styles.textinput}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: "Sunflower_700Bold",
                    fontSize: 24,
                    textAlign: "left",
                    marginLeft: 10,
                    marginBottom: 5,
                    marginTop: 30,
                  }}
                >
                  {" "}
                  Security Options
                </Text>
                <View style={styles.specificPlaceholders}>
                  <Text style={{ marginTop: 10, marginLeft: 10 }}>
                    New Password
                  </Text>
                  <TextInput
                    placeholder="New Password"
                    secureTextEntry={true}
                    onChangeText={(newPassword) =>
                      this.setState({ newPassword })
                    }
                    style={styles.textinput}
                  />
                  <Text style={{ marginTop: 10, marginLeft: 10 }}>
                    Confirm New Password
                  </Text>
                  <TextInput
                    placeholder="Confirm New Password"
                    secureTextEntry={true}
                    onChangeText={(toConfirmPassword) =>
                      this.setState({ toConfirmPassword })
                    }
                    style={styles.textinput}
                  />
                </View>
              </View>
              <View style={styles.buttonContent}>
                <Pressable
                  style={styles.button}
                  onPress={() => this.handleUpdate()}
                >
                  <Text style={styles.text}>{this.state.buttonText}</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default ProfileModal;

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
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#f3a256",
    marginTop: 20,
    width: "85%",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  cardImage: {
    flex: 2,
    width: "100%",
    height: "20%",
    alignSelf: "center",
  },
  profilePlaceholder: {
    flex: 4,
    padding: 10,
    alignItems: "center",
    marginTop: 30,
  },
  cardtitle: {
    fontSize: 16,
    // fontFamily: "Sunflower_700Bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
    // fontFamily: "Sunflower_500Medium",
  },
  cardValidity: {
    fontSize: 10,
    color: "#777",
    // fontFamily: "Sunflower_500Medium",
  },
  marker: {
    width: 30,
    height: 30,
  },
  couponButton: {
    width: "100%",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  header: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  buttonContent: {
    flex: 1,
    paddingHorizontal: 40,
    top: 10,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 20,
    marginLeft: 20,
  },
});
