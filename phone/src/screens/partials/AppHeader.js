import React from 'react';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import { DrawerActions } from 'react-navigation';

const AppHeader = ({ navigation }) => (
    <Container>
        <Header>
            <Left>
                <Button transparent onPress={ () => { navigation.dispatch(DrawerActions.toggleDrawer()) } }>
                    <Icon name='menu' />
                </Button>
            </Left>
            <Body>
            <Title>Home Screen</Title>
            </Body>
            <Right />
        </Header>
    </Container>
)

export default AppHeader;