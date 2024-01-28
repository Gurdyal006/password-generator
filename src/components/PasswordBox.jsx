import { useCallback, useEffect, useRef, useState } from "react";
export default function PasswordBox() {
  const [length, setLength] = useState(4);
  const [isNumber, setIsNumber] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [password, setPassword] = useState("");

  //ref hook
  const passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumber) str += "0123456789";
    if (isChar) str += "@#$&*";

    // for loop length
    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, isNumber, isChar, setPassword]);

  // copy input
  const copyClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // call function
  useEffect(
    () => passwordGenerator(),
    [length, isNumber, isChar, passwordGenerator]
  );
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-6 my-8 bg-gray-800 text-orange-500">
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyClipboard}
          className="outline-none bg-green-700 text-white px-3 py-0.5 shrink-0"
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={5}
            max={12}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={isNumber}
            id="numberInput"
            onChange={() => {
              setIsNumber((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={isChar}
            id="charAllowed"
            onChange={() => {
              setIsChar((prev) => !prev);
            }}
          />
          <label htmlFor="charAllowed">Characters</label>
        </div>
      </div>
    </div>
  );
}
