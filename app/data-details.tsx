import { ThemedText } from "@/components/ThemedText";
import { useState, useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { useLocalSearchParams, useGlobalSearchParams, Link } from "expo-router";

type DataItem = {
  name: string;
  country: string;
  state_province: string;
  domains: string[];
  web_pages: string[];
};

const itemDetailDisplay: React.FC = () => {
  const [data, setData] = useState<DataItem>();
  const [loading, setLoading] = useState(false);
  let lIndex: any = useLocalSearchParams();
  console.log(lIndex, "lIndex");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://universities.hipolabs.com/search?country=Australia"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(lIndex.index, "index");
      const selectedItem = result[lIndex.index];
      console.log(selectedItem, "selectedItem");
      setData({
        name: selectedItem?.name,
        country: selectedItem?.country,
        state_province: selectedItem?.['state-province'],
        domains: selectedItem?.domains,
        web_pages: selectedItem?.web_pages,
      });
    } catch (error) {
      console.error("There was an error fetching the data.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      console.log("country: " + data?.country);
      console.log("university: " + data?.name);
      console.log("data: " + data);
    }
  }, [data]);

  const Loading = () => {
    return (
      loading && (
        <ThemedText darkColor="true">
          {" "}
          <Text>Loading...</Text>
        </ThemedText>
      )
    );
  };

  const renderItem = ({ item }: { item: string[] }) => {
    return (
      <>
        <Link push href={{ pathname: item }}>
          <Text key={item}>{item}</Text>
        </Link>
      </>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <ThemedText darkColor="true">Data Details Page</ThemedText>
      <Loading />
      <Text>{data?.name}</Text>
      <Text>{data?.country}</Text>
      <Text>{data?.state_province}</Text>
      <Text>{data?.domains[0]}</Text>
      <FlatList data={data?.web_pages} renderItem={renderItem} />
    </View>
  );
};

export default itemDetailDisplay;
