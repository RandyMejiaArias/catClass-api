import { AppRouter } from "./router/AppRouter";
import { AppTheme } from './theme/AppTheme';

export const CatClassApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
}
