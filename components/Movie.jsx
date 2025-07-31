import React, { Component } from "react";
import { 
  Image, 
  FlatList, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

const REQUEST_URL =
  "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

const getImageUrl = (movieId) => {
  return `https://lh6.googleusercontent.com/-55osAWw3x0Q/URquUtcFr5I/AAAAAAAAAbs/rWlj1RUKrYI/s1024/A%252520Photographer.jpg`;
};

export default class SampleAppMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      searchText: "",
      filteredData: [],
      imageLoading: true,
      imageError: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(REQUEST_URL);
      const responseData = await response.json();
      this.setState({
        data: responseData.movies,
        loaded: true,
        filteredData: responseData.movies
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleSearch = (text) => {
    const filteredData = this.state.data.filter(item => {
      return item.title.toLowerCase().includes(text.toLowerCase()) ||
             item.year.toString().includes(text);
    });
    this.setState({ searchText: text, filteredData });
  };
/**
 * onLoadEnd={() => this.setState({ imageLoading: false })}: 当图片加载完成时，调用此回调函数，将 imageLoading 状态设置为 false，表示图片已加载完成。
 * onError={() => this.setState({ imageError: true })}: 当图片加载出错时，调用此回调函数，将 imageError 状态设置为 true，表示图片加载失败。
 * {this.state.imageLoading && (<ActivityIndicator style={styles.loadingIndicator} />)}是一个条件渲染，当 imageLoading 状态为 true 时，显示加载指示器。
 * <ActivityIndicator>: 显示一个加载动画，表示图片正在加载中。
 * style={styles.loadingIndicator}: 应用了 styles.loadingIndicator 样式，定义了加载指示器的位置和布局。
 * {this.state.imageError && (<Text style={styles.errorText}>!</Text>)}是一个条件渲染，当 imageError 状态为 true 时，显示错误提示。
 * <Text>: 显示一个文本，内容为 !，表示图片加载失败。
 * style={styles.errorText}: 应用了 styles.errorText 样式，定义了错误提示的位置和样式，例如颜色和字体粗细。
 */
  renderMovie = ({ item }) => {
    // React hooks只能在函数组件或自定义 hooks 中使用
    // const [imageLoading, setImageLoading] = React.useState(true);
    // const [imageError, setImageError] = React.useState(false);

    return (
      <TouchableOpacity
      style={styles.movieContainer}
      onPress={() => this.props.navigation.navigate('MovieMessage',{movie: item})}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: getImageUrl(item.id) }}
            style={styles.thumbnail}
            onLoadEnd={() => this.setState({ imageLoading : false})} // 加载
            onError={() => this.setState({ imageError : true})} // 加载失败会报错
          />
          {this.state.imageLoading &&(
            <ActivityIndicator style = {styles.loadingIndicator} />
          )}
          {this.state.imageError && (
            <Text style = {styles.errorText}>!</Text>
          )}
        </View>
        
        <View style={styles.rightContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.titleScroll}
          >
            <Text style={styles.title}>{item.title}</Text>
          </ScrollView>
          <Text style={styles.year}>{item.year}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    if (!this.state.loaded) {
      return (
        <View style={styles.screenContainer}>
          <Text>Loading movies...</Text>
        </View>
      );
    }

    return (
      <View style={styles.screenContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          onChangeText={this.handleSearch}
          value={this.state.searchText}
        />
        <FlatList
          data={this.state.filteredData}
          renderItem={this.renderMovie}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  movieContainer: {
    flexDirection: "row",
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#FFF",
    borderRadius: 8,
    elevation: 2,
    marginHorizontal: 10
  },
  imageContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbnail: {
    width: 53,
    height: 81,
    borderRadius: 4
  },
  loadingIndicator: {
    position: 'absolute'
  },
  errorText: {
    position: 'absolute', // 绝对定位允许加载指示器在父容器内的任意位置显示
    color: 'red',
    fontWeight: 'bold'
  },
  rightContainer: { 
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center'
  },
  titleScroll: {
    paddingRight: 100
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500'
  },
  year: {
    color: 'black',
    fontSize: 14,
    marginTop: 4
  },
  searchInput: {
    height: 40,
    margin: 10,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 16
  },
  listContent: {
    paddingBottom: 20
  }
});