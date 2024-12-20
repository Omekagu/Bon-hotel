import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  Linking,
  Text,
} from 'react-native';
import Bottomsheet from '@gorhom/bottom-sheet';
import React, { useRef, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import BoldText13 from '@/component/TextComp/BoldText13';
import TextCaps from '@/component/TextComp/TextCaps';
import MoreComp from '@/component/MoreComp';
import Utility from '@/component/Utiliity';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Heading from '@/component/TextComp/Heading';
import CheckInOutComp from '@/component/CheckInOutComp';
import RoomsNGuest from '@/component/RoomsNGuest';
import PricePerNight from '@/component/PricePerNight';
import CustomBotton from '@/component/CustomBotton';
import { router } from 'expo-router';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function SearchPageInfo() {
  const sheetRef = useRef<Bottomsheet>(null);

  const [isOpen, setIsOpen] = useState(false);
  const snapPoints = ['20%'];
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ margin: 20 }}>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderColor: '#000',
            paddingBottom: 10,
          }}
        >
          <Image
            style={{
              width: '100%',
              height: 250,
              marginTop: 10,
            }}
            source={{
              uri: 'https://transtell.bonhotelsinternational.com/wp-content/uploads/2024/10/bon-hotel-transtell-main-block-img-2.jpg',
            }}
          />
        </View>
        <View>
          <Heading heading={'Bon lekki residence'} sub={'8.1'} />
        </View>
        <ScrollView
          horizontal
          style={{
            marginHorizontal: -20,
            paddingBottom: 10,
            height: 120,
            borderBottomColor: '#000',
            borderBottomWidth: 1,
          }}
        >
          <Utility
            icon={
              <MaterialCommunityIcons name="parking" size={24} color="black" />
            }
            name={'free parking'}
          />
          <Utility
            icon={<MaterialIcons name="pool" size={24} color="black" />}
            name={'Outdoor pool'}
          />
          <Utility
            icon={<MaterialIcons name="restaurant" size={24} color="black" />}
            name={'Resturant'}
          />
          <Utility
            icon={
              <MaterialCommunityIcons name="parking" size={24} color="black" />
            }
            name={'Air Conditioning'}
          />
          <Utility
            icon={<MaterialIcons name="bathroom" size={24} color="black" />}
            name={'Private bathroom'}
          />
          <Utility
            icon={<FontAwesome5 name="shower" size={24} color="black" />}
            name={'Shower'}
          />
          <Utility
            icon={<MaterialIcons name="tv" size={24} color="black" />}
            name={'Flat Screen-TV'}
          />
          <Utility
            icon={<Entypo name="aircraft-take-off" size={24} color="black" />}
            name={'Airport shuttle '}
          />
          <Utility
            icon={
              <MaterialCommunityIcons name="broom" size={24} color="black" />
            }
            name={'Room Service'}
          />
          <Utility
            icon={<Feather name="more-horizontal" size={24} color="blue" />}
            name={'More'}
          />
        </ScrollView>

        <ScrollView>
          <View style={{ marginBottom: 500 }}>
            <View
              style={{
                borderWidth: 0.5,
                padding: 5,
                borderRadius: 10,
                borderColor: '#a63932',
                marginVertical: 10,
                gap: 30,
                backgroundColor: '#fff',

                ...Platform.select({
                  ios: {
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.9,
                    shadowRadius: 2,
                  },
                  android: {
                    elevation: 5,
                  },
                }),
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <CheckInOutComp name={'CHECK - IN'} date={'Fri, 25 Oct'} />
                <CheckInOutComp name={'CHECK - out'} date={'Sat, 26 Oct'} />
              </View>

              <View>
                <RoomsNGuest
                  name={'Rooms and Guests'}
                  roomNo={'1'}
                  childrenNo={'0'}
                  peopleNo={'1'}
                />
              </View>
            </View>

            <View style={{ paddingVertical: 10 }}>
              <PricePerNight
                number={1}
                start={'25 Oct'}
                end={'26 Oct'}
                price={'us$100'}
              />
            </View>
            <View>
              <View style={{ marginVertical: 10 }}>
                <BoldText13 text={'Need more info to decide?'} />
              </View>
              <TextCaps
                text={
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium ante ipsum,  scelerisque enim pretium quis.'
                }
              />

              <MoreComp
                onPress={() => {
                  Linking.openURL('tel:08120190530');
                }}
                icon={<Feather name="phone-call" size={24} color="black" />}
                name={'contact customer care'}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <BoldText13 text={'Description'} />
            </View>
            <TextCaps
              text={
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pretium ante ipsum, sed scelerisque enim pretium quis. Ut tempus augue sodales dolor maximus consequat a in mi. Quisque ullamcorper aliquam commodo. In tristique sapien lorem, nec imperdiet ligula imperdiet at. Duis ut pharetra est, at finibus turpis.'
              }
            />
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 430,
            width: '100%',
            // height: '100%',
          }}
        >
          <CustomBotton
            button={'Book room'}
            onPress={() => router.push('/CardPayment')}
          />
          {/* <BottomSheet ref={sheetRef} snapPoints={snapPoints}>
            <BottomSheetView>
              <Text>Hello </Text>
            </BottomSheetView>
          </BottomSheet> */}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
