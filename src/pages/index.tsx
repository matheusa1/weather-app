import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { ImSearch } from "react-icons/im";
import { GiArrowDunk } from "react-icons/gi";

import Mountain from "../assets/mountain.svg";
import { useRouter } from "next/router";
import { switchTheme } from "../utils/switchTheme";
import { DebounceInput } from "react-debounce-input";

import * as Popover from "@radix-ui/react-popover";
import axios from "axios";
import { CitiesType } from "@/types";

export default function Home() {
  const [isOnSearch, setIsOnSearch] = useState<boolean>(false);
  const [text, setText] = useState<string>("Loading ...");
  const [loadingStatus, setLoadingStatus] = useState<
    "error" | "success" | "loading"
  >("loading");
  const [inputData, setInputData] = useState<string>("");
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [results, setResults] = useState<CitiesType[]>([]);
  const [city, setCity] = useState<CitiesType>();

  const router = useRouter();

  const divisorClassName = "w-20 h-[2px] bg-skin dark:bg-grayLight darkT";

  const searchLocation = () => {
    setText("Loading...");
    setLoadingStatus("loading");

    setIsOnSearch(true);

    if (!city) {
      setText("Please select a city");
      setLoadingStatus("error");
      return;
    }

    setText("Success!");
    setLoadingStatus("success");

    router.push({
      pathname: "/weather",
      query: {
        lat: city.latitude,
        lon: city.longitude,
      },
    });
  };

  const getLocation = async () => {
    setText("Loading...");
    setLoadingStatus("loading");
    setIsOnSearch(true);

    await navigator.geolocation.getCurrentPosition(
      (location) => {
        setText("Success!");
        setLoadingStatus("success");

        router.push({
          pathname: "/weather",
          query: {
            lat: location.coords.latitude,
            lon: location.coords.longitude,
          },
        });
      },
      (e) => {
        setText(e.message);
        setLoadingStatus("error");
      }
    );
  };

  const getCities = async () => {
    if (inputData.length <= 2) {
      setOpenPopover(false);
      return;
    }

    const options = {
      method: "GET",
      url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      params: { namePrefix: inputData },
      headers: {
        "X-RapidAPI-Key": process.env.RapidAPIKey,
        "X-RapidAPI-Host": process.env.RapidAPIHost,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setResults(response.data.data);
        setOpenPopover(true);
      })
      .catch(function (error) {});
  };

  const onCityClick = (e: string, city: CitiesType) => {
    setOpenPopover(false);
    setInputData(e);
    setCity(city);
  };

  useEffect(() => {
    getCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputData]);

  return (
    <div className="h-screen w-screen items-center bg-white transition-colors duration-500 dark:bg-blueDark sm:justify-center">
      <div
        className={`darkT absolute top-0 left-1/2 mt-10 flex w-[80%] -translate-x-1/2 flex-col items-center rounded-lg p-4 shadow-2xl sm:top-10 sm:mt-0 sm:w-[493px] sm:p-14 lg:top-1/2 lg:-translate-y-1/2 ${
          isOnSearch ? "gap-20" : "gap-12"
        }`}
      >
        <h1 className="darkT font-Blinker text-2xl font-semibold text-magentaDark dark:text-white">
          Weather App
        </h1>
        <section className="relative flex w-full flex-col items-center gap-4 font-Inter text-xs sm:text-sm">
          {isOnSearch && (
            <motion.div
              className={`h-10 w-full ${
                loadingStatus === "error"
                  ? `bg-red-400 text-white`
                  : loadingStatus === "loading"
                  ? `bg-grayLight dark:bg-[#D3DEDE]`
                  : `bg-green-400 text-white`
              } absolute flex items-center justify-center`}
              initial={{ top: 0, left: 0 }}
              animate={{ top: -50, left: 0 }}
              transition={{ duration: 0.2 }}
            >
              {text}
            </motion.div>
          )}
          <div className="flex w-full">
            <Popover.Root open={openPopover}>
              <Popover.Anchor className="w-full">
                <DebounceInput
                  minLength={2}
                  debounceTimeout={700}
                  onChange={(e) => setInputData(e.target.value)}
                  className="darkT h-10 w-full bg-pinkExtraLight px-2 text-left shadow-lg outline-none hover:bg-pinkLight hover:shadow-xl focus:bg-pinkExtraLight focus:shadow-lg dark:bg-grayLight dark:hover:bg-gray-300 dark:focus:bg-grayLight sm:text-center"
                  type="text"
                  placeholder={"Enter city name"}
                  value={inputData}
                />
              </Popover.Anchor>
              <Popover.Portal>
                <Popover.Content
                  onOpenAutoFocus={(e) => e.preventDefault()}
                  className="flex w-full flex-col rounded-xl bg-pinkExtraLight p-4 dark:bg-bluePrimary dark:text-whitePrimary"
                >
                  {results.length > 0 ? (
                    results.map((city) => {
                      return (
                        <div
                          key={city.id}
                          className="darkT rounded p-2 active:bg-black"
                          onClick={() => {
                            onCityClick(city.name, city);
                          }}
                        >
                          {`${city.name} - ${city.country}`}
                        </div>
                      );
                    })
                  ) : (
                    <div>Sem resultados</div>
                  )}
                  <Popover.Arrow className="fill-pinkExtraLight dark:fill-bluePrimary" />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
            <button
              className="h-10 bg-magentaLight p-3 transition-all duration-300 hover:bg-magentaDark active:bg-black dark:bg-greenPrimary dark:hover:bg-greenHover dark:active:bg-black"
              onClick={searchLocation}
            >
              <ImSearch className="h-4 w-4 text-white" />
            </button>
          </div>
          <div className="darkT flex items-center gap-3 dark:text-white">
            <div className={divisorClassName} />
            or
            <div className={divisorClassName} />
          </div>
          <button
            className="w-full bg-brownPrimary p-3 text-white drop-shadow-brownShadow transition-all duration-300 hover:bg-brownHover active:bg-black dark:bg-bluePrimary dark:shadow-lg dark:drop-shadow-none dark:hover:bg-blueHover dark:active:bg-black"
            onClick={getLocation}
          >
            Use device location
          </button>
        </section>
      </div>
      <div
        className="absolute bottom-0 w-full bg-red-500 cursor-pointer"
        onClick={switchTheme}
      >
        <div className="relative w-full">
          <div className="fixed -bottom-10 -left-20 h-80 w-80 rounded-full bg-blue-400 transition-all duration-1000 dark:bg-mountainNight sm:-left-10 sm:h-72 sm:w-72 xl:h-80 xl:w-80 2xl:h-96 2xl:w-96" />
          <div className="fixed bottom-40 left-28 h-20 w-20 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500 transition-all duration-1000 dark:bottom-20 dark:left-10 dark:bg-orange-500 dark:shadow-orange-500 sm:bottom-36 xl:bottom-44 xl:left-32 xl:dark:bottom-24 2xl:bottom-56 2xl:left-48 2xl:dark:bottom-28 2xl:dark:left-14" />
          <Image
            className="fixed -bottom-[1px] z-10 w-64 flex-shrink-0 xl:w-72 2xl:w-80"
            src={Mountain}
            alt={"mountain"}
          />
        </div>
      </div>
    </div>
  );
}
