


const home = () => {
  return (
    <View>
    <Text>home</Text>
</View>
    )
}


        const MainPage = () => {
          return (
            <Stack.Navigator>
              <Stack.Screen
                name="PostList"
                component={PostList}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Post"
                component={Post}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Explain"
                component={Explain}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          );
        };



<Tab.Navigator>
<Tab.Screen
  name="MainPage"
  component={MainPage}
  options={{
    headerShown: false,
    tabBarStyle: {display: 'none'},

    tabBarIcon: ({color}) => (
      <FontAwesome5 name="list" size={20} style={{color}} />
    ),
    tabBarActiveTintColor: 'blue',
  }}
/>
</Tab.Navigator>




<Drawer.Navigator initialRouteName="Home">
<Tab.Navigator>
<Tab.Screen
  name="MainPage"
  component={MainPage}
  options={{
    headerShown: false,
    tabBarStyle: {display: 'none'},

    tabBarIcon: ({color}) => (
      <FontAwesome5 name="list" size={20} style={{color}} />
    ),
    tabBarActiveTintColor: 'blue',
  }}
/>
</Tab.Navigator>
</Drawer.Navigator>

