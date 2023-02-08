import { IconTitleSub } from "@/components/IconTitleSub";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { switchTheme } from "../../utils/switchTheme";
import axios from "axios";

import { FaLightbulb, FaTemperatureLow } from "react-icons/fa";
import { RiContrastDrop2Fill } from "react-icons/ri";
import { BiArrowBack } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiFillGithub } from "react-icons/ai";

import { WeatherType } from "@/types";
import { GetIcon, iconWeather } from "../../utils/iconWeather";

import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";

import Link from "next/link";

const Weather = (): ReactElement => {
  const [cityName, setCityName] = React.useState<string>();
  const [weather, setWeather] = React.useState<WeatherType>();

  const hour = new Date().getHours();

  const iconText: any = iconWeather;

  const router = useRouter();

  const { lat, lon } = router.query;

  const getData = async () => {
    if (lat && lon) {
      const date = new Date().toISOString();
      console.log(date.split("T")[0]);
      const { data: weatherData } = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode&timezone=America%2FSao_Paulo&start_date=${
          date.split("T")[0]
        }&end_date=${date.split("T")[0]}`
      );
      const options = {
        method: "GET",
        url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
        params: { location: `${lat}${lon}` },
        headers: {
          "X-RapidAPI-Key": process.env.RapidAPIKey,
          "X-RapidAPI-Host": process.env.RapidAPIHost,
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setCityName(response.data.data[0].city);
        })
        .catch(function (error) {});

      setWeather(weatherData);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon, hour]);

  return (
    <div className="darkT h-screen w-screen bg-whitePrimary dark:bg-blueDark">
      {weather && cityName ? (
        <>
          <div className="darkT flex w-full justify-between p-2 text-magentaDark dark:text-white">
            <div className="flex items-center gap-2">
              <button id="switchTheme" onClick={switchTheme}>
                <FaLightbulb className="darkT h-10 w-10 rounded-full p-1 hover:scale-110 hover:bg-pinkLight dark:hover:bg-blueHover" />
              </button>
              <label className="hidden sm:inline" htmlFor="switchTheme">
                Switch Theme
              </label>
            </div>
            <div className="flex items-center gap-1">
              <label className="hidden sm:inline" htmlFor="git">
                Open source code
              </label>
              <Link
                id="git"
                href={"https://github.com/matheusa1/weather-app"}
                target="_blank"
              >
                <AiFillGithub className="darkT h-10 w-10 rounded-full p-1 text-black hover:scale-110 hover:bg-pinkLight dark:text-white dark:hover:bg-blueHover md:h-12 md:w-12" />
              </Link>
            </div>
          </div>
          <div className="fixed top-1/2 left-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl shadow-2xl md:w-[600px]">
            <div className="darkT bg-pinkLight p-4 text-magentaDark dark:bg-[#2B4861] dark:text-white sm:p-8">
              <header className="flex items-center justify-between">
                <BiArrowBack
                  className="darkT h-6 w-6 cursor-pointer rounded-full hover:bg-magentaDark hover:text-white active:text-gray-300 dark:hover:bg-blueHover sm:h-8 sm:w-8"
                  onClick={() => router.push("/")}
                />
                <h1 className="font-bold sm:text-xl">Weather App</h1>
                <div className="hidden h-8 w-8 sm:inline" />
              </header>
              <main className="mt-4 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <HiOutlineLocationMarker className="h-5 w-5" />
                  {cityName}
                </div>

                <GetIcon weatherCode={1} className="h-40 w-40" />

                <span>
                  {iconText[weather?.hourly?.weathercode[hour]]?.text
                    .charAt(0)
                    .toUpperCase() +
                    iconText[weather?.hourly?.weathercode[hour]]?.text?.slice(
                      1
                    )}
                </span>

                <strong className="text-4xl">
                  {`${weather?.hourly?.temperature_2m[hour]} ${weather?.hourly_units?.temperature_2m}`}
                </strong>
              </main>
            </div>
            <div className="darkT flex flex-col bg-magentaDark dark:bg-bluePrimary sm:flex-row">
              <div className="flex w-full justify-center border-t-2 border-t-white sm:border-r-2">
                <IconTitleSub
                  icon={<FaTemperatureLow className="h-6 w-6" />}
                  title={`${weather?.hourly?.apparent_temperature[hour]} ${weather?.hourly_units?.apparent_temperature}`}
                  subTitle={"Feels like"}
                />
              </div>
              <div className="hidden" />
              <div className="flex w-full justify-center border-t-2 border-t-white">
                <IconTitleSub
                  icon={<RiContrastDrop2Fill className="h-6 w-6" />}
                  title={`${weather?.hourly?.relativehumidity_2m[hour]} ${weather?.hourly_units?.relativehumidity_2m}`}
                  subTitle={"Humidity"}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center bg-white dark:bg-blueDark">
          <div className="flex items-center gap-2 dark:text-white">
            <UseAnimations
              strokeColor={
                localStorage.getItem("theme") === "dark" ||
                !localStorage.getItem("theme")
                  ? "white"
                  : "black"
              }
              fillColor={
                localStorage.getItem("theme") === "dark" ||
                !localStorage.getItem("theme")
                  ? "white"
                  : "black"
              }
              animation={loading2}
              size={50}
            />
            Loading...
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
