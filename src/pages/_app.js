import "@/styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { UiProvider } from "@/context/UiContext/uiContext";
import { TripProvider } from "@/context/TripContext/TripContext";

export default function App({ Component, pageProps }) {
  return (
    <UiProvider>
      <TripProvider>
        <Component {...pageProps} />
      </TripProvider>
    </UiProvider>
  );
}
