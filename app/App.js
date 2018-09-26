import React, {
  Component, PureComponent
} from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native'

import PullScrollView from './lib/PullScrollView'

class FooterInfinite extends Component {
  static defaultProps = {
    gestureStatus: 1
  }

  constructor(props) {
    super(props)
  }

  render() {
    let { gestureStatus } = this.props, _refreshFont = ''
    switch (gestureStatus) {
      case 1:
        _refreshFont = 'pull-up-to-load-more'
        break;
      case 3:
        _refreshFont = 'release-to-load'
        break;
      case 5:
        _refreshFont = 'loading'
        break;
      default:
        _refreshFont = 'pull-up-to-load-more'
    }

    return (
      <View style={Styles.footerInfinite}>
        {gestureStatus === 5 ?
          <ActivityIndicator
            size={'small'}
            animating={true}
            color={'#75c5fe'}
            style={{ marginRight: 10 }} /> : null}
        <Text style={Styles.refreshFont}>{_refreshFont}</Text>
      </View>
    );
  }
}

class HeaderRefresh extends PureComponent {
  static defaultProps = {
    gestureStatus: 2,
    offset: 0
  }

  constructor(props) {
    super(props)
  }

  state = {
    arrowAngle: new Animated.Value(0)
  }

  render() {
    let { gestureStatus } = this.props, _refreshFont = ''
    switch (gestureStatus) {
      case 2:
        _refreshFont = 'pull-to-refresh'

        break;
      case 3:
        _refreshFont = 'release-to-refresh'

        break;
      case 4:
        _refreshFont = 'refreshing'
        break;
      default:
        _refreshFont = 'pull-to-refresh'
    }
    return (
      <View style={Styles.headerRefresh}>
        {gestureStatus === 4 ?
          <ActivityIndicator
            size={'small'}
            animating={true}
            color={'#75c5fe'}
            style={{ marginRight: 10 }} /> : null}
        <Text style={Styles.refreshFont}>{_refreshFont}</Text>
      </View>
    )
  }
}

class App extends Component {

  _timer = -1
  data = []

  constructor(props) {
    super(props)
    this.getData()
    this.state = {
      dataSource: this.data
    }
  }

  getData(init) {
    let total = 14
    if (init) {
      this.data = []
      total = Math.ceil(Math.random() * 17)
    }
    for (let i = 0; i < total; i++) {
      this.data.push({ 'row': 'row' + Math.ceil(Math.random() * total) })
    }
  }

  renderRow = ({ item }) => {

    return (
      <View
        style={Styles.flatListItem}>
        <Text style={Styles.fontItem}>{item.row}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={Styles.wrap}>
        <PullScrollView
          renderItem={this.renderRow}
          data={this.state.dataSource}
          showsVerticalScrollIndicator={false}

          scrollComponent={'FlatList'}
          getRef={ref => this.refOfScrollList = ref}

          enableHeaderRefresh={true}
          // setHeaderHeight={100}
          onTopReachedThreshold={10}
          // renderHeaderRefresh={
          //     (gestureStatus, offset) => <HeaderRefresh gestureStatus={gestureStatus} offset={offset} />
          // }
          onHeaderRefreshing={() => {
            clearTimeout(this._timer)
            this._timer = setTimeout(() => {
              this.getData(true)
              this.setState({
                dataSource: this.data
              }, () => {
                PullScrollView.headerRefreshDone();
              })
            }, 1000)
          }}

          pullFriction={0.68}

          enableFooterInfinite={true}
          // setFooterHeight={60}
          onEndReachedThreshold={10}
          // renderFooterInfinite={
          //     (gestureStatus, offset) => <FooterInfinite gestureStatus={gestureStatus} offset={offset} />
          // }
          onFooterInfiniting={() => {
            clearTimeout(this._timer)
            this._timer = setTimeout(() => {
              this.getData()
              this.setState({
                dataSource: this.data
              }, () => {
                PullScrollView.footerInfiniteDone()
              })
            }, 1000)
          }}
        />
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  wrap: {
    flex: 1,
    overflow: 'hidden'
  },
  headerRefresh: {
    width: Dimensions.get('window').width,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerInfinite: {
    width: Dimensions.get('window').width,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  refreshFont: {
    fontSize: 16,
    color: '#b84f35'
  },
  flatListItem: {
    width: Dimensions.get('window').width,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#feafea'
  },
  fontItem: {
    fontSize: 15,
  },
})

export default App