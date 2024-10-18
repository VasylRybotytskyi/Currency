import axios from "axios";
import { useEffect, useState } from "react";

const Header = () => {
  const [usdRate, setUsdRate] = useState(0);
  const [eurRate, setEurRate] = useState(0);

  useEffect(() => {
    const fetchUsdRate = async () => {
      try {
        const res = await axios.get(
          "https://api.exchangerate-api.com/v4/latest"
        );

        const usdToUah = res.data.rates.UAH;
        setUsdRate(usdToUah);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchEurRate = async () => {
      try {
        const res = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/EUR"
        );
        const eurToUah = res.data.rates.UAH;
        setEurRate(eurToUah);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsdRate();
    fetchEurRate();
  }, []);

  return (
    <header>
      <h1>Курс валют щодо гривні</h1>
      <p>1 USD = {usdRate.toFixed(2)} UAH</p>
      <p>1 EUR = {eurRate.toFixed(2)} UAH</p>
    </header>
  );
};

export default Header;
