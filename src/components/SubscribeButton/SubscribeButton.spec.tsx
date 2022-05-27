import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/dist/client/router";
import { createMock } from "ts-jest-mock";
import { useSession, signIn } from "next-auth/client";
import { SubscribeButton } from ".";

jest.mock("next-auth/client");
jest.mock("next/dist/client/router");

describe("SubscribeButton component", () => {
  it("renders correctly", () => {
    const useSessionMocked = createMock(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe Now")).toBeInTheDocument();
  });

  it("redirects user to sign in when not authenticated", () => {
    const useSessionMocked = createMock(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    const signInMocked = createMock(signIn);

    signInMocked.mockResolvedValueOnce(jest.fn());

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe Now");

    fireEvent.click(subscribeButton);

    expect(signInMocked).toBeCalled();
  });

  it("redirects to posts page when user already a subscription", () => {
    const useSessionMocked = createMock(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: "John Doe",
          email: "johndoe@example.com",
        },
      },
      false,
    ]);

    const useRouterMocked = createMock(useRouter);

    const pushMock = jest.fn();

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe Now");

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalled();
  });
});
