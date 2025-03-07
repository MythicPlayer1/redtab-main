import React from "react";
import ReactDOM from "react-dom/client";
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import App from "./App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  // .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

// // This variable will save the event for later use.
// let deferredPrompt;
// window.addEventListener('beforeinstallprompt', (e) => {
//   // Prevents the default mini-infobar or install dialog from appearing on mobile
//   e.preventDefault();
//   // Save the event because you'll need to trigger it later.
//   deferredPrompt = e;
//   // Show your customized install prompt for your PWA
//   // Your own UI doesn't have to be a single element, you
//   // can have buttons in different locations, or wait to prompt
//   // as part of a critical journey.
//   // showInAppInstallPromotion();
// });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n} defaultNS={"translation"}>
      <ToastContainer />
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
