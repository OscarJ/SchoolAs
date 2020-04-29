import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SubjectScreen from '../screens/SubjectScreen';
import { SchoolService } from '../services/schoolService';
import { Button } from 'react-native';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function PendingBottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      {SchoolService.studentinfo.schools && SchoolService.studentinfo.schools.map(x => {
        return(
          <BottomTab.Screen
            name={x}
            key={x.replace(' ','_')}
            component={SubjectScreen}
            options={{
              title: x,
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
            }}
          />
        );
      })}
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Completados';
    default:
      return routeName;
  }
}
