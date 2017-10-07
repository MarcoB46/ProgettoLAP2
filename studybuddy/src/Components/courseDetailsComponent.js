import React, { Component } from 'react'
import { Text, ScrollView , SectionList, View} from 'react-native'
import SectionListElement from '../Common/sectionListElement'
import HeaderSectionList from '../Common/headerSectionList'
import {Spinner} from '../Common/spinner'
import {Card, Text as CustomText} from 'react-native-elements'
import firebase from '../Common/firebase'

export default class courseDetailsComponent extends Component {

  constructor(props){
    super(props);

  }
  
componentWillMount = () => {
  firebase.messaging().getInitialNotification()
  .then((notification) => {
    console.log('Notification which opened the app: ', notification);
  });
  
  firebase.messaging().onMessage((message) => {
      console.log('notifica durante app in foreground ', message);
      
    });
}

  
  componentDidMount = () => {
    this.props.fetchCourseDetails();
  }
  
  render() {
    const {navigate} = this.props.navigation;
    return (  
      <View style={{flex:1}}>
        {
          this.props.isLoading
          ?
              <Spinner/>
          :
          <ScrollView style={{backgroundColor:'#E8EAF6' ,flex:1}}>
            <View style={{alignContent:'space-around'}}>
              <CustomText h2 style={{textAlign:'center', color:'#3F51B5'}} >Seleziona una materia</CustomText>
              {
                this.props.materie.map(function(value, i){
                  return (
                    <Card key={i} containerStyle={{marginBottom:'4%'}} >
                      <SectionList
                        renderItem={({item}) => <SectionListElement 
                                                  title={item.nome_materia}  
                                                  key={item.key} 
                                                  codice={item.codice_materia}
                                                  callback={navigate}
                                                  />}
                        renderSectionHeader={({section}) => <HeaderSectionList title={section.title} />}
                        sections={[           
                          {data:value.materie , title: value.anno, keyExtractor: (item, index) => `key-${index}`}
                        ]}/>
                    </Card>
                  );
                })
              }
            </View>
          </ScrollView>
        }
        </View>
    )
  }

}