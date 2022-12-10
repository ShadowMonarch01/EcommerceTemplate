import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native'
import React,{useContext} from 'react'
import plants from '../../consts/plants';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../../Context';


const width = Dimensions.get('window').width

const CartScreen = ({navigation}) => {

  const {cartCount, setCartCount, cost,setCost,cartData, setCartData} = useContext(AuthContext)

  const renderItem = ({item})=>{

    return(
      <>
      {item.goodsCount >0 ? <View key={item.id} style={{backgroundColor:'#fbfbf9',margin:6}}>
        <View style={{width:width,flexDirection:'row'}}>
          <Image
                source={item.img}
                style={{resizeMode: 'contain',width:70,height:70}}
              />
          <View style={{flexDirection:'column',marginTop:10,width:100}}>
            <Text numberOfLines={1}>{item.name}</Text>

            <Text>{item.price}</Text>

            <Text>unit:{item.goodsCount}</Text>
          </View>

          <View style={{flexDirection:'row',marginTop:20,marginLeft:30,alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity 
              style={{backgroundColor:COLORS.green,width:50,paddingLeft:5,paddingRight:5,borderRadius:10,marginRight:5}}
              onPress={()=>{
                if(cartCount > 0 && item.goodsCount > 0){
                setCartCount(cartCount - 1)
                setCost(Math.round((cost - item.price) * 100 + Number.EPSILON)/100)

                let Ar2 = cartData

                const index = Ar2.findIndex(ind=>ind.id===item.id)

                Ar2[index].goodsCount = Ar2[index].goodsCount - 1
                setCartData(Ar2)
                }
                
              }}
            >
              <Text style={{textAlign:'center',fontSize:25}}>-</Text>
            </TouchableOpacity>

            <Text>{item.goodsCount}</Text>

            <TouchableOpacity 
              style={{backgroundColor:COLORS.green, width:50,paddingLeft:5,paddingRight:5,borderRadius:10,marginLeft:5}}

              onPress={()=>{
                setCartCount(cartCount + 1)
                setCost(Math.round((cost + item.price) * 100)/100)

                let Ar2 = cartData

                const index = Ar2.findIndex(ind=>ind.id===item.id)

                Ar2[index].goodsCount = Ar2[index].goodsCount + 1
                setCartData(Ar2)
              }}
              >
              <Text style={{textAlign:'center',fontSize:25}}>+</Text>
            </TouchableOpacity>
          </View>
        
        </View>

            

      </View>:null}
      </>
    )
  }


  return (
    <SafeAreaView style={styles.tt}>
      <View style={styles.header}>
          <Icon name="arrow-back" size={28} onPress={() => navigation.navigate('Home')} />

         
      </View>

      <FlatList
        style={{padding:5,flex:1}}
        data={cartData}
        keyExtractor={item=>item.id}
        renderItem={renderItem}

      />
      <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>{cost} $</Text>

      <TouchableOpacity style={{backgroundColor:COLORS.green,width:160,alignSelf:'center',padding:10,borderRadius:10,marginBottom:10,marginTop:10}}>
        <Text style={{fontSize:20,fontWeight:'bold',color:'white',textAlign:'center'}}>PURCHASE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default CartScreen

const styles = StyleSheet.create({
    tt:{
        flex:1,
        backgroundColor:'#FFFFFF'
        // alignItems:'center',
        // justifyContent:'center'
    },
    header: {
      paddingHorizontal: 20,
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
     
    },
})