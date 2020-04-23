import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Image, TextInput, Button } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import { SchoolService } from './services/schoolService';

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [studentId, setStudenId] = React.useState(undefined);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const [studentInfo, setStudentInfo] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const _schoolService = new SchoolService();
  SchoolService.cleartstudent = setStudenId;
  let temporaryStudentId = '';

  const getInformation = function(id){
    _schoolService.getStudentInfo(id, function(data){
      if(data.Code === 0){
        setStudentInfo(data.Items[0]);
      }
    });
  }

  const handleChange = function(newText){
    temporaryStudentId = newText;
  }

  const handleLogin = function(){
    setStudenId(temporaryStudentId);
    SchoolService.studentinfo.Id = temporaryStudentId;
  }
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        getInformation('121700597');
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    if(!studentId){
     return (
      <View style={styles.setting}>
        <Image
              source={
                __DEV__
                  ? require('./assets/images/logo.jpeg')
                  : require('./assets/images/logo.jpeg')
              }
              style={styles.welcomeImage}
            />
        <TextInput 
          placeholder="Digite el numero de cedula del estudiante"
          keyboardType="number-pad"
          onChangeText={handleChange}/>
        <Button 
          title="Ingresar"
          onPress={handleLogin}>
        </Button>
      </View>);
    }
    else{
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            <Stack.Navigator>
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
    );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  setting: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#fff',
  }
});
