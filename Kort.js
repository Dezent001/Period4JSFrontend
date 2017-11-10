import React from 'react';
import { Platform, StyleSheet, Text, TextInput, View, Button, Image } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

export default class App extends React.Component {
  state = {
    location: { coords: { latitude: 0, longitude: 0 } },
    errorMessage: null,
    persons: [],
    name: '',
    dist: '',
    pinColors: ['red', 'orange', 'yellow', 'green', 'blue', 'turquoise', 'violet', 'black'],
  };

  componentWillMount() {
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }

  distChanged(text){ 
    let newText = ''; 
    let numbers = '0123456789'; 
    if(text.length < 1){ 
      this.setState({ dist: '' });
    } 
    
    for (var i=0; i < text.length; i++) { 
      if(numbers.indexOf(text[i]) > -1 ) { 
        newText = newText + text[i]; 
      } 
      this.setState({ dist: newText }); 
    } 
  }

  locationChanged = (location) => {
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.8,
      longitudeDelta: 0.05,
    },
      this.setState({ location, region })
  }

  getPersonsFromApiAsync = () => {
    return fetch('https://backendteststuff.glitch.me/api/friends/register/'+this.state.dist,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: this.state.name,
        loc: {type: 'Point',
              coordinates: [this.state.location.coords.latitude, this.state.location.coords.longitude]}
      })
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("Adding: " +res);
        this.setState({persons: res})
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={{ flex: 1 }} >
          <Text>
            {"\n"}
            </Text>
        <TextInput
          style={{height: 40, borderWidth: 1}}
          placeholder='Navn'
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
        />
        <TextInput
          style={{height: 40, borderWidth: 1}}
          placeholder='Afstand fra venner'
          keyboardType = 'numeric'
          onChangeText = {(text)=> this.distChanged(text)}
          value = {this.state.dist}
          maxLength = {3}  
        />
        <Button onPress={ () => {
              if(this.state.dist){
                this.getPersonsFromApiAsync()
              }
            }
            }
          title="Søg"
          accessibilityLabel="Learn more about this purple button"
        />
        <MapView
          ref={ref => this.map = ref}
          onLayout={this.onMapLayout}
          style={{ flex: 0.7 }}
          showsUserLocation={true}
          region={this.state.region}
        >
          {this.state.persons.map(person => {
            return (
              <MapView.Marker 
                key={person.userName}
                coordinate={{
                  latitude: person.loc.coordinates[0],
                  longitude: person.loc.coordinates[1]
                }}
                title={person.userName}
                pinColor={this.state.pinColors[Math.floor(Math.random() * this.state.pinColors.length)]}
              />
            );
          })}
        </MapView>
        <Text>
          {"\n"}
          Skriv dit navn og max afstanden til dine venner i feltet øverst,
          click derefter på søg.
          </Text>
      </View>
    );
  }
}
