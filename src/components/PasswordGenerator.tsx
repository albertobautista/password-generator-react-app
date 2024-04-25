import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "./PasswordGenerator.css";

const lowercaseList = "abcdefghijklmnopqrstuvwxyz";

const uppercaseList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const numbersList = "0123456789";

const symbolsList = "!@#$%^&*()?";

const PasswordGenerator = () => {
  const [password, setPassword] = useState(" ");
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [passwordLength, setPasswordLength] = useState(10);
  const [selectedChoices, setSelectedChoices] = useState([
    "lowercase",
    "uppercase",
    "numbers",
    "symbols",
  ]);

  const generatePassword = () => {
    let characterList = "";

    if (lowerCase) {
      characterList += lowercaseList;
    }
    if (upperCase) {
      characterList += uppercaseList;
    }
    if (numbers) {
      characterList += numbersList;
    }
    if (symbols) {
      characterList += symbolsList;
    }
    let tempPassword = "";

    const characterListLength = characterList.length;

    for (let index = 0; index < passwordLength; index++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      tempPassword += characterList.charAt(characterIndex);
    }
    setPassword(tempPassword);
  };

  const copyPassword = async () => {
    const copiedText = await navigator.clipboard.readText();
    if (password && copiedText !== password) {
      navigator.clipboard.writeText(password);

      // toast.success("Password copied to clipboard", {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      // });
    }
  };

  const handleCheckbox = (type: string) => {
    let tempChoices = selectedChoices;
    if (tempChoices.includes(type)) {
      const index = tempChoices.indexOf(type);
      tempChoices.splice(index, 1);
    } else {
      tempChoices.push(type);
    }
    console.log(tempChoices);
    setSelectedChoices(tempChoices);
  };

  useEffect(() => {
    generatePassword();
  }, [passwordLength]);

  return (
    <>
      <div className="container">
        <h2 className="title">Password Generator</h2>
        <div className="password-wrapper">
          <div className="password-area">
            <div className="password">
              <input
                type="text"
                disabled
                placeholder="Click on the Generate Password"
                value={password}
              />
            </div>
          </div>
        </div>
        <div className="setting">
          <h3>Customize your password</h3>
          <div className="customize">
            <div className="checkboxes">
              <div className="left">
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    name="lower"
                    id="lower"
                    checked={lowerCase}
                    disabled={
                      selectedChoices.length === 1 &&
                      selectedChoices.includes("lowercase")
                    }
                    onChange={() => {
                      setLowerCase(!lowerCase);
                      handleCheckbox("lowercase");
                    }}
                  />
                  <label htmlFor="lower">Include Lower case(a-z)</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    name="upper"
                    id="upper"
                    checked={upperCase}
                    disabled={
                      selectedChoices.length === 1 &&
                      selectedChoices.includes("uppercase")
                    }
                    onChange={() => {
                      setUpperCase(!upperCase);
                      handleCheckbox("uppercase");
                    }}
                  />
                  <label htmlFor="upper">Include Upper case(A-Z)</label>
                </div>
              </div>
              <div className="right">
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    name="numbers"
                    id="numbers"
                    checked={numbers}
                    disabled={
                      selectedChoices.length === 1 &&
                      selectedChoices.includes("numbers")
                    }
                    onChange={() => {
                      setNumbers(!numbers);
                      handleCheckbox("numbers");
                    }}
                  />
                  <label htmlFor="numbers">Include Numbers(0-9)</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    name="symbols"
                    id="symbols"
                    checked={symbols}
                    disabled={
                      selectedChoices.length === 1 &&
                      selectedChoices.includes("symbols")
                    }
                    onChange={() => {
                      setSymbols(!symbols);
                      handleCheckbox("symbols");
                    }}
                  />
                  <label htmlFor="symbols">Include Symbols(&-# )</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="password-length">
          <h3>Password Length</h3>
          <div className="slider">
            <p className="rangeValue">{passwordLength}</p>
            <div className="range">
              <input
                type="range"
                min={10}
                max={20}
                defaultValue={passwordLength}
                onChange={(event) =>
                  setPasswordLength(Number(event.target.value))
                }
              />
            </div>
          </div>
        </div>
        <div className="buttons">
          <button onClick={copyPassword}>Copy Password</button>
          <button type="button" onClick={generatePassword}>
            Generate Password
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PasswordGenerator;
