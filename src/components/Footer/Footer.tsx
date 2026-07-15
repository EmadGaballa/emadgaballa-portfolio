import { useTranslation } from 'react-i18next';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-copy">
          &copy; {new Date().getFullYear()}{' '}
          <a
            href="https://www.linkedin.com/in/emad-gaballa/"
            target="_blank"
            rel="noopener"
          >
            Emad M. Gaballa
          </a>
          . {t('footerRights')}
        </p>
        <p className="footer-built">
          {t('footerBuilt')}
        </p>
      </div>
    </footer>
  );
}
