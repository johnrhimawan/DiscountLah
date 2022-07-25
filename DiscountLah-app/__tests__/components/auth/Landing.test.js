import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react-native'

import Landing from "../../../components/auth/Landing"

const onPressMock = jest.fn();
const pressed = "pressed";

describe('Landing Page', () => {

    describe('Image should be visible', () => {
        it('test 1', () => {
            const screen = render(<Landing />)
            const image = screen.getByTestId("image")
            expect(image).not.toBeNull()
        })
    })

    describe('Login Button should be visible', () => {
      it('test 1', () => {
        const screen = render(
            <Landing />
        );
        const button = screen.getByTestId("Landing.login")
        expect(button).not.toBeNull()
      });
    });

    describe('Sign Up Button should be visible', () => {
        it('test 1', () => {
            const screen = render(<Landing />)
            const button = screen.getByTestId("Landing.signup")
            expect(button).not.toBeNull()
        })
    })

    describe("Login Button should be pressable", () => {
        it ('test 1', () => {
            
        })
    })
})
