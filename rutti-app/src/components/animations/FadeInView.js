import React, {useState, useEffect} from 'react';
import {Animated, Text, View} from 'react-native';

export default props => {
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: props.duration ? props.duration : 500,
            delay: props.index ? (props.index * props.duration) / 8 : 0,
        }).start();
    }, []);

    return (
        <Animated.View // Special animatable View
            style={{
                ...props.style,
                flex: 1,
                justifyContent: 'center',
                opacity: fadeAnim, // Bind opacity to animated value
            }}>
            {props.children}
        </Animated.View>
    );
};
