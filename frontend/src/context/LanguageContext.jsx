import React, { createContext, useState, useContext } from "react";

const LanguageContext = createContext();

export const translations = {
  en: {
    // Navbar
    brandName: "Sardar Kartar Singh Jhabbar Trust",
    home: "Home",
    about: "About",
    students: "Students",
    apply: "Apply",
    results: "Results",
    activeStudents: "Active Students",
    donate: "Donate",
    dashboard: "Dashboard",
    login: "Login",
    register: "Register",
    logout: "Logout",
    contact: "Contact",
    languageToggle: "ਪੰਜਾਬੀ",

    // Home
    heroTagline: "Educating the Devout, Empowering the Dedicated — In Spirit, Faith, and Service",
    homeIntroText: "Inspired by the sacred life and legacy of Sardar Kartar Singh Jhabbar Khalsa — the saint-soldier who led the Gurdwara Sudhar Lehar and reclaimed the sanctity of Sikh institutions from Mahants and colonial control — this Trust is founded to keep his spirit of sewa, maryada, and faith-based leadership alive for generations to come.",
    aboutTrustTitle: "About the Trust",
    aboutTrustP1: "The Trust supports families devoted to religious service by promoting education, moral discipline, and community leadership.",
    aboutTrustP2: "Our mission is to help students grow into educated, responsible, and spiritually grounded individuals.",
    whatWeDoTitle: "What We Do",
    eduSupportTitle: "Education Support",
    eduSupportText: "Scholarships and academic support for deserving students.",
    faithDisciplineTitle: "Faith & Discipline",
    faithDisciplineText: "Encouraging spiritual growth rooted in Sikh values.",
    commServiceTitle: "Community Service",
    commServiceText: "Promoting seva, humility, and leadership.",
    coreValuesTitle: "Our Core Values",
    coreValuesSub: "Naam • Kirat • Vand Chhakna",
    coreValuesDesc: "True education is the harmony of knowledge, discipline, and faith.",
    supportMissionTitle: "Support the Mission",
    supportMissionText: "Your contribution helps build a future grounded in values and education.",
    donateNowBtn: "Donate Now",
    contactUsBtn: "Contact Us",

    // Student Target / Onboarding
    academicYear: "Academic Year 2026",
    studentOnboardingTarget: "Student Onboarding Target",
    targetDescription: "Tracking our annual goal for supporting and empowering students this year.",
    overallProgress: "OVERALL PROGRESS",
    achieved: "Achieved",
    yearlyTarget: "YEARLY TARGET",
    enrolledTaken: "ENROLLED / TAKEN",
    remainingTarget: "REMAINING TARGET",
    studentsCountLabel: "Students",

    // Footer
    allRightsReserved: "All rights reserved.",
  },
  pa: {
    // Navbar
    brandName: "ਸਰਦਾਰ ਕਰਤਾਰ ਸਿੰਘ ਝੱਬਰ ਟਰੱਸਟ",
    home: "ਮੁੱਖ ਪੰਨਾ",
    about: "ਸਾਡੇ ਬਾਰੇ",
    students: "ਵਿਦਿਆਰਥੀ",
    apply: "ਅਪਲਾਈ ਕਰੋ",
    results: "ਨਤੀਜੇ",
    activeStudents: "ਸਰਗਰਮ ਵਿਦਿਆਰਥੀ",
    donate: "ਦਾਨ ਕਰੋ",
    dashboard: "ਡੈਸ਼ਬੋਰਡ",
    login: "ਲੌਗਇਨ",
    register: "ਰਜਿਸਟਰ",
    logout: "ਲੌਗਆਊਟ",
    contact: "ਸੰਪਰਕ",
    languageToggle: "English",

    // Home
    heroTagline: "ਸ਼ਰਧਾਵਾਨਾਂ ਨੂੰ ਸਿੱਖਿਅਤ ਕਰਨਾ, ਸਮਰਪਿਤਾਂ ਨੂੰ ਸ਼ਕਤੀਸ਼ਾਲੀ ਬਣਾਉਣਾ — ਰੂਹ, ਸ਼ਰਧਾ ਅਤੇ ਸੇਵਾ ਵਿੱਚ",
    homeIntroText: "ਸਰਦਾਰ ਕਰਤਾਰ ਸਿੰਘ ਝੱਬਰ ਖਾਲਸਾ — ਗੁਰਦੁਆਰਾ ਸੁਧਾਰ ਲਹਿਰ ਦੇ ਮਹਾਨ ਆਗੂ — ਦੇ ਪਵਿੱਤਰ ਜੀਵਨ ਅਤੇ ਵਿਰਾਸਤ ਤੋਂ ਪ੍ਰੇਰਿਤ ਹੋ ਕੇ, ਇਹ ਟਰੱਸਟ ਸੇਵਾ, ਮਰਯਾਦਾ ਅਤੇ ਧਾਰਮਿਕ ਲੀਡਰਸ਼ਿਪ ਦੀ ਭਾਵਨਾ ਨੂੰ ਆਉਣ ਵਾਲੀਆਂ ਪੀੜ੍ਹੀਆਂ ਲਈ ਜਿਉਂਦਾ ਰੱਖਣ ਲਈ ਸਥਾਪਿਤ ਕੀਤਾ ਗਿਆ ਹੈ।",
    aboutTrustTitle: "ਟਰੱਸਟ ਬਾਰੇ",
    aboutTrustP1: "ਇਹ ਟਰੱਸਟ ਸਿੱਖਿਆ, ਅਖਲਾਕੀ ਅਨੁਸ਼ਾਸਨ ਅਤੇ ਸਮਾਜਿਕ ਲੀਡਰਸ਼ਿਪ ਨੂੰ ਉਤਸ਼ਾਹਿਤ ਕਰਕੇ ਧਾਰਮਿਕ ਸੇਵਾ ਵਿੱਚ ਲੱਗੇ ਪਰਿਵਾਰਾਂ ਦੀ ਸਹਾਇਤਾ ਕਰਦਾ ਹੈ।",
    aboutTrustP2: "ਸਾਡਾ ਮਿਸ਼ਨ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਪੜ੍ਹੇ-ਲਿਖੇ, ਜ਼ਿੰਮੇਵਾਰ ਅਤੇ ਗੁਰਮਤਿ ਨਾਲ ਜੁੜੇ ਇਨਸਾਨ ਬਣਾਉਣਾ ਹੈ।",
    whatWeDoTitle: "ਸਾਡੇ ਕਾਰਜ",
    eduSupportTitle: "ਸਿੱਖਿਆ ਸਹਾਇਤਾ",
    eduSupportText: "ਲੋੜਵੰਦ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਵਜ਼ੀਫ਼ੇ ਅਤੇ ਅਕਾਦਮਿਕ ਸਹਾਇਤਾ।",
    faithDisciplineTitle: "ਸ਼ਰਧਾ ਅਤੇ ਅਨੁਸ਼ਾਸਨ",
    faithDisciplineText: "ਸਿੱਖ ਮੁੱਲਾਂ ਵਿੱਚ ਰੂਹਾਨੀ ਵਿਕਾਸ ਨੂੰ ਉਤਸ਼ਾਹਿਤ ਕਰਨਾ।",
    commServiceTitle: "ਸਮਾਜ ਸੇਵਾ",
    commServiceText: "ਸੇਵਾ, ਨਿਮਰਤਾ ਅਤੇ ਲੀਡਰਸ਼ਿਪ ਨੂੰ ਵਧਾਵਾ ਦੇਣਾ।",
    coreValuesTitle: "ਸਾਡੇ ਮੁੱਖ ਮੁੱਲ",
    coreValuesSub: "ਨਾਮ ਜਪੋ • ਕਿਰਤ ਕਰੋ • ਵੰਡ ਛਕੋ",
    coreValuesDesc: "ਸੱਚੀ ਸਿੱਖਿਆ ਗਿਆਨ, ਅਨੁਸ਼ਾਸਨ ਅਤੇ ਸ਼ਰਧਾ ਦਾ ਸੁਮੇਲ ਹੈ।",
    supportMissionTitle: "ਮਿਸ਼ਨ ਦਾ ਸਮਰਥਨ ਕਰੋ",
    supportMissionText: "ਤੁਹਾਡਾ ਯੋਗਦਾਨ ਮੁੱਲਾਂ ਅਤੇ ਸਿੱਖਿਆ 'ਤੇ ਆਧਾਰਿਤ ਭਵਿੱਖ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",
    donateNowBtn: "ਹੁਣੇ ਦਾਨ ਕਰੋ",
    contactUsBtn: "ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",

    // Student Target / Onboarding
    academicYear: "ਅਕਾਦਮਿਕ ਸਾਲ 2026",
    studentOnboardingTarget: "ਵਿਦਿਆਰਥੀ ਸ਼ਾਮਲ ਕਰਨ ਦਾ ਟੀਚਾ",
    targetDescription: "ਇਸ ਸਾਲ ਵਿਦਿਆਰਥੀਆਂ ਦੀ ਸਹਾਇਤਾ ਅਤੇ ਸ਼ਕਤੀਕਰਨ ਲਈ ਸਾਡੇ ਸਾਲਾਨਾ ਟੀਚੇ ਦਾ ਟ੍ਰੈਕ ਰੱਖਣਾ।",
    overallProgress: "ਕੁੱਲ ਪ੍ਰਗਤੀ",
    achieved: "ਹਾਸਲ ਕੀਤਾ",
    yearlyTarget: "ਸਾਲਾਨਾ ਟੀਚਾ",
    enrolledTaken: "ਦਰਜ / ਲਏ ਗਏ",
    remainingTarget: "ਬਾਕੀ ਟੀਚਾ",
    studentsCountLabel: "ਵਿਦਿਆਰਥੀ",

    // Footer
    allRightsReserved: "ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।",
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("app_lang") || "en";
  });

  const toggleLanguage = () => {
    setLang((prev) => {
      const nextLang = prev === "en" ? "pa" : "en";
      localStorage.setItem("app_lang", nextLang);
      return nextLang;
    });
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
