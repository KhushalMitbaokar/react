import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

function App () {
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
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.id}, {item.discription}, {item.name}</Text>
          )}
        />
      )}
    </View>
  );
};
export default App;
