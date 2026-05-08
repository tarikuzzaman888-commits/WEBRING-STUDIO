'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const countries = [
  // ── Priority (shown first) ──
  { code: "BD", name: "Bangladesh",     dial: "+880", flag: "🇧🇩" },
  { code: "IN", name: "India",          dial: "+91",  flag: "🇮🇳" },
  { code: "US", name: "United States",  dial: "+1",   flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dial: "+44",  flag: "🇬🇧" },
  { code: "AE", name: "UAE",            dial: "+971", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia",   dial: "+966", flag: "🇸🇦" },
  { code: "CA", name: "Canada",         dial: "+1",   flag: "🇨🇦" },
  { code: "AU", name: "Australia",      dial: "+61",  flag: "🇦🇺" },
  { code: "SG", name: "Singapore",      dial: "+65",  flag: "🇸🇬" },
  { code: "MY", name: "Malaysia",       dial: "+60",  flag: "🇲🇾" },
  { code: "PK", name: "Pakistan",       dial: "+92",  flag: "🇵🇰" },
  { code: "MV", name: "Maldives",       dial: "+960", flag: "🇲🇻" },
  // ── All others alphabetically ──
  { code: "AF", name: "Afghanistan",    dial: "+93",  flag: "🇦🇫" },
  { code: "AL", name: "Albania",        dial: "+355", flag: "🇦🇱" },
  { code: "DZ", name: "Algeria",        dial: "+213", flag: "🇩🇿" },
  { code: "AR", name: "Argentina",      dial: "+54",  flag: "🇦🇷" },
  { code: "AM", name: "Armenia",        dial: "+374", flag: "🇦🇲" },
  { code: "AT", name: "Austria",        dial: "+43",  flag: "🇦🇹" },
  { code: "AZ", name: "Azerbaijan",     dial: "+994", flag: "🇦🇿" },
  { code: "BH", name: "Bahrain",        dial: "+973", flag: "🇧🇭" },
  { code: "BE", name: "Belgium",        dial: "+32",  flag: "🇧🇪" },
  { code: "BT", name: "Bhutan",         dial: "+975", flag: "🇧🇹" },
  { code: "BO", name: "Bolivia",        dial: "+591", flag: "🇧🇴" },
  { code: "BA", name: "Bosnia",         dial: "+387", flag: "🇧🇦" },
  { code: "BR", name: "Brazil",         dial: "+55",  flag: "🇧🇷" },
  { code: "BN", name: "Brunei",         dial: "+673", flag: "🇧🇳" },
  { code: "BG", name: "Bulgaria",       dial: "+359", flag: "🇧🇬" },
  { code: "KH", name: "Cambodia",       dial: "+855", flag: "🇰🇭" },
  { code: "CM", name: "Cameroon",       dial: "+237", flag: "🇨🇲" },
  { code: "CL", name: "Chile",          dial: "+56",  flag: "🇨🇱" },
  { code: "CN", name: "China",          dial: "+86",  flag: "🇨🇳" },
  { code: "CO", name: "Colombia",       dial: "+57",  flag: "🇨🇴" },
  { code: "HR", name: "Croatia",        dial: "+385", flag: "🇭🇷" },
  { code: "CY", name: "Cyprus",         dial: "+357", flag: "🇨🇾" },
  { code: "CZ", name: "Czech Republic", dial: "+420", flag: "🇨🇿" },
  { code: "DK", name: "Denmark",        dial: "+45",  flag: "🇩🇰" },
  { code: "EC", name: "Ecuador",        dial: "+593", flag: "🇪🇨" },
  { code: "EG", name: "Egypt",          dial: "+20",  flag: "🇪🇬" },
  { code: "EE", name: "Estonia",        dial: "+372", flag: "🇪🇪" },
  { code: "ET", name: "Ethiopia",       dial: "+251", flag: "🇪🇹" },
  { code: "FI", name: "Finland",        dial: "+358", flag: "🇫🇮" },
  { code: "FR", name: "France",         dial: "+33",  flag: "🇫🇷" },
  { code: "GE", name: "Georgia",        dial: "+995", flag: "🇬🇪" },
  { code: "DE", name: "Germany",        dial: "+49",  flag: "🇩🇪" },
  { code: "GH", name: "Ghana",          dial: "+233", flag: "🇬🇭" },
  { code: "GR", name: "Greece",         dial: "+30",  flag: "🇬🇷" },
  { code: "HK", name: "Hong Kong",      dial: "+852", flag: "🇭🇰" },
  { code: "HU", name: "Hungary",        dial: "+36",  flag: "🇭🇺" },
  { code: "IS", name: "Iceland",        dial: "+354", flag: "🇮🇸" },
  { code: "ID", name: "Indonesia",      dial: "+62",  flag: "🇮🇩" },
  { code: "IR", name: "Iran",           dial: "+98",  flag: "🇮🇷" },
  { code: "IQ", name: "Iraq",           dial: "+964", flag: "🇮🇶" },
  { code: "IE", name: "Ireland",        dial: "+353", flag: "🇮🇪" },
  { code: "IL", name: "Israel",         dial: "+972", flag: "🇮🇱" },
  { code: "IT", name: "Italy",          dial: "+39",  flag: "🇮🇹" },
  { code: "JP", name: "Japan",          dial: "+81",  flag: "🇯🇵" },
  { code: "JO", name: "Jordan",         dial: "+962", flag: "🇯🇴" },
  { code: "KZ", name: "Kazakhstan",     dial: "+7",   flag: "🇰🇿" },
  { code: "KE", name: "Kenya",          dial: "+254", flag: "🇰🇪" },
  { code: "KW", name: "Kuwait",         dial: "+965", flag: "🇰🇼" },
  { code: "KG", name: "Kyrgyzstan",     dial: "+996", flag: "🇰🇬" },
  { code: "LA", name: "Laos",           dial: "+856", flag: "🇱🇦" },
  { code: "LV", name: "Latvia",         dial: "+371", flag: "🇱🇻" },
  { code: "LB", name: "Lebanon",        dial: "+961", flag: "🇱🇧" },
  { code: "LY", name: "Libya",          dial: "+218", flag: "🇱🇾" },
  { code: "LT", name: "Lithuania",      dial: "+370", flag: "🇱🇹" },
  { code: "LU", name: "Luxembourg",     dial: "+352", flag: "🇱🇺" },
  { code: "MO", name: "Macau",          dial: "+853", flag: "🇲🇴" },
  { code: "MG", name: "Madagascar",     dial: "+261", flag: "🇲🇬" },
  { code: "MW", name: "Malawi",         dial: "+265", flag: "🇲🇼" },
  { code: "ML", name: "Mali",           dial: "+223", flag: "🇲🇱" },
  { code: "MT", name: "Malta",          dial: "+356", flag: "🇲🇹" },
  { code: "MU", name: "Mauritius",      dial: "+230", flag: "🇲🇺" },
  { code: "MX", name: "Mexico",         dial: "+52",  flag: "🇲🇽" },
  { code: "MD", name: "Moldova",        dial: "+373", flag: "🇲🇩" },
  { code: "MN", name: "Mongolia",       dial: "+976", flag: "🇲🇳" },
  { code: "MA", name: "Morocco",        dial: "+212", flag: "🇲🇦" },
  { code: "MZ", name: "Mozambique",     dial: "+258", flag: "🇲🇿" },
  { code: "MM", name: "Myanmar",        dial: "+95",  flag: "🇲🇲" },
  { code: "NP", name: "Nepal",          dial: "+977", flag: "🇳🇵" },
  { code: "NL", name: "Netherlands",    dial: "+31",  flag: "🇳🇱" },
  { code: "NZ", name: "New Zealand",    dial: "+64",  flag: "🇳🇿" },
  { code: "NG", name: "Nigeria",        dial: "+234", flag: "🇳🇬" },
  { code: "NO", name: "Norway",         dial: "+47",  flag: "🇳🇴" },
  { code: "OM", name: "Oman",           dial: "+968", flag: "🇴🇲" },
  { code: "PA", name: "Panama",         dial: "+507", flag: "🇵🇦" },
  { code: "PY", name: "Paraguay",       dial: "+595", flag: "🇵🇾" },
  { code: "PE", name: "Peru",           dial: "+51",  flag: "🇵🇪" },
  { code: "PH", name: "Philippines",    dial: "+63",  flag: "🇵🇭" },
  { code: "PL", name: "Poland",         dial: "+48",  flag: "🇵🇱" },
  { code: "PT", name: "Portugal",       dial: "+351", flag: "🇵🇹" },
  { code: "QA", name: "Qatar",          dial: "+974", flag: "🇶🇦" },
  { code: "RO", name: "Romania",        dial: "+40",  flag: "🇷🇴" },
  { code: "RU", name: "Russia",         dial: "+7",   flag: "🇷🇺" },
  { code: "RW", name: "Rwanda",         dial: "+250", flag: "🇷🇼" },
  { code: "SN", name: "Senegal",        dial: "+221", flag: "🇸🇳" },
  { code: "RS", name: "Serbia",         dial: "+381", flag: "🇷🇸" },
  { code: "SK", name: "Slovakia",       dial: "+421", flag: "🇸🇰" },
  { code: "SI", name: "Slovenia",       dial: "+386", flag: "🇸🇮" },
  { code: "SO", name: "Somalia",        dial: "+252", flag: "🇸🇴" },
  { code: "ZA", name: "South Africa",   dial: "+27",  flag: "🇿🇦" },
  { code: "KR", name: "South Korea",    dial: "+82",  flag: "🇰🇷" },
  { code: "ES", name: "Spain",          dial: "+34",  flag: "🇪🇸" },
  { code: "LK", name: "Sri Lanka",      dial: "+94",  flag: "🇱🇰" },
  { code: "SD", name: "Sudan",          dial: "+249", flag: "🇸🇩" },
  { code: "SE", name: "Sweden",         dial: "+46",  flag: "🇸🇪" },
  { code: "CH", name: "Switzerland",    dial: "+41",  flag: "🇨🇭" },
  { code: "SY", name: "Syria",          dial: "+963", flag: "🇸🇾" },
  { code: "TW", name: "Taiwan",         dial: "+886", flag: "🇹🇼" },
  { code: "TJ", name: "Tajikistan",     dial: "+992", flag: "🇹🇯" },
  { code: "TZ", name: "Tanzania",       dial: "+255", flag: "🇹🇿" },
  { code: "TH", name: "Thailand",       dial: "+66",  flag: "🇹🇭" },
  { code: "TN", name: "Tunisia",        dial: "+216", flag: "🇹🇳" },
  { code: "TR", name: "Turkey",         dial: "+90",  flag: "🇹🇷" },
  { code: "TM", name: "Turkmenistan",   dial: "+993", flag: "🇹🇲" },
  { code: "UG", name: "Uganda",         dial: "+256", flag: "🇺🇬" },
  { code: "UA", name: "Ukraine",        dial: "+380", flag: "🇺🇦" },
  { code: "UZ", name: "Uzbekistan",     dial: "+998", flag: "🇺🇿" },
  { code: "VE", name: "Venezuela",      dial: "+58",  flag: "🇻🇪" },
  { code: "VN", name: "Vietnam",        dial: "+84",  flag: "🇻🇳" },
  { code: "YE", name: "Yemen",          dial: "+967", flag: "🇾🇪" },
  { code: "ZM", name: "Zambia",         dial: "+260", flag: "🇿🇲" },
  { code: "ZW", name: "Zimbabwe",       dial: "+263", flag: "🇿🇼" },
];

