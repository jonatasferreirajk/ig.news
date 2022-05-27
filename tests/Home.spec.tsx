import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/client";
import { createMock } from "ts-jest-mock";
import { stripe } from "../src/services/stripe";

import Home, { getStaticProps } from "../src/pages";

jest.mock("next-auth/client");
jest.mock("next/dist/client/router");
jest.mock("../src/services/stripe");

describe("Home page", () => {
  it("renders correctly", () => {
    const useSessionMocked = createMock(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<Home product={{ priceId: "fake-price-id", amount: "R$10,00" }} />);

    expect(screen.getByText("for R$10,00 month")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const retrieveStriperPricesMocked = createMock(stripe.prices.retrieve);

    retrieveStriperPricesMocked.mockResolvedValueOnce({
      id: "fake-price-id",
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: { 
          product: { 
            priceId: "fake-price-id", 
            amount: "$10.00" 
          } 
        },
      })
    );
  });
});
