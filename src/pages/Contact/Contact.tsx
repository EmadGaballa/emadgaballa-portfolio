import { useTranslation } from 'react-i18next';
import PageTransition from '@/components/PageTransition/PageTransition';
import SectionIntro from '@/components/SectionIntro/SectionIntro';
import { portfolioData } from '@/data/portfolio';
import './Contact.css';

export default function Contact() {
  const { t } = useTranslation('contact');

  const links = [
    { icon: '✉', label: 'email', value: portfolioData.email, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.email}` },
    { icon: 'ln', label: 'LinkedIn', value: 'LinkedIn', href: portfolioData.linkedin },
    { icon: '⌥', label: 'GitHub', value: 'GitHub', href: portfolioData.github },
    { icon: 'N', label: 'phone', value: portfolioData.phone, href: `tel:${portfolioData.phone}` },
    { icon: 'CV', label: 'downloadResume', value: 'My Resume', href: portfolioData.resume },
  ];

  return (
    <PageTransition>
      <section className="contact-page">
        <div className="contact-bg" />
        <div className="container">
          <SectionIntro labelKey="label" ns="contact" className="contact-label-align" />
          <h2
            className="contact-heading"
            dangerouslySetInnerHTML={{ __html: t('heading') }}
          />
          <div className="separator" />
          <a
            href={portfolioData.whatsapp}
            target="_blank"
            rel="noopener"
            className="btn-primary"
          >
            {t('sayHello')} ↗
          </a>
          <p className="contact-sub">{t('subtitle')}</p>
          <div className="contact-links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener"
                className="contact-link"
              >
                <span>{link.icon}</span> {t(link.label)}
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}