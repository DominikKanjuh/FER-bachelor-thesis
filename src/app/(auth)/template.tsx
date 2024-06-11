const Template = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      className="
      h-screen
      p-6 flex
      items-center
      justify-center"
    >
      {children}
    </div>
  );
};

export default Template;
