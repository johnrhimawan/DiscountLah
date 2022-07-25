import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react-native'

import Landing from "../../../components/auth/Landing"

const onPressMock = jest.fn();
const pressed = "pressed";

describe('Landing Page', () => {
    describe('test', () => {
        it('test', () => {
            const screen = render(<Landing />)
            const view = screen.getByTestId("hi")
            expect(view).not.toBeNull()
        })
    });

    describe('Login Button should be pressable', () => {
      it('test 1', () => {
        const screen = render(
            <Landing />
        );
        fireEvent.press(getByTestId("Landing.login"))
        
      });
    });
})
