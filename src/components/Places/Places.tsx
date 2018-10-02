import React from 'react';
import {Animated, Dimensions, FlatList, View} from "react-native";
import Place from "./Place/Place";
import { Place as IPlace } from "../../models";
import {Navigator} from "react-native-navigation";
import StyledButton from "../UI/StyledButton/StyledButton";
import styles from "./Places.styles";

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

    componentDidMount() {
        this.props.getPlaces();
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
    getPlaces: () => void;
}
export interface State {
    placesLoaded: boolean;
    animationTimer: Animated.Value;
}

export default Places;