import React from 'react';
import {Animated, Dimensions, FlatList, View} from "react-native";
import Place from "./Place/Place";
import {NavProp, Place as IPlace} from "../../models";
import StyledButton from "../UI/StyledButton/StyledButton";
import styles from "./Places.styles";
import {Routes} from "../../constants";

const initialState = {
    placesLoaded: false,
    animationTimer: new Animated.Value(1)
};
type State = Readonly<typeof initialState>;
type Props = NavProp & {
    places: IPlace[];
    getPlaces: () => void;
};
class Places extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'Find Place'
    };

    readonly state = initialState;

    componentDidMount() {
        this.props.getPlaces();
    }

    private placesSearchHandler = () => {
        Animated.timing(this.state.animationTimer, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => this.listLoaded());
    };

    private listLoaded = () => {
        this.setState({ placesLoaded: true });
        Animated.timing(this.state.animationTimer, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    };

    render() {
        const { places, navigation } = this.props;
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
                            onSelect={() => navigation.push(Routes.PLACE_DETAILS, { place })}
                        />
                    )}
                />
            </Animated.View>
        );
    }
}

export default Places;