const phoneRules: Record<string, { min: number; max: number; label: string }> = {
  BD: { min: 10, max: 11, label: "10-11 digits" },
  IN: { min: 10, max: 10, label: "10 digits" },
  US: { min: 10, max: 10, label: "10 digits" },
  CA: { min: 10, max: 10, label: "10 digits" },
  GB: { min: 10, max: 10, label: "10 digits" },
  AU: { min: 9,  max: 9,  label: "9 digits" },
  AE: { min: 9,  max: 9,  label: "9 digits" },
  SA: { min: 9,  max: 9,  label: "9 digits" },
  SG: { min: 8,  max: 8,  label: "8 digits" },
  MY: { min: 9,  max: 10, label: "9-10 digits" },
  PK: { min: 10, max: 11, label: "10-11 digits" },
  MV: { min: 7,  max: 7,  label: "7 digits" },
  CN: { min: 11, max: 11, label: "11 digits" },
  JP: { min: 10, max: 11, label: "10-11 digits" },
  KR: { min: 9,  max: 10, label: "9-10 digits" },
  ID: { min: 9,  max: 12, label: "9-12 digits" },
  PH: { min: 10, max: 10, label: "10 digits" },
  VN: { min: 9,  max: 10, label: "9-10 digits" },
  TH: { min: 9,  max: 9,  label: "9 digits" },
  MM: { min: 9,  max: 10, label: "9-10 digits" },
  KH: { min: 8,  max: 9,  label: "8-9 digits" },
  LK: { min: 9,  max: 9,  label: "9 digits" },
  NP: { min: 10, max: 10, label: "10 digits" },
  BT: { min: 8,  max: 8,  label: "8 digits" },
  DE: { min: 10, max: 11, label: "10-11 digits" },
  FR: { min: 9,  max: 9,  label: "9 digits" },
  IT: { min: 9,  max: 10, label: "9-10 digits" },
  ES: { min: 9,  max: 9,  label: "9 digits" },
  NL: { min: 9,  max: 9,  label: "9 digits" },
  PT: { min: 9,  max: 9,  label: "9 digits" },
  BE: { min: 9,  max: 9,  label: "9 digits" },
  CH: { min: 9,  max: 9,  label: "9 digits" },
  AT: { min: 10, max: 13, label: "10-13 digits" },
  SE: { min: 9,  max: 9,  label: "9 digits" },
  NO: { min: 8,  max: 8,  label: "8 digits" },
  DK: { min: 8,  max: 8,  label: "8 digits" },
  FI: { min: 9,  max: 10, label: "9-10 digits" },
  PL: { min: 9,  max: 9,  label: "9 digits" },
  CZ: { min: 9,  max: 9,  label: "9 digits" },
  HU: { min: 9,  max: 9,  label: "9 digits" },
  RO: { min: 10, max: 10, label: "10 digits" },
  BG: { min: 9,  max: 9,  label: "9 digits" },
  HR: { min: 8,  max: 9,  label: "8-9 digits" },
  SK: { min: 9,  max: 9,  label: "9 digits" },
  SI: { min: 8,  max: 8,  label: "8 digits" },
  RS: { min: 9,  max: 9,  label: "9 digits" },
  GR: { min: 10, max: 10, label: "10 digits" },
  RU: { min: 10, max: 10, label: "10 digits" },
  UA: { min: 9,  max: 9,  label: "9 digits" },
  TR: { min: 10, max: 10, label: "10 digits" },
  IL: { min: 9,  max: 9,  label: "9 digits" },
  IR: { min: 10, max: 10, label: "10 digits" },
  IQ: { min: 10, max: 10, label: "10 digits" },
  JO: { min: 9,  max: 9,  label: "9 digits" },
  KW: { min: 8,  max: 8,  label: "8 digits" },
  QA: { min: 8,  max: 8,  label: "8 digits" },
  OM: { min: 8,  max: 8,  label: "8 digits" },
  BH: { min: 8,  max: 8,  label: "8 digits" },
  LB: { min: 7,  max: 8,  label: "7-8 digits" },
  SY: { min: 9,  max: 9,  label: "9 digits" },
  EG: { min: 10, max: 10, label: "10 digits" },
  LY: { min: 9,  max: 9,  label: "9 digits" },
  TN: { min: 8,  max: 8,  label: "8 digits" },
  MA: { min: 9,  max: 9,  label: "9 digits" },
  DZ: { min: 9,  max: 9,  label: "9 digits" },
  NG: { min: 8,  max: 8,  label: "8 digits" },
  GH: { min: 9,  max: 9,  label: "9 digits" },
  KE: { min: 9,  max: 9,  label: "9 digits" },
  ET: { min: 9,  max: 9,  label: "9 digits" },
  TZ: { min: 9,  max: 9,  label: "9 digits" },
  UG: { min: 9,  max: 9,  label: "9 digits" },
  ZA: { min: 9,  max: 9,  label: "9 digits" },
  ZM: { min: 9,  max: 9,  label: "9 digits" },
  ZW: { min: 9,  max: 9,  label: "9 digits" },
  RW: { min: 9,  max: 9,  label: "9 digits" },
  SD: { min: 9,  max: 9,  label: "9 digits" },
  SN: { min: 9,  max: 9,  label: "9 digits" },
  CM: { min: 9,  max: 9,  label: "9 digits" },
  MZ: { min: 9,  max: 9,  label: "9 digits" },
  MG: { min: 9,  max: 9,  label: "9 digits" },
  SO: { min: 8,  max: 9,  label: "8-9 digits" },
  AF: { min: 9,  max: 9,  label: "9 digits" },
  KZ: { min: 10, max: 10, label: "10 digits" },
  UZ: { min: 9,  max: 9,  label: "9 digits" },
  KG: { min: 9,  max: 9,  label: "9 digits" },
  TJ: { min: 9,  max: 9,  label: "9 digits" },
  TM: { min: 8,  max: 8,  label: "8 digits" },
  AZ: { min: 9,  max: 9,  label: "9 digits" },
  AM: { min: 8,  max: 8,  label: "8 digits" },
  GE: { min: 9,  max: 9,  label: "9 digits" },
  MX: { min: 10, max: 10, label: "10 digits" },
  CO: { min: 10, max: 10, label: "10 digits" },
  BR: { min: 10, max: 11, label: "10-11 digits" },
  AR: { min: 10, max: 11, label: "10-11 digits" },
  CL: { min: 9,  max: 9,  label: "9 digits" },
  PE: { min: 9,  max: 9,  label: "9 digits" },
  EC: { min: 9,  max: 9,  label: "9 digits" },
  BO: { min: 8,  max: 8,  label: "8 digits" },
  PY: { min: 9,  max: 9,  label: "9 digits" },
  VE: { min: 10, max: 10, label: "10 digits" },
  PA: { min: 8,  max: 8,  label: "8 digits" },
  NZ: { min: 8,  max: 10, label: "8-10 digits" },
  HK: { min: 8,  max: 8,  label: "8 digits" },
  MO: { min: 8,  max: 8,  label: "8 digits" },
  TW: { min: 9,  max: 9,  label: "9 digits" },
  IS: { min: 7,  max: 7,  label: "7 digits" },
  IE: { min: 9,  max: 9,  label: "9 digits" },
  LU: { min: 9,  max: 9,  label: "9 digits" },
  LV: { min: 8,  max: 8,  label: "8 digits" },
  LT: { min: 8,  max: 8,  label: "8 digits" },
  EE: { min: 7,  max: 8,  label: "7-8 digits" },
  CY: { min: 8,  max: 8,  label: "8 digits" },
  MT: { min: 8,  max: 8,  label: "8 digits" },
  AL: { min: 9,  max: 9,  label: "9 digits" },
  BA: { min: 8,  max: 8,  label: "8 digits" },
  MD: { min: 8,  max: 8,  label: "8 digits" },
  BN: { min: 7,  max: 7,  label: "7 digits" },
  MN: { min: 8,  max: 8,  label: "8 digits" },
  MU: { min: 8,  max: 8,  label: "8 digits" },
  YE: { min: 9,  max: 9,  label: "9 digits" },
};

