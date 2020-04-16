import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';
import COLOR from '../../../assets/colors';
import RoundButton from '../common/RoundButton';
import calcBestPrice from '../../utilities/calcBestPrice';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import Img from '../common/Img';

import Popup from '../common/Popup';
import DetailedRecipe from '../shopping-list/DetailedRecipe';

export default ({recipe, onPress, isLoading, setQuantity, removeItem}) => {
    const [popupVisible, setPopupVisible] = useState(false);

    useEffect(() => {}, [recipe]);

    const RenderBottom = () => {
        return (
            <View style={styles.bottom}>
                {renderRating()}
                <Text style={styles.time}>{recipe.cookingTime}</Text>
                <Text style={styles.timeText}>min</Text>
            </View>
        );
    };
    function renderRating() {
        let rating = [];
        for (let i = 0; i < 5; i++) {
            rating.push(
                <View
                    style={{
                        height: 15,
                        width: 15,
                        borderRadius: 50,
                        backgroundColor:
                            recipe.averageRating > i
                                ? COLOR.PRIMARY
                                : COLOR.GRAY_4,
                    }}
                />,
            );
        }
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '50%',
                }}>
                {rating}
            </View>
        );
    }
    return (
        <View style={styles.skeletonContent}>
            {recipe && (
                <>
                    <TouchableOpacity
                        style={{maxHeight: 170}}
                        onPress={() => setPopupVisible(true)}>
                        <View>
                            <Img
                                style={styles.image}
                                isPromotion={true}
                                promotionText={'2 för'}
                                promotionValue={30}
                                resizeMode="contain"
                                source={recipe.imageUrl.replace(
                                    '//',
                                    'https://',
                                )}
                            />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.text}>{recipe.heading}</Text>
                    <RenderBottom />
                    <Popup
                        isVisible={popupVisible}
                        close={() => {
                            setPopupVisible(false);
                        }}>
                        <DetailedRecipe recipe={recipe} />
                    </Popup>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    skeletonContent: {
        flex: 1 / 2,
        backgroundColor: COLOR.WHITE,
        padding: 5,
        margin: 5,
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: 170,
        height: 170,
        alignSelf: 'center',
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    bottom: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 5,
        paddingRight: 5,
    },

    time: {
        color: COLOR.PRIMARY,
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginLeft: '15%',
        textAlign: 'center',
    },
    timeText: {
        fontFamily: 'Montserrat-regular',
        fontSize: 12,
        alignSelf: 'center',
        marginLeft: 3,
        alignSelf: 'flex-end',
        marginBottom: 3,
    },
});
