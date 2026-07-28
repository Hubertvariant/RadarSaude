import { useEffect, useState } from "react";
import * as Location from "expo-location";

export function useLocation() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const { status } =
          await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setLoading(false);
          return;
        }

        const posicao =
          await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });

        setLocation(posicao.coords);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  return {
    location,
    loading,
  };
}
