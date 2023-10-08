/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, ImageBackground, Image, SafeAreaView, ScrollView } from 'react-native';
import BottomCard from './components/BottomCard';
import CardContainer from './components/CardContainer';
import TitleArea from './components/TitleArea';
import WinnerCard from './components/WinnerCard';

// try to do a separate component for the homepage
const LottoApp = () => {
  const images = {
    background: require('./images/background.jpg'),
    logo: require('./images/logo.png'),
  }

  const childrenCards = {
    light: [["1 week", "NOK 50"], ["2 weeks", "NOK 90"], ["5 weeks", "NOK 200"], ["Subscribe", "Be the next winner!"]],
    dark: [["Lucky coupon", "clover"], ["Cooperative bank", "pie-chart"], ["System games", "system"], ["Super draw", "star"], ["Fill in yourself", "pencil"], ["How to play", "info"]],
  }

  const [visiblePage, setVisiblePage] = useState("home");
  const [items, setItems] = useState<any[]>([]);

  const switchPage = (page: string) => {
    var data = require('./data/data.json');
    
    setVisiblePage(page);

    if (page === 'results') {
      setItems(data.results);
    }
  }

  return (
    <ScrollView style={{flex: 1}}>
      { visiblePage === 'home' && 
        <View style={{
            flex: 1,
            backgroundColor: '#ecf2eb',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>

          <ImageBackground
            source={images.background}
            style={{width: '100%', height: 350}}
          >
          
          <View style={{
            flex: 0.1,
            flexWrap: 'wrap',
            alignContent: 'flex-start',
          }}>
            <Image 
              source={images.logo}
              style={{height: 25, marginTop: 30, resizeMode: 'contain'}}
            />
          </View>

          <Text style={{color: '#22391f', fontWeight: 'bold', fontSize: 15, marginLeft: 20, marginTop: 15}}>Log in</Text>

          <TitleArea bigTitle="New lotto millionaires every Thursday" subtitle="About 14 million NOK in the first prize pot" />
          
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{color: '#22391f', fontWeight: 'bold'}}>Deadline Wednesday at 18:00</Text>
            <CardContainer color="light" children={ childrenCards.light } />
          </View>
      
          </ImageBackground>

          <CardContainer color="dark" children={ childrenCards.dark } />

          <BottomCard mainText="Results" caption="All winning numbers and prizes" bottomPress={switchPage}/>

        </View>
      }
      
      { visiblePage === 'results' &&
        <SafeAreaView>
          <View style={{
            flex: 0.1,
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            backgroundColor: '#ecf2eb',
          }}>
            <Text onPress={() => switchPage('home')} style={{color: '#22391f', fontSize: 15, margin: 10, textDecorationLine: 'underline'}}>&lt; Go back</Text>
          </View>
          
          <ScrollView style={{backgroundColor: '#ecf2eb'}}>
            {
              items.map((item, index) => (
                <WinnerCard key={index} id={item.id} week={item.week} name={item.winner} city={item.city} prize={item.prize} numbers={item.winningNumbers} />
              ))
            }
          </ScrollView>
        </SafeAreaView>
      }
    </ScrollView>
  );
}

export default LottoApp;
