import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import SearchRecipeItem from './SearchRecipeItem';

export default ({recipes}) => {
    const [recipeDetails, setRecipeDetails] = useState(null);

    useEffect(() => {}, [recipes]);

    function renderRecipeItem({item, index}) {
        if (item.imageUrl) {
            return (
                <>
                    <SearchRecipeItem
                        recipe={item}
                        onPress={e => console.log(e)}
                        index={index}
                    />
                </>
            );
        }
    }

    return (
        <View style={{width: '100%', paddingHorizontal: 10}}>
            {recipes?.length > 0 && (
                <FlatList
                    data={Object.values(recipes)}
                    style={styles.resultList}
                    renderItem={renderRecipeItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    ListFooterComponent={
                        <View
                            style={{
                                height: 500,
                                width: '100%',
                            }}
                        />
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    resultList: {paddingBottom: 40},
});
