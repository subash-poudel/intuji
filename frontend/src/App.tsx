import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MyCalendar from "./components/MyCalendar";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyCalendar />;
    </QueryClientProvider>
  );
}

export default App;