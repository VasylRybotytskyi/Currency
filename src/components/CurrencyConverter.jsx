import { useEffect, useState } from "react";
import { fetchRates } from "../api/api";

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(0);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("UAH");
  console.log(rates[currency2]);
  console.log(rates[currency1]);

  useEffect(() => {
    const loadRates = async () => {
      const fetchedRates = await fetchRates();
      if (fetchedRates) {
        setRates(fetchedRates);
      }
    };
    loadRates();
  }, []);

  useEffect(() => {
    if (rates) {
      const rate1to2 = rates[currency2] / rates[currency1]; //знач usd
      setAmount2((amount1 * rate1to2).toFixed(2));
    }
  }, [amount1, currency1, currency2, rates]);

  return (
    <div>
      <div>
        <input
          type="number"
          value={amount1}
          onChange={(e) => setAmount1(e.target.value)}
        />
        <select
          value={currency1}
          onChange={(e) => setCurrency1(e.target.value)}
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div>
        <input type="number" value={amount2} readOnly />
        <select
          value={currency2}
          onChange={(e) => setCurrency2(e.target.value)}
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencyConverter;