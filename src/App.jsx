import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {


  const [currencies, setCurrencies] = useState({});
  const [first, setFirst] = useState("USD");
  const [sec, setSec] = useState("MAD");
  const [amount, setamount] = useState("");
  const [result, setresult] = useState("");

  const [from,setfrom] = useState("")
  const [to,setto] = useState("")
  const [amount2,setamount2] = useState("")

  useEffect(() => {
    axios.get("https://v6.exchangerate-api.com/v6/9628faf303ed95b833682b86/latest/USD")
      .then(res => setCurrencies(res.data.conversion_rates))
  }, []);

  const calculate = () =>{
    const exchange_rate = currencies[sec]/currencies[first]
    const res = amount*exchange_rate
    setfrom(first)
    setto(sec)
    setamount2(amount)
    setresult(String(res))
  }


  const switchCurrency=()=>{
    setFirst(sec)
    setSec(first)
  }




  return (
    <div className="app">
      <h1 className="title">Currency Converter</h1>
      <div className="form_converter">
        <div className="amount">
          <p>Enter Amount</p>
          <input type="text" placeholder="Enter Amount..." onChange={(e)=>setamount(e.target.value)}/>
        </div>
        <div className="from_to">
          <div className="from">
            <p>From</p>
            <select value={first} onChange={(e)=>setFirst(e.target.value)}>
            {Object.keys(currencies).map((currencyCode, index) => (
              <option key={index} value={currencyCode}>
                {currencyCode}
              </option>
            ))}
            </select>
          </div>
          <div onClick={switchCurrency} className="shape">
            <i class="fa-solid fa-arrow-right-arrow-left"></i>
          </div>
          <div className="to">
            <p>To</p>
            <select value={sec} onChange={(e)=>setSec(e.target.value)}>
            {Object.keys(currencies).map((currencyCode, index) => (
              <option key={index} value={currencyCode}>
                {currencyCode}
              </option>
            ))}
            </select>
          </div>
        </div>
        <button onClick={calculate}>Get Exchange Rate</button>
        <div className="result">{result?amount2 +" "+from+ " = " +result.slice(0,4)+" "+ to:""}</div>
      </div>
    </div>
  );
};

export default App;


