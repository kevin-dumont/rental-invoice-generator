import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";

type AppOptions = {
  initialRouteEntries: MemoryRouterProps["initialEntries"];
};

// eslint-disable-next-line react-refresh/only-export-components
const getAllTheProviders =
  (options?: AppOptions) =>
  ({ children }: { children: React.ReactNode }) => {
    return (
      <MemoryRouter initialEntries={options?.initialRouteEntries}>
        {children}
      </MemoryRouter>
    );
  };

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
  appOptions?: AppOptions
) => render(ui, { wrapper: getAllTheProviders(appOptions), ...options });

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";

export { customRender as render };
