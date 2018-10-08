import * as React from 'react';
import {NavProp} from "../../../models";
import {PlatformIcon} from "../../../utils";
import IconButton from "../IconButton/IconButton";

const DrawerToggle = ({ navigation }: NavProp) => (
    <IconButton
        icon={PlatformIcon('menu')}
        color="blue" size={30}
        onClick={() => navigation.openDrawer()}
    />
);

export default DrawerToggle;