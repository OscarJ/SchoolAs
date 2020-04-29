import * as React from 'react';
import { SchoolService } from '../services/schoolService';
import { StyleSheet, View, Text, Button, Linking, ScrollView } from 'react-native';

const _schoolService = SchoolService.createInstance();

export default function AssigmentScreen({ assignment }) {
  console.log('assignment');
  console.log(assignment);
  const viewStyles = [
    styles.container,
    { backgroundColor: 'orange' }
  ];
  const header = {
    paddingTop: 10,
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  };
  const textStyles = {
    padding: 5,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  };

  const completeTask = (id, task) => {
    
    _schoolService.completeAssignmentFn(id, function(x){
      if(x.Code === 0){
        task.Completed = true;
        task.Name += ' - Completado';
        _schoolService.setAssignment(undefined);
      }
    });
  }
  
  return (
    <View style={viewStyles}>
      <Text style={header}>
        {assignment.Name}
      </Text>
      <ScrollView>
        <Text style={textStyles}>
          {assignment.Description}
        </Text>
        
        <View>
          {assignment.Links && assignment.Links.split(' ').map(x => {
            return(
              <Text style={{color: 'blue'}}
                    onPress={() => Linking.openURL(x)}>
                {x}
              </Text>
            );
          })}
        </View>

        <View>
          {assignment.Files && assignment.Files.map(x => {
            return(
              <View style={styles.button}>
                <Button
                  onPress={()=>{ 
                    Linking.openURL('http://ozkr.work/api/school/GetFile?fileId=' + x.FileId);
                  }}
                  title={`${x.Name}.${x.Extension}`}
                  ></Button>
                </View>
            );
          })}
        </View>
      </ScrollView>
      
      {!assignment.Completed && <View style={styles.complete}>
        <Button color="green"title="Completado" 
          onPress={() => { completeTask(assignment.AssignmentId, assignment) } }>
        </Button>
      </View>}
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5
  },
  complete: {
    width:'100%'
  },
  button:{
    margin: 2
  }
});