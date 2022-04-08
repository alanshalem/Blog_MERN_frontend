import { useState } from "react";
import { useTranslation } from "react-i18next";
import ArFlag from "../components/icons/icons8-argentina-48.png";
import UsFlag from "../components/icons/icons8-usa-48.png";

export default function LangToggle({ compact }) {
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useState("es");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLang(lng);
  };

  if (compact) {
    return (
      <div className="flex flex-col items-center justify-self-center cursor-pointer px-5">
        {lang === "es" ? (
          <button onClick={() => changeLanguage("en")}>
            <img src={UsFlag} alt="us-flag" />
          </button>
        ) : (
          <button onClick={() => changeLanguage("es")}>
            <img src={ArFlag} alt="ar-flag" />
          </button>
        )}
      </div>
    );
  }
  return (
    <div className="absolute flex flex-col items-center justify-self-center py-5 width-50">
      {lang === "es" ? (
        <button onClick={() => changeLanguage("en")}>
          <img src={UsFlag} alt="us-flag" />
        </button>
      ) : (
        <button onClick={() => changeLanguage("es")}>
          <img src={ArFlag} alt="ar-flag" />
        </button>
      )}
    </div>
  );
}
