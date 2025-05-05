import Navbar from "@/components/Navbar";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navbar isSearchBarVisible={false} />
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
