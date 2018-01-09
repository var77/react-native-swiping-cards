# React Native Swiping Cards

![React Native Swiping Cards](https://github.com/var77/react-native-swiping-cards/blob/master/screenshots/demo.gif)


## Installation
`npm install --save react-native-swiping-cards` or using yarn `yarn add react-native-swiping-cards` 

## Simple Usage

```javascript
class App extends Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                 <Card
                      onSwipeRight={() => true}
                      onSwipeLeft={() => true}
                      onSwipeCenter={() => true}
                      onRelease={() => true}
                      onRightAnimationEnd={() => true}
                      onLeftAnimationEnd={() => true}
                      onCenterAnimationEnd={() => true}
                      onReleaseAnimationEnd={() => true}
                 >
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <Image source={{uri: "https://source.unsplash.com/random"}} />
                    </View>
                 </Card> 
            </View>
        );
    }
}
```

> See [example app](https://github.com/var77/react-native-swiping-cards/blob/master/example) for more complex example.

### Props

> If no callback or animation end function is passed, the event won't be triggered and card will return to it's position

| Name | Type | Description |
|---|---|---|
| onSwipeRight | `function(){}` | called immediately as right swipe event is done |
| onRightAnimationEnd | `function(){}` | called when animation of right swipe event is finished |
| onSwipeLeft | `function(){}` | called immediately as left swipe event is done |
| onLeftAnimationEnd | `function(){}` | called when animation of left swipe event is finished |
| onSwipeCenter | `function(){}` | called immediately as center swipe event is done |
| onCenterAnimationEnd | `function(){}` | called when animation of center swipe event is finished |
| onRelease | `function(){}` | called if swipe length is less and none of the events above was called |
| onReleaseAnimationEnd | `function(){}` | called when animation of release event is finished |
| swipeLength | `Number` | length of the swipe to trigger events, default: device width / 5 |

