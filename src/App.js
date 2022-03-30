import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, ImageBackground } from 'react-native';


function App ()  {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getCars = async () => {
     try {
      const response = await fetch('http://localhost:8080/products');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCars();
  }, []);

  return (

    <View style={{ padding: 30 }}>
    <h2>Here's the data in tabular form we get from spring boot api :</h2>
    <table  height="250" border="0" cellpadding="0" cellspacing="15" >
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text><tr><td> {item.id}</td><td>{item.name}</td><td>{item.discription}</td></tr></Text>
          )}
        />
      )}
      </table>
    </View>
  );
};
export default App;
