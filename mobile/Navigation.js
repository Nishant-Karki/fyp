import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Services from "./screens/Booking/Services";
import Cart from "./screens/Booking/Cart";
import ServiceDetail from "./screens/Booking/ServiceDetail";
import Signup from "./screens/Login/Signup";
import Login from "./screens/Login/Login";
import Profile from "./screens/Profile/Profile";
import CustomDrawer from "./CustomDrawer";
import { Feather, Entypo } from "@expo/vector-icons";
import { Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import AboutUs from "./screens/About Us/AboutUs";
import Home from "./screens/Home/Home";
import Products from "./screens/Store/Products";
import ProductDetail from "./screens/Store/ProductDetail";
import ProductCart from "./screens/Store/ProductCart";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const userData = useSelector((state) => state.login.userData);
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Booking" component={StackNavigation} />
      <Drawer.Screen name="Products" component={StoreNavigation} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="About Us" component={AboutUs} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Logout" component={Login} />
      <Drawer.Screen name="Signup" component={Signup} />
    </Drawer.Navigator>
  );
};

// const Tab = createBottomTabNavigator();
// const TabNavigation = () =>{
//   return(
//     <Tab.Navigator
//     tabBarOptions={{
//       activeTintColor: '#e91e63',
//     }}>
//     <Tab.Screen name="Home" component={StackNavigation}
//      options={{
//       tabBarLabel: 'Home',
//       tabBarIcon: ({ color, size }) => (
//         <MaterialCommunityIcons name="home" color={color} size={size} />
//       ),
//     }} />
//     <Tab.Screen name="Cart" component={Cart}
//     options={{
//       tabBarLabel: 'Cart',
//       tabBarIcon: ({ color, size }) => (
//         <MaterialCommunityIcons name="cart" color={color} size={size} />
//       ),
//       tabBarBadge: 3,
//     }}/>
//   </Tab.Navigator>
//   )
// }

const Stack = createStackNavigator();

const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",

        headerLeftContainerStyle: { marginLeft: 30, marginTop: 3 },
        headerRightContainerStyle: { marginRight: 25, marginTop: 3 },
        headerStyle: {
          backgroundColor: "teal",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Services"
        component={Home}
        options={{
          headerTitle: "Nepa De Salon",
          headerLeft: () => (
            <TouchableOpacity>
              <Feather
                name="menu"
                size={24}
                color="white"
                onPress={() => navigation.openDrawer()}
              />
            </TouchableOpacity>
          ),
          //   headerRight: () => (
          //     <MaterialCommunityIcons name="cart" style={{marginLeft:20}} size={20} />
          //   ),
        }}
      />
    </Stack.Navigator>
  );
};

const StoreNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerLeftContainerStyle: { marginLeft: 30, marginTop: 3 },
        headerRightContainerStyle: { marginRight: 25, marginTop: 3 },
        headerStyle: {
          backgroundColor: "teal",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Products"
        component={Products}
        options={{
          headerTitle: "Salon Products",
          headerLeft: () => (
            <TouchableOpacity>
              <Feather
                name="menu"
                size={24}
                color="white"
                onPress={() => navigation.openDrawer()}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Entypo
                name="shopping-cart"
                size={24}
                color="white"
                onPress={() => navigation.navigate("Product Cart")}
              />
            </TouchableOpacity>
          ),
          //   headerRight: () => (
          //     <MaterialCommunityIcons name="cart" style={{marginLeft:20}} size={20} />
          //   ),
        }}
      />
      <Stack.Screen
        name="Product Detail"
        component={ProductDetail}
        options={{
          headerTitle: "Product Detail",
          //     headerRight: () => (
          //     <Button title='cart' style={{backgroundColor:'red'}}/>
          // //   <MaterialCommunityIcons name="cart" size={20} />
          // ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Product Cart"
        component={ProductCart}
        options={{
          headerTitle: "Product Cart",
          //     headerRight: () => (
          //     <Button title='cart' style={{backgroundColor:'red'}}/>
          // ),
        }}
      />
    </Stack.Navigator>
  );
};

const StackNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerLeftContainerStyle: { marginLeft: 30, marginTop: 3 },
        headerRightContainerStyle: { marginRight: 25, marginTop: 3 },
        headerStyle: {
          backgroundColor: "teal",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Services"
        component={Services}
        options={{
          headerTitle: "Salon Services",
          headerLeft: () => (
            <TouchableOpacity>
              <Feather
                name="menu"
                size={24}
                color="white"
                onPress={() => navigation.openDrawer()}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Entypo
                name="shopping-cart"
                size={24}
                color="white"
                onPress={() => navigation.navigate("Cart")}
              />
            </TouchableOpacity>
          ),
          //   headerRight: () => (
          //     <MaterialCommunityIcons name="cart" style={{marginLeft:20}} size={20} />
          //   ),
        }}
      />
      <Stack.Screen
        name="Item Detail"
        component={ServiceDetail}
        options={{
          headerTitle: "Item Detail",
          //     headerRight: () => (
          //     <Button title='cart' style={{backgroundColor:'red'}}/>
          // //   <MaterialCommunityIcons name="cart" size={20} />
          // ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerTitle: "Cart",
          //     headerRight: () => (
          //     <Button title='cart' style={{backgroundColor:'red'}}/>
          // ),
        }}
      />
    </Stack.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
}
