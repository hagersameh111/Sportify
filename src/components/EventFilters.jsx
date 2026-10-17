import { useMemo, useState } from 'react';

const select =
  'h-9 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-700 outline-none transition-colors hover:border-zinc-300 focus:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-200';

export function useEventFilters(events) {
  const [country, setCountryState] = useState('All countries');
  const [city, setCity] = useState('All cities');
  const [price, setPrice] = useState('Any price');

  const countries = useMemo(() => [...new Set(events.map((e) => e.country).filter(Boolean))], [events]);
  const cities = useMemo(
    () => [...new Set(events.filter((e) => country === 'All countries' || e.country === country).map((e) => e.city).filter(Boolean))],
    [events, country]
  );

  const matches = (e) =>
    (country === 'All countries' || e.country === country) &&
    (city === 'All cities' || e.city === city) &&
    (price === 'Any price' || (price === 'Free' ? !e.price : Boolean(e.price)));

  return {
    country, city, price, countries, cities, matches, setCity, setPrice,
    setCountry: (value) => { setCountryState(value); setCity('All cities'); },
  };
}

export default function EventFilters({ filters: f }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select aria-label="Filter by country" value={f.country} onChange={(e) => f.setCountry(e.target.value)} className={select}>
        <option>All countries</option>
        {f.countries.map((v) => <option key={v}>{v}</option>)}
      </select>
      <select aria-label="Filter by city" value={f.city} onChange={(e) => f.setCity(e.target.value)} className={select}>
        <option>All cities</option>
        {f.cities.map((v) => <option key={v}>{v}</option>)}
      </select>
      <select aria-label="Filter by price" value={f.price} onChange={(e) => f.setPrice(e.target.value)} className={select}>
        <option>Any price</option>
        <option>Free</option>
        <option>Paid</option>
      </select>
    </div>
  );
}
