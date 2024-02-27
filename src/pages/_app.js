import "@/styles/globals.css";
import 'mapbox-gl/dist/mapbox-gl.css';

import { UiProvider } from "@/context/UiContext/uiContext";

export default function App({ Component, pageProps }) {
  return (
    <UiProvider>
      <Component {...pageProps} />
    </UiProvider>
  );
}
