import React, { Component } from 'react'
import { ColorPropType, Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from './main/Home'
import ProfileScreen from './main/Profile'
import AddScreen from './main/Add'
import CouponScreen from './main/Coupons'
import MapScreen from './main/Map'

const Tab = createBottomTabNavigator();

export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        const { currentUser } = this.props;
        // console.log(currentUser)

        if (currentUser == undefined) {
            return (
                <View>
                </View>
            )
        }
        return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} 
                    options={{
                        tabBarIcon:({ color, size}) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen name="Map" component={MapScreen} 
                    options={{
                        tabBarIcon:({ color, size}) => (
                            <MaterialCommunityIcons name="map" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen name="Add" component={AddScreen} 
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Add")
                        }
                    })}
                    options={{
                        tabBarIcon:({ color, size}) => (
                            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen name="Coupons" component={CouponScreen} 
                    options={{
                        tabBarIcon:({ color, size}) => (
                            <MaterialCommunityIcons name="tag-text" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen name="Profile" component={ProfileScreen} 
                    options={{
                        tabBarIcon:({ color, size}) => (
                            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                        ),
                    }}
                />
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)


export default connect(mapStateToProps, mapDispatchProps)(Main)