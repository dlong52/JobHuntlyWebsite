import { useEffect } from "react";

export default function CrispChat({ email, name }) {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = import.meta.env.VITE_CRISP_ID;
    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (email) {
        window.$crisp.push(["set", "user:email", [email]]);
      }
      if (name) {
        window.$crisp.push(["set", "user:nickname", [name]]);
      }
    };
    window.$crisp.push(["set", "session:language", "vi"]);
    return () => {
      document.head.removeChild(script);
    };
  }, [email, name]);

  return null;
}
