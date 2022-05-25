import { render, screen } from "@testing-library/react";
import { createMock } from "ts-jest-mock";
import { useSession } from "next-auth/client";
import { SignInButton } from ".";

jest.mock("next-auth/client");

describe("SignInButton component", () => {
  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = createMock(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("renders correctly when user authenticated", () => {
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

    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
