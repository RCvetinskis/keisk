const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center flex-col  gap-5 justify-center h-full">
      <h1>Welcome</h1>
      {children}
    </div>
  );
};

export default AuthLayout;
