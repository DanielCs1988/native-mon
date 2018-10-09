import React from 'react';
import {Animated, Dimensions, FlatList} from "react-native";
import Place from "./Place/Place";
import {NavProp, Place as IPlace} from "../../models";
import styles from "./Places.styles";
import {Routes} from "../../constants";
import {Button, Container, Content, Text} from "native-base";
import NavBar from "../UI/NavBar/NavBar";
import {showErrorMessage} from "../../utils";

const initialState = {
    placesLoaded: false,
    animationTimer: new Animated.Value(1)
};
type State = Readonly<typeof initialState>;
type Props = NavProp & {
    places: IPlace[];
    error: string | null;
    getPlaces: () => void;
};
class Places extends React.Component<Props, State> {

    readonly state = initialState;

    componentDidMount() {
        this.props.getPlaces();
    }

    componentDidUpdate() {
        if (this.props.error) {
            showErrorMessage(this.props.error);
        }
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
                <Container>
                    <NavBar navigation={navigation} title="Find a Place"/>
                    <Content contentContainerStyle={styles.buttonContainer}>
                        <Animated.View style={btnAnimation}>
                            <Button large transparent rounded
                                    style={styles.searchButton}
                                    onPress={this.placesSearchHandler}
                            >
                                <Text style={styles.searchButtonText}>Search</Text>
                            </Button>
                        </Animated.View>
                    </Content>
                </Container>
            );
        }
        return (
            <Container>
                <NavBar navigation={navigation} title="Find a Place"/>
                <Content padder>
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
                </Content>
            </Container>
        );
    }
}

export default Places;