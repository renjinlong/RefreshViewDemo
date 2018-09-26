# RefreshViewDemo
下拉刷新，上拉加载，ScrollView ListView FlatList VirtualizedList

Usage

here is a simple usage of this lib, see example folder and find app.js for full usage

Note: when use react-native-ptr-control, use it as usual, for example, if scrollComponent is 'ScrollView', pass ScrollView`s props and props of lib provide, such as:

ScrollView
  import React, {Component} from 'react'
  import {View, Text} from 'react-native'
  import PullScrollView from './lib/PullScrollView'
export default class MyScrollComponent extends Component {
  render() {
    return (
      <PullScrollView
        //here is the origin props of ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        //here is the props of lib provide
        scrollComponent={'ScrollView'}
        enableFooterInfinite={false} >
        <View>
          <Text>{'scroll content'}</Text>
        </View>
      </PullScrollView>
    )
  }
}
FlatList
  import React, {Component} from 'react'
  import {View, Text} from 'react-native'
  import PullScrollView from './lib/PullScrollView'
  export default class MyScrollComponent extends Component {
    render () {
      return (
        <PullScrollView
         renderItem={this.renderRow}
          data={this.state.dataSource}
          showsVerticalScrollIndicator={false}
          scrollComponent={'FlatList'}
          getRef={ref => this.refOfScrollList = ref}
          enableHeaderRefresh={true}
          onTopReachedThreshold={10}
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
          onEndReachedThreshold={10}
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
        )
    }
  }
Properties

onHeaderRefreshing and onFooterInfiniting

this props should be passed a function, and gestureStatus and offset will be the params, something like that

onHeaderRefreshing = {(gestureStatus, offset) => <HeaderRefresh gestureStatus={gestureStatus} offset={offset/>}

onFooterInfiniting = {(gestureStatus, offset) => <FooterInfinite gestureStatus={gestureStatus} offset={offset/>}

gestureStatus

0: gesture none
1: pull-up to load-more
2: pull-down to refresh
3: release to refresh or load-more
4: on header refreshing
5: on footer loading-more
offset

when pull-down to refresh or pull-up to load-more, this offset params represent the pull distance
static methods

Important: when header refresh done, or footer load-more done, should call this static method

headerRefreshDone PTRControl.headerRefreshDone()

after onHeaderRefreshing, when refresh done, and the data load complete, call this method to stop refresh

footerInfiniteDone PTRControl.footerInfiniteDone()

after onFooterInfiniting, when load-more done, and the data load complete, call this method to stop load-more

react-native-ptr-control