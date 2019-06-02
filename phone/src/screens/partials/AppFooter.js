import React from 'react';
import { Footer, FooterTab, Button, Text } from 'native-base';

const AppFooter = ({logout}) => (
    <Footer>
        <FooterTab>
            <Button full onPress={ () => logout() }>
                <Text>Logout</Text>
            </Button>
        </FooterTab>
    </Footer>
)

export default AppFooter;