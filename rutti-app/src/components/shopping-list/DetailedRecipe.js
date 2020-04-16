import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView,
} from 'react-native';

import COLOR from '../../../assets/colors';
import RoundButton from '../common/RoundButton';
import FadeInView from '../animations/FadeInView';
import Button from '../common/Button';
import Img from '../common/Img';
import CollapsibleView from '../CollapsibleView';
import getRecipeDetails from '../../api/getRecipeDetails';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {Dimensions} from 'react-native';

const DEVICE = Dimensions.get('window');

export default ({recipe}) => {
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [portions, setPortions] = useState(4);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        getRecipeDetails({recipeUrl: recipe.url, portions})
            .then(result => {
                setRecipeDetails(result);
                setIsLoading(false);
            })
            .catch(error => {
                Alert.alert('Något gick fel!', error.toString());
            });
    }, [recipe, portions]);

    function renderTop() {
        return (
            recipe && (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                    <Img
                        style={styles.image}
                        source={recipe.imageUrl.replace('//', 'https://')}
                    />
                </View>
            )
        );
    }
    function renderHeaderDetails() {
        return (
            <View style={{margin: 5}}>
                <Text style={styles.text}>{recipe.heading}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        margin: 5,
                    }}>
                    {renderRating()}

                    <Text style={styles.time}>{recipe.cookingTime}</Text>
                    <Text style={styles.timeText}>min</Text>
                </View>
            </View>
        );
    }

    function renderRating() {
        let rating = [];
        for (let i = 0; i < 5; i++) {
            rating.push(
                <View
                    style={{
                        height: 20,
                        width: 20,
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
                    width: 130,
                }}>
                {rating}
            </View>
        );
    }

    function renderIngredientGroups() {
        let ingredientGroups = [];
        recipeDetails?.ingredients.map(ingredientGroup => {
            ingredientGroups.push(
                <View>
                    <Text style={{fontFamily: 'Montserrat-Bold'}}>
                        {ingredientGroup.groupName}
                    </Text>
                    {renderIngredients(ingredientGroup)}
                </View>,
            );
        });
        return (
            <CollapsibleView title={'Ingredienser'}>
                {ingredientGroups}
            </CollapsibleView>
        );
    }

    function renderIngredients(ingredientGroup) {
        let ingredients = [];
        {
            ingredientGroup.ingredients.map(ingredient => {
                ingredients.push(
                    <Text style={{fontFamily: 'MontSerrat-Regular'}}>
                        {ingredient.formattedString}
                    </Text>,
                );
            });
        }
        return ingredients;
    }

    function renderInstructions() {
        let instructions = [];

        recipeDetails.instructions.map((instruction, index) => {
            instructions.push(
                <View>
                    <Text
                        style={{
                            fontFamily: 'Montserrat-Regular',
                            borderWidth: 1,
                            borderColor: 'transparent',
                            marginBottom: 5,
                        }}>
                        {instruction}
                    </Text>
                </View>,
            );
        });

        return (
            <CollapsibleView
                style={{backgroundColor: COLOR.WHITE, borderRadius: 20}}
                title={'Instruktioner'}>
                {instructions}
            </CollapsibleView>
        );
    }
    return (
        <View style={styles.container}>
            <FadeInView>
                <ScrollView>
                    {renderTop()}

                    <SkeletonContent
                        containerStyle={{
                            flex: 1,
                        }}
                        isLoading={isLoading}
                        layout={[
                            {
                                key: 'title',
                                width: 250,
                                height: 20,
                                marginBottom: 6,
                                marginTop: 10,
                            },
                            {
                                key: 'rating',
                                width: 150,
                                height: 20,
                                marginBottom: 6,
                                marginTop: 10,
                            },
                            {
                                key: 'ingredients',
                                width: 300,
                                height: 20,
                                marginBottom: 6,
                                marginTop: 30,
                            },
                            {
                                key: 'instructions',
                                width: 300,
                                height: 20,
                                marginBottom: 6,
                                marginTop: 50,
                            },
                        ]}>
                        <FadeInView>
                            {renderHeaderDetails()}
                            {recipeDetails && renderIngredientGroups()}
                            {recipeDetails && renderInstructions()}
                        </FadeInView>
                    </SkeletonContent>
                </ScrollView>
            </FadeInView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        backgroundColor: COLOR.WHITE,
        padding: 10,
        margin: 5,
        flexDirection: 'column',
        alignSelf: 'center',
    },
    image: {
        width: DEVICE.width / 1.5,
        height: DEVICE.width / 1.5,
        alignSelf: 'center',
        borderRadius: 20,
    },
    text: {
        fontSize: 20,
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold',
        color: 'black',
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
        marginBottom: 3,
    },
});
