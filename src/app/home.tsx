import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import MapContainer from "@/components/MapContainer";
import MapLegend from "@/components/MapLegend";
import FilterChips from "@/components/FilterChips";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { buscarUnidades } from "@/services/unidades";

export default function Home() {
    useEffect(() => {
        async function carregar() {
            try {
                const dados = await buscarUnidades();
                console.log("SUPABASE:", dados);
            } catch (error) {
                console.error(error);
            }
        }

        carregar();
    }, []);
    return (
        <SafeAreaView className="flex-1 bg-slate-100">
            <Header />

            <MapLegend />

            <FilterChips />

            <MapContainer />

            <BottomNavigation />
        </SafeAreaView>
    );
}
