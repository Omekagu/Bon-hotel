// import { View, SafeAreaView, ScrollView } from 'react-native';
// import React from 'react';
// import SearchBox from '@/component/SearchBox';
// import SearchHeader from '@/component/SearchHeader';

// export default function SearchPage() {
//   return (
//     <SafeAreaView>
//       <View>
//         <SearchHeader
//           location={'lagos, Nigeria'}
//           date={'Sat, 26 Oct - Sun, 27 Oct'}
//         />
//       </View>
//       <ScrollView style={{ margin: 10 }}>
//         <SearchBox
//           hotelname={'Bon Lekki residence'}
//           image={'https://i.postimg.cc/QtffXzX9/BON-HOTEL-TRANSTELL-ROOMS6.jpg'}
//           rate={'good'}
//           rating={5}
//           review={2}
//           landmark={'beach sideasate'}
//           distantFromLandmark={'230km away'}
//           noBed={1}
//           price={100}
//         />
//         <SearchBox
//           hotelname={'Bon Ikeja residence'}
//           image={'https://i.postimg.cc/9MHhdrTt/BON-HOTEL-TRANSTELL-ROOMS7.jpg'}
//           rate={'very good'}
//           rating={8}
//           review={5}
//           landmark={'maleek estate'}
//           distantFromLandmark={'1,030km away'}
//           noBed={2}
//           price={300}
//         />
//         <SearchBox
//           hotelname={'Bon Asokoro residence'}
//           image={'https://i.postimg.cc/7L0vZwcC/BON-HOTEL-TRANSTELL-ROOMS1.jpg'}
//           rate={'Excellent'}
//           rating={10}
//           review={10}
//           landmark={'aso villa manor'}
//           distantFromLandmark={'230km away'}
//           noBed={1}
//           price={900}
//         />
//         <SearchBox
//           hotelname={'Bon kubwa residence'}
//           image={
//             'https://i.postimg.cc/BQXVvJPq/BON-HOTEL-TRANSTELL-ROOMS11.jpg'
//           }
//           rate={'good'}
//           rating={5}
//           review={2}
//           landmark={'sinete roundabout'}
//           distantFromLandmark={'30km away'}
//           noBed={1}
//           price={90}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }


import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios";
import SuggestionBox from "@/component/SuggestionBox";
import Toast from "react-native-toast-message";
import * as Animatable from "react-native-animatable";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import SearchBox from "@/component/SearchBox";

const SkeletonLoader = () => (
  <View style={styles.skeletonContainer}>
    <View style={styles.skeletonBox} />
    <View style={styles.skeletonBox} />
    <View style={styles.skeletonBox} />
    <View style={styles.skeletonBox} />
    <View style={styles.skeletonBox} />
    <View style={styles.skeletonBox} />
  </View>
);

const SearchPage = ( {item}) => {
  const [hotelName, setHotelName] = useState("");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchHotelsByName = async () => {
    Toast.hide();
    if (!hotelName.trim()) {
      Toast.show({ type: "error", position: "top", text1: "Hotel name cannot be empty." });
      return;
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(hotelName)) {
      Toast.show({ type: "error", position: "top", text1: "Invalid hotel name. Use only letters and numbers." });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`http://10.0.1.24:5001/hotels/search/${encodeURIComponent(hotelName)}`);
      setHotels(response.data.length ? response.data : []);
      if (!response.data.length) {
        Toast.show({ type: "error", position: "top", text1: "No hotels found matching the given name." });
      }
    } catch (error) {
      Toast.show({ type: "error", position: "top", text1: "Error searching for hotels. Please try again." });
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Animatable.View animation="fadeInUp" style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search hotels..."
          placeholderTextColor="#888"
          value={hotelName}
          onChangeText={setHotelName}
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchHotelsByName}>
          {loading ? <ActivityIndicator color="#fff" /> : <Feather name="search" size={24} color="#fff" />}
        </TouchableOpacity>
      </View>
      <View style={styles.flatList}>
      {loading ? <SkeletonLoader /> : (
        <FlatList
          data={hotels}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Animatable.View animation="fadeInUp" duration={800}>
               <SearchBox
                onPress={() => {
                  router.push({
                    pathname: "/SearchPageInfo",
                    params: { id: item._id },
                  });
                }}
                image={item.images[0] || "https://i.postimg.cc/5ttJxCXK/YTW-DELUXE-6.jpg"}
                hotelname={item.name}
                rating={item.rating}
                review={item.reviews}
                price={(item.pricePerNight ? Number(item.pricePerNight).toLocaleString() : "100,000,000")}
                // location={item.location || "N/A"}
                noBed={'29'}
                landmark={'sinete roundabout'}
                distantFromLandmark={'30km away'}
        />
            </Animatable.View>
          )}
        />
      )}
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    margin: 5,
    marginTop:50,
    borderTopRightRadius:10,
    borderTopLeftRadius:10
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  flatList:{
    marginBottom:170,
    marginHorizontal:10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  searchButton: {
    backgroundColor: "#a63932",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  skeletonContainer: {
    padding: 10,
  },
  skeletonBox: {
    height: 200,
    backgroundColor: "#ddd",
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default SearchPage;
