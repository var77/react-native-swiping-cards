import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';

import Items from './cards.json';

import styles from './styles';
import Card from 'react-native-swiping-cards';

import likeImage from './img/like.png';
import dislikeImage from './img/dislike.png';
import doneImage from './img/done.png';


const { width } = Dimensions.get('window');


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            shownCards: Items.slice(0, 4).reverse(),
            opacity: new Animated.Value(0),
            like: false
        };
    }

    animateOpacity() {
        Animated.sequence([
            Animated.spring(this.state.opacity, {toValue: 1}),
            Animated.spring(this.state.opacity, {toValue: 0})
        ]).start();
    }

    sleep(delay) {
        return new Promise(r => setTimeout(r, delay));
    }

    async handleRelease(state) {
        await this.sleep(350);

        this.setState({
            index: this.state.index + 1,
            shownCards:Items.slice(this.state.index + 1, this.state.index + 5).reverse(),
            like: state
        });

        this.animateOpacity();
    }

    render() {
        return (
            <View style={[styles.flex, styles.flexCenter, styles.paddingStatusBar]}>
              <View style={[styles.flex, styles.flexCenter]}>
                  {this.state.shownCards.map((card) => {
                      return (
                          <Card
                              key={card.title}
                              onSwipeRight={this.handleRelease.bind(this, 1)}
                              onSwipeLeft={this.handleRelease.bind(this, 0)}
                              onSwipeCenter={this.handleRelease.bind(this, -1)}
                              onRelease={() => true}
                              onRightAnimationEnd={() => true}
                              onLeftAnimationEnd={() => true}
                              onCenterAnimationEnd={() => true}
                              onReleaseAnimationEnd={() => true}
                              swipeLength={width / 5}
                          >
                            <View style={[styles.flex, styles.flexCenter]}>
                              <Animated.Image source={{uri: card.image}} style={styles.card} />
                              <Text style={styles.title}> {card.title} </Text>
                            </View>
                          </Card>
                      )
                  })}
              </View>

              <View style={[{flex: .3}, styles.flexCenter, styles.flexRow]}>
                <TouchableOpacity style={[styles.button]}>
                  <View style={[styles.flex, styles.flexCenter]}>
                    <Image source={dislikeImage} style={styles.buttonIcon}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button]}>
                  <View style={[styles.flex, styles.flexCenter]}>
                    <Image source={doneImage} style={styles.buttonIcon}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button]}>
                  <View style={[styles.flex, styles.flexCenter]}>
                    <Image source={likeImage} style={styles.buttonIcon}/>
                  </View>
                </TouchableOpacity>
              </View>

              <Animated.Image source={this.state.like === 1? likeImage : this.state.like === -1? doneImage : dislikeImage} style={[styles.reactImage, {opacity: this.state.opacity}]}/>
            </View>
        );
    }
}