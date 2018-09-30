import React from 'react';
import {Animated, Dimensions, FlatList, StyleSheet, View} from "react-native";
import Place from "./Place/Place";
import { Place as IPlace } from "../../models";
import {Navigator} from "react-native-navigation";
import StyledButton from "../UI/StyledButton/StyledButton";

class Places extends React.Component<Props, State> {
    state = {
        placesLoaded: false,
        animationTimer: new Animated.Value(1)
    };

    constructor(props: Props) {
        super(props);
        props.navigator.setOnNavigatorEvent(event => {
            if (event.type === 'NavBarButtonPress' && event.id === 'sideDrawerToggle') {
                props.navigator.toggleDrawer({ side: 'left' });
            }
        });
    }

    placesSearchHandler = () => {
        Animated.timing(this.state.animationTimer, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => this.listLoaded());
    };

    listLoaded = () => {
        this.setState({ placesLoaded: true });
        Animated.timing(this.state.animationTimer, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    };

    render() {
        const { places, navigator } = this.props;
        const { animationTimer } = this.state;
        const btnAnimation = {
            opacity: animationTimer,
            transform: [{
                scale: animationTimer.interpolate({
                    inputRange: [0, 1],
                    outputRange: [12, 1]
                })
            }]
        };
        const listAnimation = {
            opacity: animationTimer,
            transform: [{
                translateX: animationTimer.interpolate({
                    inputRange: [0, 1],
                    outputRange: [Dimensions.get('window').width, 0]
                })
            }]
        };
        if (!this.state.placesLoaded) {
            return (
                <View style={styles.buttonContainer}>
                    <Animated.View style={btnAnimation}>
                        <StyledButton
                            onPress={this.placesSearchHandler}
                            btnStyle={styles.searchButton}
                            textStyle={styles.searchButtonText}
                        >Search</StyledButton>
                    </Animated.View>
                </View>
            );
        }
        return (
            <Animated.View style={listAnimation}>
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
            </Animated.View>
        );
    }
}

export interface Props {
    places: IPlace[];
    navigator: Navigator;
}
export interface State {
    placesLoaded: boolean;
    animationTimer: Animated.Value;
}

const styles = StyleSheet.create({
    listContainer: {
        width: '100%'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchButton: {
        borderColor: 'blue',
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: 'blue',
        fontSize: 26,
        fontWeight: 'bold'
    }
});

export default Places;