import { useEffect, useState } from "react";
import { fetchRates } from "../../api/api";
import styles from "./CurrencyConverter.module.css"; // Імпортуємо стилі

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("UAH");

  useEffect(() => {
    const loadRates = async () => {
      const fetchedRates = await fetchRates();
      if (fetchedRates) setRates(fetchedRates);
    };
    loadRates();
  }, []);

  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const rate = rates[toCurrency] / rates[fromCurrency];
      setConvertedAmount((amount * rate).toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCurrencyChange = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
    <div className={styles.converter}>
      <h2>Конвертація валют</h2>
      <div className={styles.inputGroup}>
        <input type="number" value={amount} onChange={handleAmountChange} />
        <select
          value={fromCurrency}
          onChange={handleCurrencyChange(setFromCurrency)}
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.inputGroup}>
        <input type="number" value={convertedAmount} readOnly />
        <select
          value={toCurrency}
          onChange={handleCurrencyChange(setToCurrency)}
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
