export const countryList = [
  {
    value: "ad",
    label: {
      en: "Andorra",
      pl: "Andora",
    },
  },
  {
    value: "al",
    label: {
      en: "Albania",
      pl: "Albania",
    },
  },
  {
    value: "at",
    label: {
      en: "Austria",
      pl: "Austria",
    },
  },
  {
    value: "ba",
    label: {
      en: "Bosnia and Herzegovina",
      pl: "Bośnia i Hercegowina",
    },
  },
  {
    value: "be",
    label: {
      en: "Belgium",
      pl: "Belgia",
    },
  },
  {
    value: "bg",
    label: {
      en: "Bulgaria",
      pl: "Bułgaria",
    },
  },
  {
    value: "by",
    label: {
      en: "Belarus",
      pl: "Białoruś",
    },
  },
  {
    value: "ch",
    label: {
      en: "Switzerland",
      pl: "Szwajcaria",
    },
  },
  {
    value: "cy",
    label: {
      en: "Cyprus",
      pl: "Cypr",
    },
  },
  {
    value: "cz",
    label: {
      en: "Czech Republic",
      pl: "Czechy",
    },
  },
  {
    value: "de",
    label: {
      en: "Germany",
      pl: "Niemcy",
    },
  },
  {
    value: "dk",
    label: {
      en: "Denmark",
      pl: "Dania",
    },
  },
  {
    value: "ee",
    label: {
      en: "Estonia",
      pl: "Estonia",
    },
  },
  {
    value: "es",
    label: {
      en: "Spain",
      pl: "Hiszpania",
    },
  },
  {
    value: "fi",
    label: {
      en: "Finland",
      pl: "Finlandia",
    },
  },
  {
    value: "fr",
    label: {
      en: "France",
      pl: "Francja",
    },
  },
  {
    value: "gb",
    label: {
      en: "United Kingdom",
      pl: "Wielka Brytania",
    },
  },
  {
    value: "gr",
    label: {
      en: "Greece",
      pl: "Grecja",
    },
  },
  {
    value: "hr",
    label: {
      en: "Croatia",
      pl: "Chorwacja",
    },
  },
  {
    value: "hu",
    label: {
      en: "Hungary",
      pl: "Węgry",
    },
  },
  {
    value: "ie",
    label: {
      en: "Ireland",
      pl: "Irlandia",
    },
  },
  {
    value: "is",
    label: {
      en: "Iceland",
      pl: "Islandia",
    },
  },
  {
    value: "it",
    label: {
      en: "Italy",
      pl: "Włochy",
    },
  },
  {
    value: "li",
    label: {
      en: "Liechtenstein",
      pl: "Liechtenstein",
    },
  },
  {
    value: "lt",
    label: {
      en: "Lithuania",
      pl: "Litwa",
    },
  },
  {
    value: "lu",
    label: {
      en: "Luxembourg",
      pl: "Luksemburg",
    },
  },
  {
    value: "lv",
    label: {
      en: "Latvia",
      pl: "Łotwa",
    },
  },
  {
    value: "mc",
    label: {
      en: "Monaco",
      pl: "Monako",
    },
  },
  {
    value: "md",
    label: {
      en: "Moldova",
      pl: "Mołdawia",
    },
  },
  {
    value: "me",
    label: {
      en: "Montenegro",
      pl: "Czarnogóra",
    },
  },
  {
    value: "mk",
    label: {
      en: "North Macedonia",
      pl: "Macedonia Północna",
    },
  },
  {
    value: "mt",
    label: {
      en: "Malta",
      pl: "Malta",
    },
  },
  {
    value: "nl",
    label: {
      en: "Netherlands",
      pl: "Holandia",
    },
  },
  {
    value: "no",
    label: {
      en: "Norway",
      pl: "Norwegia",
    },
  },
  {
    value: "pl",
    label: {
      en: "Poland",
      pl: "Polska",
    },
  },
  {
    value: "pt",
    label: {
      en: "Portugal",
      pl: "Portugalia",
    },
  },
  {
    value: "ro",
    label: {
      en: "Romania",
      pl: "Rumunia",
    },
  },
  {
    value: "rs",
    label: {
      en: "Serbia",
      pl: "Serbia",
    },
  },
  {
    value: "ru",
    label: {
      en: "Russia",
      pl: "Rosja",
    },
  },
  {
    value: "se",
    label: {
      en: "Sweden",
      pl: "Szwecja",
    },
  },
  {
    value: "si",
    label: {
      en: "Slovenia",
      pl: "Słowenia",
    },
  },
  {
    value: "sk",
    label: {
      en: "Slovakia",
      pl: "Słowacja",
    },
  },
  {
    value: "sm",
    label: {
      en: "San Marino",
      pl: "San Marino",
    },
  },
  {
    value: "ua",
    label: {
      en: "Ukraine",
      pl: "Ukraina",
    },
  },
  {
    value: "va",
    label: {
      en: "Vatican City",
      pl: "Watykan",
    },
  },
] as const;

export type Country = (typeof countryList)[number]["value"];
