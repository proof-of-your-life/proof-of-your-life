import { Signal, WritableSignal } from '@angular/core';

export const isWritableSignal = <T>(
  signal: Signal<T> | WritableSignal<T>,
): signal is WritableSignal<T> => {
  return (signal as WritableSignal<T>).set !== undefined;
};
