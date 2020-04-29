import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { SchoolService } from '../services/schoolService';

const _schoolService = SchoolService.createInstance();

export default function SubjectScreen({ navigation, route }) {
  
  const getColorBasedOnDate = function(date){
    date = new Date(date);
    var d = new Date();
    d.setDate(d.getDate()-1);
    if(!!!date || new Date() < date){
      return 'green';
    }
    else if(d < date && date < new Date()){
      return 'orange';
    }
    else{
      return 'red';
    }
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <List.Section title="Clases">
      {_schoolService.classInfo[route.name].map(x => {
        return (
          <List.Accordion
            title={x.Class}
            key={x.Class.replace(' ','_')}
            description={x.Teacher}
            left={props => <View style={{backgroundColor:'gray', borderRadius:45, padding:5}}><Text style={{color:'white', fontWeight:'bold'}}>{x.Count}</Text></View>}
          >
            {x.Subjects.map(y => {
              return (
                <List.Accordion
                  title={y.Name}
                  left={props => <View style={{backgroundColor:'gray', borderRadius:45, padding:5}}><Text style={{color:'white', fontWeight:'bold'}}>{y.Count}</Text></View>}
                >
                  {y.Assignments.map(w => {
                    return (
                    <List.Item 
                      title={w.Name}
                      key={w.Name.replace(' ', '_')}
                      description={w.Instructions}
                      onPress={()=> {
                        _schoolService.getAssignmentData(w.AssignmentId, function(data){
                          console.log(data);
                          
                          _schoolService.setAssignment(data.Item);
                          setTimeout(()=>{
                            navigation.navigate('Asignacion');
                          },100);
                        });
                      }}
                      left={props => {
                        return (
                          <View style={{backgroundColor: getColorBasedOnDate(w.Deadline)}}>
                            <Text style={{color:getColorBasedOnDate(w.Deadline)}}>a</Text>
                          </View>);}}
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
