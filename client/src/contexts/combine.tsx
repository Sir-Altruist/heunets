"use client";

import { FC, createElement, ReactNode } from 'react';

type ProviderProps = {
  contexts: FC[];
  children: ReactNode;
};

const combineProviders: FC<ProviderProps> = ({ contexts, children }) => {
  return contexts.reduceRight((acc, Provider: any) => {
    return createElement(Provider, {
      children: acc
    });
    // return <Provider>{acc}</Provider>
  }, children);
};

// const 
export default combineProviders;