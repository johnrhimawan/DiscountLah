import React from "react"
import Register from "../../../components/auth/Register"
import { fireEvent, render } from "@testing-library/react-native"
import { act } from "react-test-renderer";

let fetch = require("jest-fetch-mock")

it('Should register successfully', async () => {
    fetch.mockResponseOnce(JSON.stringify({ passes: true }));

    const pushMock = jest.fn();
    const renderedComponent = render(<Register />);
    
    fireEvent.changeText(renderedComponent.getByPlaceholder("Full Name"), "ABCD");
    fireEvent.changeText(renderedComponent.getByPlaceholder("Email"), "abcd@gmail.com");
    fireEvent.changeText(renderedComponent.getByPlaceholder("Password"), "test123");
    fireEvent.press(renderedComponent.getByTestId("Register.signup"));

    expect(fetch.mock.calls).toMatchSnapshot();
    await act(flushMicrotasksQueue);

    expect(pushMock).toBeCalledWith("App");
})

it('Should not register with password less than 6 characters', async () => {
    
    fetch.mockResponseOnce(JSON.stringify({ passes: true }));

    const pushMock = jest.fn();
    const renderedComponent = render(<Register />);
    
    fireEvent.changeText(renderedComponent.getByPlaceholder("Full Name"), "ABCD");
    fireEvent.changeText(renderedComponent.getByPlaceholder("Email"), "abcd@gmail.com");
    fireEvent.changeText(renderedComponent.getByPlaceholder("Password"), "test");
    fireEvent.press(renderedComponent.getByTestId("Register.signup"));

    expect(fetch.mock.calls).toMatchSnapshot();
    await act(flushMicrotasksQueue);

    expect(pushMock).not.toBeCalledWith("App");
})

it('Should not register with invalid email', async () => {
    
    fetch.mockResponseOnce(JSON.stringify({ passes: true }));

    const pushMock = jest.fn();
    const renderedComponent = render(<Register />);
    
    fireEvent.changeText(renderedComponent.getByPlaceholder("Full Name"), "ABCD");
    fireEvent.changeText(renderedComponent.getByPlaceholder("Email"), "abcd");
    fireEvent.changeText(renderedComponent.getByPlaceholder("Password"), "test");
    fireEvent.press(renderedComponent.getByTestId("Register.signup"));

    expect(fetch.mock.calls).toMatchSnapshot();
    await act(flushMicrotasksQueue);

    expect(pushMock).not.toBeCalledWith("App");
})


it('Should not register without email', async () => {
    
    fetch.mockResponseOnce(JSON.stringify({ passes: true }));

    const pushMock = jest.fn();
    const renderedComponent = render(<Register />);
    
    fireEvent.changeText(renderedComponent.getByPlaceholder("Full Name"), "ABCD");
    fireEvent.changeText(renderedComponent.getByPlaceholder("Email"), "");
    fireEvent.changeText(renderedComponent.getByPlaceholder("Password"), "test");
    fireEvent.press(renderedComponent.getByTestId("Register.signup"));

    expect(fetch.mock.calls).toMatchSnapshot();
    await act(flushMicrotasksQueue);

    expect(pushMock).not.toBeCalledWith("App");
})



it('Should not register without password', async () => {
    
    fetch.mockResponseOnce(JSON.stringify({ passes: true }));

    const pushMock = jest.fn();
    const renderedComponent = render(<Register />);
    
    fireEvent.changeText(renderedComponent.getByPlaceholder("Full Name"), "ABCD");
    fireEvent.changeText(renderedComponent.getByPlaceholder("Email"), "abcd@gmail.com");
    fireEvent.changeText(renderedComponent.getByPlaceholder("Password"), "");
    fireEvent.press(renderedComponent.getByTestId("Register.signup"));

    expect(fetch.mock.calls).toMatchSnapshot();
    await act(flushMicrotasksQueue);

    expect(pushMock).not.toBeCalledWith("App");
})

it('Should not register without name', async () => {
    
    fetch.mockResponseOnce(JSON.stringify({ passes: true }));

    const pushMock = jest.fn();
    const renderedComponent = render(<Register />);
    
    fireEvent.changeText(renderedComponent.getByPlaceholder("Full Name"), "");
    fireEvent.changeText(renderedComponent.getByPlaceholder("Email"), "abcd@gmail.com");
    fireEvent.changeText(renderedComponent.getByPlaceholder("Password"), "test123");
    fireEvent.press(renderedComponent.getByTestId("Register.signup"));

    expect(fetch.mock.calls).toMatchSnapshot();
    await act(flushMicrotasksQueue);

    expect(pushMock).not.toBeCalledWith("App");
})

