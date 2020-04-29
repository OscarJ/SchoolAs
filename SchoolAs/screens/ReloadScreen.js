import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { SchoolService } from '../services/schoolService';

const _schoolService = SchoolService.createInstance();

export default class ReloadScreen extends Component {
  
  render(){
    let nav = this.props.navigation;
    setTimeout(function(){
      _schoolService.getStudentInfo(_schoolService.studentinfo.Id, function(data){
        nav.navigate('Estudiante');
      });
    },100);

    const viewStyles = [
      styles.container,
      { backgroundColor: 'orange' }
    ];
    const textStyles = {
      color: 'white',
      fontSize: 40,
      fontWeight: 'bold'
    };

    return (
      <View style={viewStyles}>
        <Text style={textStyles}>
          Recargando...
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

