import React, { useEffect, useState, Suspense } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Desktop1 from "./pages/Desktop1";
import Items from "./pages/Items";

const WebsiteIntro = React.lazy(() => import("./components/WebsiteIntro"));

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname === "/";
    }
    return false;
  });
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <Suspense fallback={null}>
            <WebsiteIntro onClose={() => setShowIntro(false)} />
          </Suspense>
        )}
      </AnimatePresence>
      <Routes>
        <Route path="/" element={<Desktop1 />} />
        <Route path="/items" element={<Items />} />
      </Routes>
    </>
  );
}
export default App;

