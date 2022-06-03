import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/client";
import { createMock } from "ts-jest-mock";
import { getPrismicClient } from "../src/services/prismic";

import { getStaticProps } from "../src/pages";
import Posts from "../src/pages/posts";

jest.mock("next-auth/client");
jest.mock("next/dist/client/router");
jest.mock("../src/services/prismic");

const posts = [
  {
    slug: "my-new-post",
    title: "My New Post",
    excerpt: "Post excerpt",
    updatedAt: "03 of June",
  },
];

describe("Posts page", () => {
  it("renders correctly", () => {
    const useSessionMocked = createMock(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<Posts posts={posts} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
  });

  // it("loads initial data", async () => {
  //   const getPrismicClientMocked = createMock(getPrismicClient);

  //   getPrismicClientMocked.mockReturnValueOnce({
  //     query: jest.fn().mockResolvedValue({
  //       results: [
  //         {
  //           uid: "my-new-post",
  //           data: {
  //             title: [{ type: "heading", text: "My new post" }],
  //             content: [{ type: "paragraph", text: "Post excerpt" }],
  //             last_publication_date: "03-06-2022",
  //           },
  //         },
  //       ],
  //     }),
  //   } as any);

  //   const response = await getStaticProps({});

  //   expect(response).toEqual(
  //     expect.objectContaining({
  //       props: {
  //         posts: [
  //           {
  //             slug: "my-new-post",
  //             title: "My New Post",
  //             excerpt: "Post excerpt",
  //             updatedAt: "03 de junho de 2022",
  //           },
  //         ],
  //       },
  //     })
  //   );
  // });
});
