import React from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};
const Page = async ({ params }: Props) => {
  const { id } = await params;

  return <div>render conversation: {id}</div>;
};

export default Page;
