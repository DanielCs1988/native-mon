import React from 'react';
import {FlatList, StyleSheet} from "react-native";
import Place from "./Place/Place";
import { Place as IPlace } from "../../models";
import {Navigator} from "react-native-navigation";

const Places = ({ places, navigator }: Props) => {
    navigator.setOnNavigatorEvent(event => {
        if (event.type === 'NavBarButtonPress' && event.id === 'sideDrawerToggle') {
            navigator.toggleDrawer({ side: 'left' });
        }
    });
    return (
        <FlatList
            style={styles.listContainer}
            data={places}
            renderItem={({ item: place }) => (
                <Place
                    name={place.name}
                    image={place.image}
                    onSelect={() => navigator.push({
                        screen: 'native-mon.PlaceDetailScreen',
                        title: place.name,
                        animationType: 'slide-horizontal',
                        passProps: { place }
                    })}
                />
            )}
        />
    );
};

export interface Props {
    places: IPlace[];
    navigator: Navigator;
}

const styles = StyleSheet.create({
    listContainer: {
        width: '100%'
    }
});

export default Places;