import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';
import axios from "axios";
import {CurrType, KeyExtractor, RenderItem} from "@root/screens/AddCurrency/types";

export const AddCurrency = () => {
  const [currList, setCurrList] = useState([]);
  const [dataToRender, setDataToRender] = useState([]);

  const findCurr = async () => {
    const data = await axios('http://www.nbrb.by/API/ExRates/Currencies');
    console.log('data', data.data);
    setCurrList(data.data);
    setDataToRender(data.data);
  };

  const keyExtractor: KeyExtractor = (item) => item.Cur_ID.toString();

  const renderItem: RenderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => console.log(item)}>
        <View style={{alignItems: 'center', paddingVertical: 5}}>
          <Text style={{}}>{item.Cur_Code} ({item.Cur_Abbreviation}) - {item.Cur_Name}</Text>
        </View>
      </TouchableOpacity>
    )
  };


  const filterList = (currName: string) => {
    if (currName) {
      const tmp = currList.filter((e: CurrType) => e.Cur_Name.toLowerCase().indexOf(currName.toLowerCase()) !== -1);
      setDataToRender(tmp);
    } else setDataToRender(currList);
  };

  return (
    <View style={{alignItems: 'center'}}>
      <View style={{alignItems: 'center', paddingVertical: 20}}>
        <Button title={'load all'} onPress={findCurr}/>
        <TextInput style={{height: 40, width: 300, borderWidth: 1, fontSize: 16}}
                   placeholder={'Filter'}
                   onChangeText={text => filterList(text)}/>
      </View>

      <FlatList data={dataToRender}
                keyExtractor={keyExtractor}
                renderItem={renderItem}/>
    </View>
  )
};

