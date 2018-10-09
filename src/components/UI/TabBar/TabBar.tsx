import * as React from 'react';
import {Button, Text, Icon, Footer, FooterTab} from "native-base";
import {Routes} from "../../../constants";
import {PlatformIcon} from "../../../utils";
import {NavProp} from "../../../models";

const TabBar = ({ navigation }: NavProp) => (
    <Footer>
        <FooterTab>
            <Button
                vertical
                active={navigation.state.index === 0}
                onPress={() => navigation.navigate(Routes.SHARE_PLACE)}
            >
                <Icon name={PlatformIcon('share')} />
                <Text>Share Place</Text>
            </Button>
            <Button
                vertical
                active={navigation.state.index === 1}
                onPress={() => navigation.navigate(Routes.FIND_PLACE_STACK)}
            >
                <Icon name={PlatformIcon('map')} />
                <Text>Find Place</Text>
            </Button>
        </FooterTab>
    </Footer>
);

export default TabBar;