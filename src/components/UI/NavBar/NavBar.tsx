import * as React from 'react';
import {Button, Header, Icon, Left, Body, Right, Title} from 'native-base';
import {NavProp} from "../../../models";

type Props = NavProp & {
    title: string;
    back?: boolean;
}
const NavBar = ({ navigation, title, back = false }: Props) => (
    <Header>
        <Left>{ back ?
            <Button transparent onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" />
            </Button> : null
        }</Left>
        <Body>
            <Title>{title}</Title>
        </Body>
        <Right>
            <Button transparent onPress={() => navigation.openDrawer()}>
                <Icon name="menu" />
            </Button>
        </Right>
    </Header>
);

export default NavBar;