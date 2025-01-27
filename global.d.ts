import en from './messages/en.json';

type Messages = typeof en;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
declare interface IntlMessages extends Messages {}
