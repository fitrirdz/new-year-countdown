import "@/styles/sky.css";
import "@/styles/fireworks.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
