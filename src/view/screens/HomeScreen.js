import React, { useContext } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {ScrollView, TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import plants from '../../consts/plants';
import { AuthContext } from '../../Context';
const width = Dimensions.get('window').width / 2 - 30;

const HomeScreen = ({navigation}) => {
  const [catergoryIndex, setCategoryIndex] = React.useState(1);
  const [filteredvalue,setFilteredValue] = React.useState(1)

  const {cartCount, setCartCount} = useContext(AuthContext)


  const filteredItems = filteredvalue === 1 ? plants :
  plants.filter(item=>item.ids ===filteredvalue)

  const categories = [{id:1,cat:'NEW'}, {id:2,cat:'CLOTHING'}, {id:3,cat:'ACCESSORIES'},{id:4,cat:'SHOES'},{id:5,cat:'WATCHES'},{id:6,cat:'BAGS'},{id:7,cat:'PHONES&TABLETS'},{id:8,cat:'LAPTOPS'}];

  const CategoryList = () => {
    // const renderOItems =({item})=>{
    //   return(
    //     <TouchableOpacity key={item.id}>
    //     <Text>{item.cat}</Text>
    //   </TouchableOpacity>
    //   )
    // }

    return (
      
      <View style={style.categoryContainer}>
        <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={item=>item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() => {
              setCategoryIndex(item.id)
              setFilteredValue(item.id)
            }}>
            <Text
              style={[
                style.categoryText,
                catergoryIndex === item.id && style.categoryTextSelected,
              ]}>
              {item.cat}
            </Text>
          </TouchableOpacity>
          )
        }}
        />
        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => {
              setCategoryIndex(index)
              setFilteredValue(index)
            }}>
            <Text
              style={[
                style.categoryText,
                catergoryIndex === index && style.categoryTextSelected,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
        </ScrollView> */}
      </View>
    );
  };

  const Card = ({plant}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Details', plant)}>
        <View style={style.card}>
          <View style={{alignItems: 'flex-end'}}>
            {/* <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: plant.like
                  ? 'rgba(245, 42, 42,0.2)'
                  : 'rgba(0,0,0,0.2) ',
              }}>
              <Icon
                name="favorite"
                size={18}
                color={plant.like ? COLORS.red : COLORS.black}
              />
            </View> */}
          </View>

          <View
            style={{
              height: 100,
              alignItems: 'center',
            }}>
            <Image
              source={plant.img}
              style={{flex: 1, resizeMode: 'contain'}}
            />
          </View>

          <Text numberOfLines={3} style={{fontWeight: 'bold', fontSize: 17, marginTop: 10}}>
            {plant.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={{fontSize: 19, fontWeight: 'bold'}}>
              ${plant.price}
            </Text>
            <View
              style={{
                height: 25,
                width: 25,
                backgroundColor: COLORS.green,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{fontSize: 22, color: COLORS.white, fontWeight: 'bold'}}>
                +
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <View>
          <Text style={{fontSize: 25, fontWeight: 'bold',marginTop:10}}>EcommUI</Text>
          {/* <Text style={{fontSize: 38, color: COLORS.green, fontWeight: 'bold'}}>
            Plant Shop
          </Text> */}
        </View>

          <TouchableOpacity
            onPress={()=>navigation.navigate('Cart')}
          >
              <Icon name="shopping-cart" size={28} style={{marginRight:8,marginTop:10}} />
              <Text style={{position:'absolute',backgroundColor:'red',color:'white',alignContent:'center',justifyContent:'center',borderRadius:10,width:20,height:20,textAlign:'center',fontSize:11,alignSelf:'flex-end'}}>{cartCount}</Text>
          </TouchableOpacity>
      </View>
      <View style={{marginTop: 30, flexDirection: 'row'}}>
        <View style={style.searchContainer}>
          <Icon name="search" size={25} style={{marginLeft: 20}} />
          <TextInput placeholder="Search" style={style.input} />
        </View>
        <View style={style.sortBtn}>
          <Icon name="filter-list-alt" size={30} color={COLORS.white} />
        </View>
      </View>
      <CategoryList />
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={filteredItems}
        renderItem={({item}) => {
          return <Card plant={item} />;
        }}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  categoryText: {fontSize: 16, color: 'grey', fontWeight: 'bold',marginRight:3,marginLeft:3},
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 3,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
  card: {
    height: 225,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  header: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeScreen;
