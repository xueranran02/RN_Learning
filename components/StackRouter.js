import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { Text, View, Button, StyleSheet } from "react-native";
import Movie from './Movie';
import * as Animatable from 'react-native-animatable'; // 引入动画库
import { useIsFocused } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  let fadeInView = React.useRef(null);
  const isFocused = useIsFocused(); // 获取当前屏幕是否获得焦点

  useEffect(() => {
    if (fadeInView.current) {
      fadeInView.current.fadeIn(3000); // 触发淡入动画
    }
  }, [isFocused]);
  return (
    <View style={styles.container}>
      {/* 使用 Animatable.View 来创建淡入效果 */}
      <Animatable.View
        ref={fadeInView} // 给这个 View 加上 ref
        style={styles.innerContainer}
      >
        <Text style={styles.headerText}>这是主屏幕</Text>
      </Animatable.View>

      <View style={styles.buttonContainer}>
        <Button
          title="Go to Movie Screen"
          onPress={() => navigation.navigate('List')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Detail Screen"
          onPress={() => navigation.navigate('Detail')}
        />
      </View>
    </View>
  );
}

function DetailScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detail Screen</Text>
    </View>
  );
}

function MovieMessage({ route }) {
  const { movie } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Title: {movie.title}</Text>
      <Text style={styles.text}>Year: {movie.year}</Text>
      <Text style={styles.text}>ID: {movie.id}</Text>
    </View>
  );
}

export default function StackRouter() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="List"
        component={Movie}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
      />
      <Stack.Screen
        name="MovieMessage"
        component={MovieMessage}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0', // 设置背景颜色，让界面更美观
  },
  innerContainer: {
    alignItems: 'center',
    marginBottom: 30, // 增加间距让按钮不挤在一起
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    color: 'black',
    fontSize: 18,
  },
  buttonContainer: {
    marginVertical: 20,
    width: '80%', // 限制按钮的宽度，避免过宽
  },
});
