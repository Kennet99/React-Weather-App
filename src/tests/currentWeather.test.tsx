// import { describe, it, expect } from "vitest";
import CurrentWeather from "../components/cards/CurrentWeather";
// import { render } from "vitest-browser-react/pure";
import { render } from "vitest-browser-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("CurrentWeather", () => {
  it("should render the current weather card at coordinates 0, 0", () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const weatherCard = render(
      <QueryClientProvider client={queryClient}>
        <CurrentWeather title="Current Weather" coords={{ lat: 0, lon: 0 }} />
      </QueryClientProvider>,
    );
    expect(weatherCard).toBeTruthy();
  });
});
