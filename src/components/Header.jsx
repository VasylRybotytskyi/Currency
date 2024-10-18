import { useEffect, useState } from "react";
import { fetchRates } from "../api/api";

const Header = () => {
  const [rates, setRates] = useState({ USD: 0, EUR: 0 });

  useEffect(() => {
    const fetchRatesForCurrencies = async () => {
      try {
        const usdRes = await fetchRates("USD");
        const eurRes = await fetchRates("EUR");
        setRates({ USD: usdRes.UAH, EUR: eurRes.UAH });
      } catch (error) {
        console.log(error);
      }
    };

    fetchRatesForCurrencies();
  }, []);

  return (
    <header>
      <h1>Курс валют щодо гривні</h1>
      <p>1 USD = {rates.USD.toFixed(2)} UAH</p>
      <p>1 EUR = {rates.EUR.toFixed(2)} UAH</p>
    </header>
  );
};

export default Header;
