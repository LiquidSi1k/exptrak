import ExpTrak from "../assets/ExpTrak.png";

const Nav = () => {
  return (
    <nav className="w-full flex items-center justify-between bg-orange-500 h-12 p-2 px-20">
      <div className="flex">
        <img src={ExpTrak} width={200} />
      </div>

      <div></div>
    </nav>
  );
};

export default Nav;
