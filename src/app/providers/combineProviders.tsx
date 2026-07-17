import { FavoritesProvider } from "../context/favoritesContext";
import { LogsProvider } from "../context/logsContext";
import { ThemeProvider } from "./ThemeProvider";

const CombineProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <FavoritesProvider>
        <LogsProvider>{children}</LogsProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export default CombineProviders;
