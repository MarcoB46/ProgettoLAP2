import React, { Component } from 'react';
import { View, FlatList , ScrollView , Image, TouchableHighlight, Alert} from 'react-native';
import {Card, FormInput, Avatar, Button, Icon} from 'react-native-elements';
import moment from 'moment';
import momentITA from 'moment/locale/it';

export default class NewQuestionComponent extends Component {

    componentWillMount = () => {
      this.props.removePhoto({target:'postPhotosAll'});
    }
    

    constructor(props){
        super(props);
        this.state = {
            text:''
        }
        moment.updateLocale('it', momentITA);
        this.submitHandler=this.submitHandler.bind(this);
    }

    submitHandler = ()=>{
        if(this.state.text===''){ //filtro superficiale
            Alert.alert('Attenzione', 'Non puoi inviare un post vuoto!')
        }else{
            var toSend={
                text:this.state.text,
                date: moment().format('MMMM Do YYYY, HH:mm'), 
                type:'q'
            }
            this.props.sendPost(toSend);
            const {goBack} = this.props.navigation;
            goBack();
        }
    }

    render() {
        return (
            <Card containerStyle={{flex:1,  marginBottom:'3%'}}>
                
                <ScrollView style={{height:'85%', flexDirection:'column'}}>
                <View style={{backgroundColor:'#90CAF9', alignSelf:'auto' , borderRadius:25, borderWidth:1, borderColor:'#2196F3'}}>
                    <FormInput 
                            style={{color:'black'}}
                            autoCorrect={true}
                            blurOnSubmit={false}
                            multiline={true}
                            numberOfLines={10}
                            onChangeText={(newText)=>{
                                this.setState({
                                    text:newText
                                })
                            }}
                            placeholder='Cosa vuoi chiedere ?'
                            placeholderTextColor='#2196F3'
                            selectionColor='#2196F3'
                            value={this.state.text}
                        />
                </View>
                <View style={{ marginTop:'20%', flexDirection:'row'}}>
                    <Avatar
                        large
                        rounded
                        icon={{name: 'camera', type: 'font-awesome'}}
                        onPress={() =>{
                            this.props.takePhoto({target:'postPhoto'});
                        }}
                        activeOpacity={0.7}
                        containerStyle={{alignSelf:'center', backgroundColor:'#03A9F4'}}
                    />   
                    <FlatList
                        data={this.props.postPhoto}
                        renderItem={({item, index}) => {
                            return(
                                    <View style={{backgroundColor:'#C5CAE9'}}>

                                    <Image source={{uri: item.source}} resizeMethod='auto' resizeMode='contain' style={{width: 300, height:300 , margin:10 }}/>
                                    <Icon
                                        underlayColor='white'
                                        name='times'
                                        type='font-awesome'
                                        reverse
                                        raised
                                        size={15}
                                        color='#F44336'
                                        containerStyle={{position:'absolute', top: 5,left:5}}
                                        onPress={()=>{ 
                                            console.log('premuto')
                                            this.props.removePhoto({target:'postPhoto',index:index}) }}
                                        /> 
                                    </View>
                                )}}
                        horizontal={true}
                        keyExtractor={(item, index)=> index}
                    />
                </View>

                </ScrollView>
                <Button
                        containerViewStyle={{marginTop:'10%' }}
                        small
                        icon={{name: 'paper-plane', type: 'font-awesome'}}
                        backgroundColor='#2196F3'
                        title='Posta Domanda' 
                        onPress={()=>{
                            this.submitHandler();
                        }}
                        />

            </Card>            
        )
    }

}