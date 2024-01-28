import logo from "../assets/logo.png";
export default function Header() {
  return (
    <div className="grid place-items-center my-6">
      <img width={100} height={100} src={logo} alt="logo" />
      <h1 className="text-4xl text-center my-2 text-green-600">
        Password Generator
      </h1>
    </div>
  );
}
