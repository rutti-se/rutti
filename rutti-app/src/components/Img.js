import React, {useState, useEffect} from 'react';
import {View, Image, Text, Animated} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export default ({source, style, resizeMode}) => {
    let [loading, setLoading] = useState(true);
    const [fadeAnim] = useState(new Animated.Value(0));

    return (
        <>
            {loading && (
                <SkeletonContent isLoading={loading}>
                    <View style={style}></View>
                </SkeletonContent>
            )}

            <Animated.Image
                source={{uri: source}}
                onPartialLoad={() => setLoading(false)}
                onLoadEnd={() => {
                    setLoading(false);
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 1000,
                    }).start();
                }}
                resizeMode={resizeMode ? resizeMode : 'contain'}
                style={
                    loading
                        ? {height: 1, width: 1}
                        : {...style, opacity: fadeAnim}
                }
                onError={e => console.log('img error', e)}
            />
        </>
    );
};
