import { useState, useEffect } from 'react';
import { isAfter, formatDistanceStrict } from 'date-fns';
import * as esLocale from 'date-fns/locale/es/index.js';

export default function useTime(dateToCompare) {
  const [isMajor, setIsMajor] = useState(false);
  const [distance, setDistance] = useState('');

  useEffect(() => {
    let clock = setInterval(() => {
      setIsMajor(isAfter(new Date(), dateToCompare));
      setDistance(formatDistanceStrict(new Date(), dateToCompare, {includeSeconds: true, locale: esLocale}));
    }, 1000);
    if (isMajor) {
      clearInterval(clock);
    }
  }, [dateToCompare, isMajor]);

  return [isMajor, distance];
}