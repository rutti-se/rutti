import React, {Component, useState, useEffect} from 'react';
import {View} from 'react-native';
import Ica_unselected from '../../assets/markers/ica_unselected.svg';
import Coop_unselected from '../../assets/markers/coop_unselected.svg';
import Citygross_unselected from '../../assets/markers/citygross_unselected.svg';
import Ica_selected from '../../assets/markers/ica_selected.svg';
import Coop_selected from '../../assets/markers/coop_selected.svg';
import Citygross_selected from '../../assets/markers/citygross_selected.svg';

export default ({store, selected}) => {
    function renderMarker() {
        if (store === 'ica') {
            return selected ? (
                <Ica_selected height={50} width={50} />
            ) : (
                <Ica_unselected height={50} width={50} />
            );
        }
        if (store === 'coop') {
            return selected ? (
                <Coop_selected height={50} width={50} />
            ) : (
                <Coop_unselected height={50} width={50} />
            );
        }
        if (store === 'citygross') {
            return selected ? (
                <Citygross_selected height={50} width={50} />
            ) : (
                <Citygross_unselected height={50} width={50} />
            );
        }
    }

    return <View>{renderMarker()}</View>;
};
