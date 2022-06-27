import React from "react"
import Login from "../components/auth/Login"
import { fireEvent, render } from "@testing-library/react-native"
// import fetch from "node-fetch"
import { act } from "react-test-renderer";

it('Should log in successfully', async () => {
    fetch.mockResponseOnce(JSON.stringify({ passes: true }));

    const pushMock = jest.fn();
    const renderedComponent = render(<Login />);
    
    fireEvent.changeText(getByPlaceholder("Email"), "test@disc.com");
    fireEvent.changeText(getByPlaceholder("Password"), "test123");
    fireEvent.press(getByTestId("Login.Button"));

    expect(fetch.mock.calls).toMatchSnapshot();
    await act(flushMicrotasksQueue);

    expect(pushMock).toBeCalledWith("App");

})
