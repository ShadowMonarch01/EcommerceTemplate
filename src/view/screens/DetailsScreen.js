import React, { useContext } from 'react';
import {View, SafeAreaView, Image, Text, StyleSheet,TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import { AuthContext } from '../../Context';

const DetailsScreen = ({navigation, route}) => {
  const plant = route.params;

  const {cartCount, setCartCount,cost,setCost,cartData, setCartData} = useContext(AuthContext)

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View style={style.header}>
          <Icon name="arrow-back" size={28} onPress={() => navigation.navigate('Home')} />

         <TouchableOpacity
            onPress={()=>navigation.navigate('Cart')}
          >
              <Icon name="shopping-cart" size={28} style={{marginRight:8,marginTop:10}} />
              <Text style={{position:'absolute',backgroundColor:'red',color:'white',alignContent:'center',justifyContent:'center',borderRadius:10,width:20,height:20,textAlign:'center',fontSize:11,alignSelf:'flex-end'}}>{cartCount}</Text>
          </TouchableOpacity>
      </View>
      <View style={style.imageContainer}>
        <Image source={plant.img} style={{resizeMode: 'contain', flex: 1}} />
      </View>

      
      <View style={style.detailsContainer}>

      <ScrollView>


        <View
          style={{
            marginLeft: 20,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          {/* <View style={style.line} /> */}
          {/* <Text style={{fontSize: 18, fontWeight: 'bold'}}>Best choice</Text> */}
        </View>

        <View style={style.priceTag}>
            <Text
              style={{
                marginLeft: 15,
                color: COLORS.white,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              ${plant.price}
            </Text>
          </View>


        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>{plant.name}</Text>
          {/* <View style={style.priceTag}>
            <Text
              style={{
                marginLeft: 15,
                color: COLORS.white,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              ${plant.price}
            </Text>
          </View> */}
        </View>
        <View style={{paddingHorizontal: 20, marginTop: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>About</Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 16,
              lineHeight: 22,
              marginTop: 10,
            }}>
            {plant.about}
          </Text>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>


              <TouchableOpacity style={style.borderBtn}
                onPress={()=>{
                  if(cartCount > 0 && plant.goodsCount > 0){
                  setCartCount(cartCount - 1)
                  setCost(Math.round((cost - plant.price) * 100 + Number.EPSILON)/100)

                  let Ar2 = cartData

                  const index = Ar2.findIndex(ind=>ind.id===plant.id)

                  Ar2[index].goodsCount = Ar2[index].goodsCount - 1
                  setCartData(Ar2)
                  }
                  
                }}
              >
                <Text style={style.borderBtnText}>-</Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                }}>
                {plant.goodsCount}
              </Text>
              <TouchableOpacity style={style.borderBtn}
                onPress={()=>{
                  setCartCount(cartCount + 1)
                  setCost(Math.round((cost + plant.price) * 100)/100)

                  let Ar2 = cartData

                  const index = Ar2.findIndex(ind=>ind.id===plant.id)

                  Ar2[index].goodsCount = Ar2[index].goodsCount + 1
                  setCartData(Ar2)
                }}
              >
                <Text style={style.borderBtnText}><Text>+</Text></Text>
              </TouchableOpacity>
            </View>



            <TouchableOpacity style={style.buyBtn}
              onPress={()=>navigation.navigate('Cart')}
            >
              <Text
                style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>
                Buy
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 0.45,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 0.55,
    backgroundColor: COLORS.light,
    marginHorizontal: 7,
    // marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 30,
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: COLORS.dark,
    marginBottom: 5,
    marginRight: 3,
  },
  borderBtn: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 40,
  },
  borderBtnText: {fontWeight: 'bold', fontSize: 28},
  buyBtn: {
    width: 130,
    height: 50,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  priceTag: {
    backgroundColor: COLORS.green,
    width: 80,
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    alignSelf:'flex-end'
  },
});

export default DetailsScreen;
