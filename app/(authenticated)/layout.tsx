const AuthenticatedLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div>{children}</div>;
};

export default AuthenticatedLayout;
