import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageTransition from '@/components/PageTransition/PageTransition';
import './NotFound.css';

export default function NotFound() {
  const { t } = useTranslation('common');

  return (
    <PageTransition>
      <section className="not-found-page">
        <div className="container not-found-content">
          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title heading-2">{t('notFound')}</h2>
          <p className="not-found-desc body-base">{t('notFoundDesc')}</p>
          <Link to="/" className="btn-primary">
            {t('backHome')} ←
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}