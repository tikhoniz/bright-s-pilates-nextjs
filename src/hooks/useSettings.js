import { useContext } from "react";
import { SettingsContext } from "../components/contexts/SettingsContext";

// ----------------------------------------------------------------------

const useSettings = () => useContext(SettingsContext);

export default useSettings;
