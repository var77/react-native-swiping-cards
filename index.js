import React, { Component } from 'react';
import { PanResponder, Animated, Dimensions } from 'react-native';

import cardStyles from './styles';

const { width, height } = Dimensions.get('window');

const DIRECTIONS = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    CENTER: 'CENTER'
};

const NULL_FN = () => null;

export default class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            x: 0,
            y: 0,
            angle: '0deg',
            opacity: new Animated.Value(1)
        };
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderMove: this.onMove.bind(this),
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: this.onRelease.bind(this)
        });
    }

    remove(direction) {
        let xVal = direction === DIRECTIONS.RIGHT? width : -width;
        let animations = [
            Animated.spring(this.state.x, {
                toValue: xVal
            }),
            Animated.spring(this.state.y, {
                toValue: height
            }),
            Animated.spring(this.state.angle, {
                toValue: 1
            }),
            Animated.spring(this.state.opacity, {
                toValue: 0
            })
        ];

        if (direction === DIRECTIONS.CENTER) {
            animations.shift();
        }

        let animationCb = this.props[`on${this.capitalizeFirstLetter(direction)}AnimationEnd`] || NULL_FN;
        let actionCb = this.props[`onSwipe${this.capitalizeFirstLetter(direction)}`] || NULL_FN;
        Animated.parallel(animations).start(() => animationCb());
        actionCb();
    }

    reset() {
        let animationCb = this.props.onReleaseAnimationEnd || NULL_FN;

        Animated.parallel([
            Animated.spring(this.state.x, {
                toValue: 0
            }),
            Animated.spring(this.state.y, {
                toValue: 0
            }),
            Animated.spring(this.state.angle, {
                toValue: 0
            })
        ]).start(() => animationCb());
    }

    getAngle(dx, dy) {
        return dx * -.3;
    }

    onMove(e, gestureState) {
        this.setState({
            x: gestureState.dx,
            y: gestureState.dy < 0 ? this.state.y : gestureState.dy * .3,
            angle: this.getAngle(gestureState.dx)
        });
    }

    onRelease(e, gestureState) {
        let { x, y, angle } = this.state,
            swipeLen = this.props.swipeLength || width / 5;

        this.setState({
            x: new Animated.Value(x),
            y: new Animated.Value(y),
            angle: new Animated.Value(angle / 360)
        }, () => {
            if (x > swipeLen) {
            //right
            let directionEnabled = this.props.onSwipeRight || this.props.onRightAnimationEnd;
            directionEnabled ? this.remove(DIRECTIONS.RIGHT) : this.reset();
        } else if (x < -swipeLen) {
            //left
            let directionEnabled = this.props.onSwipeLeft || this.props.onLeftAnimationEnd;
            directionEnabled ? this.remove(DIRECTIONS.LEFT) : this.reset();
        } else if (y > swipeLen) {
            //center
            let directionEnabled = this.props.onSwipeCenter || this.props.onCenterAnimationEnd;
            directionEnabled ? this.remove(DIRECTIONS.CENTER) : this.reset();
        } else {
            this.reset();
            this.props.onRelease && this.props.onRelease();
        }
    });

    }

    getRotationStyle() {
        if (typeof this.state.angle === 'object') {
            return this.state.angle.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
            });
        }

        return `${this.state.angle}deg`;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    render() {
        let style = {transform: [{translateX: this.state.x}, {translateY: this.state.y}, {rotate: this.getRotationStyle()}], opacity: this.state.opacity},
            { children } = this.props;
        return (
            <Animated.View {...this._panResponder.panHandlers} style={[cardStyles.card, style, {position: 'absolute', ...this.props.style}]} >
             { children }
            </Animated.View>
        );
    }
}