import React, {Component} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Alert,
  BackHandler
} from 'react-native';
import NotifService from './src/NotifService';
import Navegador from './src/navegador';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    this.notif = new NotifService(
        this.onRegister.bind(this),
        this.onNotif.bind(this),
        this.cancelNotif.bind(this),
      );
  }
    
  render() {
    return (
      <View style={styles.navegador}>
        {/* componente que renderiza a pagina web dentro do app */}
        <Navegador token={this.state.registerToken} />
      </View>
     
    );
  }
  
  onRegister(token) {
    this.setState({ registerToken: token.token, fcmRegistered: false });
  }
  cancelNotif() {
    PushNotification.cancelLocalNotification(this.lastId);
  }
  
  onNotif(notif) {
    if (enviaMsgPush === 'true') {
      Alert.alert(
        notif.title,
        notif.message,
        notif.body
      );
    } 
  }
  
  handlePerm(perms) {
    Alert.alert('Permissions', JSON.stringify(perms));
    //console.log('Permissions', JSON.stringify(perms))
  }
  //estas duas funções manipulam o evento do botão voltar
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
  }
  //acessa a navegação para voltar dentro da webview
  backButtonHandler() {
    if (Navegador.webviewRef.current) Navegador.webviewRef.current.goBack()
  }
  //bloqueia o evento do botão voltar para o inicio e volta dentro da webview
  // se não tiver mais pagina pra voltar na webview ativa o voltar no aparelho
  onBackButtonPressed() {
    backButtonHandler()
    if (voltar === false) {
      return true;  
    }
    else {
      return false;  
    }
  }
}

//Onesigmal
// OneSignal.setAppId('0119ce8f-6e64-418d-bcc7-fa3978c8d59d');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '220px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  navegador: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    padding: 5,
    width: '70%',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    margin: 5,
    padding: 5,
    width: '70%',
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
