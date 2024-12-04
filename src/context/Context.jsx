import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setinput] = useState("");
  const [recentPrompts, setrecentPrompts] = useState("");
  const [prevPrompts, setprevPrompts] = useState([]);
  const [showResult, setshowResult] = useState(false);
  const [loading, setloading] = useState(false);
  const [resultData, setresultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setresultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async (prompt) => {
    setresultData("");
    setloading(true);
    setshowResult(true);
    setrecentPrompts(input);
    setprevPrompts((prev) => [...prev, input]);
    const response = await run(input);
    let responseArray = response.split("**");
    let newArray = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newArray += responseArray[i];
      } else {
        newArray += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse = newArray.split("*").join("</br>");
    let newResponseArray = newResponse.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setresultData(newResponse);
    setloading(false);
    setinput("");
  };

  const contextValue = {
    prevPrompts,
    setprevPrompts,
    onSent,
    setrecentPrompts,
    recentPrompts,
    showResult,
    loading,
    resultData,
    input,
    setinput,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
