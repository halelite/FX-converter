import { FavoritesProvider } from "../context/favoritesContext";
import { LogsProvider } from "../context/logsContext";

const CombineProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <FavoritesProvider>
      <LogsProvider>{children}</LogsProvider>
    </FavoritesProvider>
  );
};

export default CombineProviders;
