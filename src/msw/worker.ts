import { type SetupServerApi, setupServer } from 'msw/node';
import { handlers } from './handlers';

export const worker: SetupServerApi = setupServer(...handlers);
