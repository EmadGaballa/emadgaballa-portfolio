import { useTranslation } from 'react-i18next';
import './SectionIntro.css';

interface Props {
  labelKey?: string;
  ns?: string;
  label?: string;
  className?: string;
}

export default function SectionIntro({ labelKey, ns = 'common', label, className = '' }: Props) {
  const { t } = useTranslation(ns);
  const displayLabel = labelKey ? t(labelKey) : label || '';

  if (!displayLabel) return null;

  return (
    <div className={`section-intro ${className}`}>
      <span className="section-intro-label">{displayLabel}</span>
    </div>
  );
}