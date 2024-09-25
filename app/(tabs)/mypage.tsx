import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { Button, Layout, Text, Icon, useTheme, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { Pathname } from "react-router-dom";

type DataItem = {
  id: any;
  index: string;
  name: string;
  web_pages: string[];
};

const theme = useTheme();

const ListFetching: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);

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
      return result;
    } catch (error) {
      console.error("There was an error fetching the data.", error);
    } finally {
      setLoading(false);
    }
  };

  const BackIcon = (props): IconElement => (
    <Icon
      {...props}
      name='arrow-back'
    />
  );
  
  const BackAction = (): React.ReactElement => (
    <TopNavigationAction icon={BackIcon} />
  );

  const handleData = async () => {
    const data = await fetchData();
    setData(data);
  };

  const Loading = () => {
    return (
      loading && (
        <ThemedText darkColor="true">
          {" "}
          <Text style={styles.text}>Loading...</Text>
        </ThemedText>
      )
    );
  };
  const FacebookIcon = (props: any) => <Icon name="browser" {...props} />;
  const renderItem = ({ item, index }: { item: DataItem; index: number }) => {
    return (
      <View key={index}>
        <Text style={styles.text}>{item.name}</Text>
        {}
        {item.web_pages.map((webPage, web_pageIndex) => (
          <>
            <Link
              push  
              href={{
                pathname: "/data-details",
                params: { index },
              }}
            >
              <Button accessoryLeft={FacebookIcon}>
                Click for more details
              </Button>
            </Link>
            <Link push href={{ pathname: webPage }}>
              <Text style={styles.text} key={web_pageIndex}>{webPage}</Text>
            </Link>
          </>
        ))}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      marginHorizontal: 8,
      color: "black",
    },
  });

  return (<>
    <TopNavigation
    accessoryLeft={BackAction}
    title='Eva Application'
  />
    <ScrollView>
      <ThemedText darkColor="true" type="default">
        Weather Forecast
      </ThemedText>
      <Button
        accessoryLeft={FacebookIcon}
        onPress={handleData}
        disabled={loading}
      >
        Fetch Data
      </Button>
      <Loading />
      <FlatList data={data} renderItem={renderItem} />
      <Layout style={styles.container} level="1">
        <Button onPress={() => setCounter(counter + 1)}>BUTTON</Button>

        <Text style={styles.text}>{`Pressed ${counter} times`}</Text>
      </Layout>
    </ScrollView>
    </>
  );
};

export default ListFetching;
