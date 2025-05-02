import Navbar from "@/components/Navbar";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navbar isSearchBarVisible={false} />
      {children}
    </div>
  );
};

export default AuthLayout;
