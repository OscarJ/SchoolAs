import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Image, TextInput, Button } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import useLinking from './navigation/useLinking';
import { SchoolService } from './services/schoolService';
import PendingScreen from './screens/PendingScreen';
import DoneScreen from './screens/DoneScreen';
import HomeScreen from './screens/HomeScreen';
import ExitScreen from './screens/ExitScreen';
import ReloadScreen from './screens/ReloadScreen';
import AssignmentScreen from './screens/AssignmentScreen';

const Drawer = createDrawerNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const [isUserAuthenticated, setUserAuthenticated] = React.useState(false);
  const [currentAssignment, setAssignment] = React.useState(undefined);
  const [classInfo, setClassInfo] = React.useState(undefined);
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const _schoolService = SchoolService.createInstance();

  _schoolService.setAssignmentFn(setAssignment);
  _schoolService.setStateClassesFn(setClassInfo);

  let temporaryStudentId = '';

  const getInformation = function(id){
    _schoolService.getStudentInfo(id, function(success){
      if(success){
        console.log('c');
        setUserAuthenticated(true);
      }
    });
  }

  const handleChange = function(newText){
    temporaryStudentId = newText;
  }

  const handleLogin = function(){
    getInformation(temporaryStudentId);
  }
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        
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
    if(!isUserAuthenticated){
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
         style={{textAlign:'center'}}
          placeholder="Digite el numero de cedula del estudiante"
          keyboardType="number-pad"
          onChangeText={handleChange}/>
        <Button 
          title="Ingresar"
          onPress={handleLogin}>3
        </Button>
      </View>);
    }
    else{
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            <Drawer.Navigator initialRouteName="Home">
              <Drawer.Screen name="Estudiante" component={HomeScreen} />
              <Drawer.Screen name="Pendientes" component={PendingScreen} />
              <Drawer.Screen name="Completados" component={DoneScreen} />
              {currentAssignment && <Drawer.Screen name="Asignacion" component={() => <AssignmentScreen assignment={currentAssignment}/>} />}
              <Drawer.Screen name="Recargar" component={ReloadScreen} onPress={()=>{console.log('asdf')}}/>
              <Drawer.Screen name="Salir" component={ExitScreen} onPress={() => {}} />
            </Drawer.Navigator>
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
