"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const useAddQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const addQueryParams = (newParams) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.keys(newParams).forEach((key) => {
      params.set(key, newParams[key]);
    });

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  return addQueryParams;
};
