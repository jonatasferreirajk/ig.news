import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/client";
import { createMock } from "ts-jest-mock";
import Home from "../src/pages";

jest.mock("next-auth/client");
jest.mock("next/dist/client/router");

describe("Home page", () => {
  it("renders correctly", () => {

    const useSessionMocked = createMock(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);
    
    render(
      <Home product={{ priceId: "fake-price-id", amount: "R$10,00" }} />
    );

    expect(screen.getByText("for R$10,00 month")).toBeInTheDocument();
  });
});
