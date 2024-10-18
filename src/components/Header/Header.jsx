import { useEffect, useState } from "react";
import { fetchRates } from "../../api/api";
import styles from "../Header/header.module.css";

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
    <header className={styles.header}>
      <h1 className={styles.title}>Курс валют</h1>
      <p className={styles.rate}>USD = {rates.USD.toFixed(2)} UAH</p>
      <p className={styles.rate}>EUR = {rates.EUR.toFixed(2)} UAH</p>
    </header>
  );
};

export default Header;
