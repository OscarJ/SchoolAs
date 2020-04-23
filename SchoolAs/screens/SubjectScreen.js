import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { SchoolService } from '../services/schoolService';


export default function SubjectScreen({ navigation, route }) {
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <List.Section title="Clases">
      {SchoolService.studentinfo[route.name].map(x => {
        return (
          <List.Accordion
            title={x.Class}
            left={props => <List.Icon {...props} icon="folder" />}
          >
            {x.Subjects.map(y => {
              return (
                <List.Accordion
                  title={y.Name}
                  left={props => <List.Icon {...props} icon="chair-school" />}
                >
                  {y.Assignments.map(w => {
                    return (
                    <List.Item 
                      title={w.Name}
                      description={w.Instructions}
                      right={props => <List.Icon {...props} icon="arrow-right-circle" />}
                    />
                    );
                  })}
                  </List.Accordion>
              );
            })}
          </List.Accordion>
          
        );
      })}
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
