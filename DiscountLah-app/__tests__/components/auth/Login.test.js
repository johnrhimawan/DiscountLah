import React from "react"
import Login from "../../../components/auth/Login"
import { fireEvent, render } from "@testing-library/react-native"
import { act } from "react-test-renderer";

let fetch = require("jest-fetch-mock")

it('Should log in successfully', async () => {
    fetch.mockResponseOnce(JSON.stringify({ passes: true }));

    const pushMock = jest.fn();
    const renderedComponent = render(<Login />);
    
    fireEvent.changeText(renderedComponent.getByPlaceholder("Email"), "test@disc.com");
    fireEvent.changeText(renderedComponent.getByPlaceholder("Password"), "test123");
    fireEvent.press(renderedComponent.getByTestId("Login.Button"));

    expect(fetch.mock.calls).toMatchSnapshot();
    await act(flushMicrotasksQueue);

    expect(pushMock).toBeCalledWith("App");
})

it('Should not log in with wrong password', async () => {
    
    fetch.mockResponseOnce(JSON.stringify({ passes: true }));

    const pushMock = jest.fn();
    const renderedComponent = render(<Login />);
    
    fireEvent.changeText(renderedComponent.getByPlaceholder("Email"), "test@disc.com");
    fireEvent.changeText(renderedComponent.getByPlaceholder("Password"), "test321"); // actual password is test123
    fireEvent.press(renderedComponent.getByTestId("Login.Button"));

    expect(fetch.mock.calls).toMatchSnapshot();
    await act(flushMicrotasksQueue);

    expect(pushMock).not.toBeCalledWith("App");
})