"use client"
import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const loadChatbase = () => {
      if (
        !window.chatbase ||
        window.chatbase("getState") !== "initialized"
      ) {
        window.chatbase = (...args) => {
          if (!window.chatbase.q) {
            window.chatbase.q = [];
          }
          window.chatbase.q.push(args);
        };

        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if (prop === "q") return target.q;
            return (...args) => target(prop, ...args);
          },
        });
      }

      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "mLm_UB1CopPBfVWEu4Z2S"; // Your unique Chatbase bot ID
      script.domain = "www.chatbase.co";
      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      loadChatbase();
    } else {
      window.addEventListener("load", loadChatbase);
    }

    // Cleanup
    return () => {
      const oldScript = document.getElementById("mLm_UB1CopPBfVWEu4Z2S");
      if (oldScript) {
        document.body.removeChild(oldScript);
      }
    };
  }, []);

  return (
    <div>
      {/* You can add a placeholder or label if needed */}
      <h2>Need help? Chat with us!</h2>
    </div>
  );
};

export default Chatbot;
