import { createContainer, asClass, InjectionMode } from "awilix";

import { InvoiceScreenViewModel } from "application/components/business/InvoiceScreen/view-model";
import { ComputePrices } from "domain/invoice/use-cases/compute-prices";
import { InvoiceInMemoryRepository } from "infrastructure/invoice/invoice-in-memory-repository";
import { Login } from "domain/auth/use-cases/login";
import { Logout } from "domain/auth/use-cases/logout";
import { AuthenticationLocalStorageRepository } from "infrastructure/authentication/authentication-local-storage-repository";
import { LoginScreenViewModel } from "application/components/business/LoginScreen/view-model";
import { ILogout } from "domain/auth/use-cases/interfaces/logout";
import { ILogin } from "domain/auth/use-cases/interfaces/login";
import { IComputePrices } from "domain/invoice/use-cases/interfaces/compute-prices";
import { AuthenticationRepository } from "domain/auth/repository/authentication";
import { InvoiceRepository } from "domain/invoice/repository/invoice-adapter";
import { IGetAuthState } from "domain/auth/use-cases/interfaces/get-auth-state";
import { GetAuthState } from "domain/auth/use-cases/get-auth-state";

export const container = createContainer<{
  computePrices: IComputePrices;
  login: ILogin;
  logout: ILogout;
  getAuthState: IGetAuthState;
  authenticationRepository: AuthenticationRepository;
  invoiceRepository: InvoiceRepository;
  invoiceScreenViewModel: InvoiceScreenViewModel;
  loginScreenViewModel: LoginScreenViewModel;
}>({
  injectionMode: InjectionMode.PROXY,
  strict: true,
});

container.register({
  computePrices: asClass(ComputePrices),
  login: asClass(Login),
  logout: asClass(Logout),
  getAuthState: asClass(GetAuthState),
  authenticationRepository: asClass(AuthenticationLocalStorageRepository),
  invoiceRepository: asClass(InvoiceInMemoryRepository),
  invoiceScreenViewModel: asClass(InvoiceScreenViewModel),
  loginScreenViewModel: asClass(LoginScreenViewModel),
});