const DEFAULT_RULE = { min: 6, max: 15, label: "6-15 digits" };

interface PhoneInputProps {
  value: string;
  onChange: (fullNumber: string) => void;
  id?: string;
  className?: string;
  error?: string;
}

export default function PhoneInput({ value, onChange, id, className }: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isBlurred, setIsBlurred] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const rule = useMemo(() => phoneRules[selectedCountry.code] || DEFAULT_RULE, [selectedCountry]);

  // Sync internal state with external value if provided
  useEffect(() => {
    if (value) {
      const dialCode = selectedCountry.dial;
      if (value.startsWith(dialCode)) {
        setPhoneNumber(value.replace(dialCode, ''));
      }
    }
  }, [value, selectedCountry.dial]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountries = useMemo(() => {
    const search = searchTerm.toLowerCase();
    const result = countries.filter(c => 
      c.name.toLowerCase().includes(search) || 
      c.dial.includes(search) ||
      c.code.toLowerCase().includes(search)
    );
    return result;
  }, [searchTerm]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, rule.max);
    setPhoneNumber(digits);
    onChange(`${selectedCountry.dial}${digits}`);
  };

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    setPhoneNumber('');
    onChange('');
    setIsOpen(false);
    setSearchTerm('');
    setTimeout(() => phoneInputRef.current?.focus(), 0);
  };

  const isValid = phoneNumber.length >= rule.min && phoneNumber.length <= rule.max;
  const isTooShort = isBlurred && phoneNumber.length > 0 && phoneNumber.length < rule.min;

  const borderColor = isTooShort 
    ? '#EF4444' 
    : isValid 
      ? '#22C55E' 
      : 'var(--border)';

  return (
    <div className={cn("space-y-2", className)}>
      <div 
        className="flex h-[56px] w-full rounded-xl border bg-[var(--bg)] transition-all duration-300"
        style={{ borderColor }}
      >
        {/* Country Selector */}
        <div className="relative border-r border-[var(--border)]" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-full items-center gap-2 px-4 hover:bg-[var(--surface)] transition-colors rounded-l-xl"
          >
            <span className="text-xl">{selectedCountry.flag}</span>
            <span className="text-sm font-medium text-[var(--text)]">{selectedCountry.dial}</span>
            <ChevronDown className={cn("w-4 h-4 text-[var(--muted)] transition-transform", isOpen && "rotate-180")} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 z-[60] mt-2 w-[280px] rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-2xl overflow-hidden"
              >
                {/* Search */}
                <div className="sticky top-0 p-3 bg-[var(--bg)] border-b border-[var(--border)]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
                    <input
                      type="text"
                      placeholder="Search country or code.."
                      className="w-full bg-[var(--surface)] pl-9 pr-4 py-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[var(--accent)]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>

                {/* List */}
                <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                  {/* Priority Label */}
                  {searchTerm === '' && (
                    <div className="px-4 py-2 text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest bg-[var(--surface)]/50">
                      Countries
                    </div>
                  )}

                  {filteredCountries.map((c, i) => (
                    <button
                      key={`${c.code}-${i}`}
                      type="button"
                      onClick={() => handleCountrySelect(c)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 hover:bg-[var(--surface)] transition-colors text-left",
                        selectedCountry.code === c.code && "bg-[var(--accent)]/5"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{c.flag}</span>
                        <div>
                          <p className="text-sm font-medium text-[var(--text)]">{c.name}</p>
                          <p className="text-[10px] text-[var(--muted)]">{c.dial}</p>
                        </div>
                      </div>
                      {selectedCountry.code === c.code && (
                        <Check className="w-4 h-4 text-[var(--accent)]" />
                      )}
                    </button>
                  ))}

                  {filteredCountries.length === 0 && (
                    <div className="p-4 text-center text-sm text-[var(--muted)]">
                      No countries found
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Phone Input */}
        <div className="relative flex-1">
          <input
            ref={phoneInputRef}
            id={id}
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            onBlur={() => setIsBlurred(true)}
            placeholder="01XXXXXXXXX"
            className="h-full w-full bg-transparent px-4 py-2 text-base outline-none text-[var(--text)]"
          />
          
          {/* Counter */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <span className={cn(
              "text-[10px] font-mono",
              isValid ? "text-[#22C55E]" : "text-[var(--muted)]"
            )}>
              {phoneNumber.length} / {rule.max}
            </span>
          </div>
        </div>
      </div>

      {isTooShort && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-[#EF4444] font-medium"
        >
          {selectedCountry.name} numbers must be {rule.label}
        </motion.p>
      )}
    </div>
  );
}
