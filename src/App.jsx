import { useEffect, useState } from "react";
import "./App.css";
import Prayer from "./component/Prayer";

function App() {
  const [PrayerTimes, setPrayerTimes] = useState({});
  const [date, setDate] = useState("");
  const [city, setCity] = useState("Cairo");

  useEffect(() => {
    const fatchPrayerTime = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/01-06-2025?city=Eg&country=${city}`
        );
        const dataPrayer = await response.json();

        setPrayerTimes(dataPrayer.data.timings);
        setDate(dataPrayer.data.date.gregorian.date);
      } catch (error) {
        console.error(error);
      }
    };
    fatchPrayerTime();
  }, [city]);

  const format = (time) => {
    if (!time) {
      return "00:00";
    }

    let [hours, minutes] = time.split(":").map(Number);
    const perd = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${perd}`;
  };

  return (
    <section>
      <div className="top_container">
        <div className="city">
          <h2>المدينة</h2>
          <select onChange={(e) => setCity(e.target.value)}>
            <option value="Cairo">القاهرة</option>
            <option value="Alexandria">الاسكندرية</option>
            <option value="Giza">الجيزة</option>
            <option value="Mansoura">المنصورة</option>
            <option value="Aswan">أسوان</option>
            <option value="Luxor">الأقصر</option>
          </select>
        </div>
        <div className="date">
          <h2>التاريخ</h2>
          <p>{date}</p>
        </div>
      </div>
      <div className="bottom_container">
        <Prayer name="الفجر" time={format(PrayerTimes.Fajr)} />
        <Prayer name="الظهر" time={format(PrayerTimes.Dhuhr)} />
        <Prayer name="العصر" time={format(PrayerTimes.Asr)} />
        <Prayer name="المغرب" time={format(PrayerTimes.Maghrib)} />
        <Prayer name="العشاء" time={format(PrayerTimes.Isha)} />
      </div>
    </section>
  );
}

export default App;
