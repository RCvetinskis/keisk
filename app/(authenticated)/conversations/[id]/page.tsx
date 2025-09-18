import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Props) => {
  const { id } = params;

  return <div>render conversation: {id}</div>;
};

export default Page;
