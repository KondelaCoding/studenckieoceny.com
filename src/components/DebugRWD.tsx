const DebugRWD = () => {
  return (
    <div className="hidden fixed bottom-0 left-0 z-50 w-fit bg-card p-10 text-5xl font-bold border-2 border-primary">
      <h1 className="sm:hidden">XS</h1>
      <h1 className="hidden sm:block md:hidden">SM</h1>
      <h1 className="hidden md:block lg:hidden">MD</h1>
      <h1 className="hidden lg:block xl:hidden">LG</h1>
      <h1 className="hidden xl:block 2xl:hidden">XL</h1>
      <h1 className="hidden 2xl:block">2XL</h1>
    </div>
  );
};

export default DebugRWD;
