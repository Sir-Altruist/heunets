"use client";

import { FC, createElement, ReactNode } from 'react';

type ProviderProps = {
  contexts: FC[];
  children: ReactNode;
};

const combineProviders: FC<ProviderProps> = ({ contexts, children }) => {
  return contexts.reduceRight((acc, Provider) => {
    return createElement(Provider, null, acc);
  }, children);
};

export default combineProviders;
