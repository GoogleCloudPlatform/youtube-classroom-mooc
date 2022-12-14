import { Link, useMatch } from 'react-router-dom'
import { useTranslation } from 'next-i18next'

import { classNames } from '@/utils/dom'
import { INavigationItem } from '@/utils/types'

const Footer = ({ routes }: { routes: INavigationItem[] }) => {
  const { t } = useTranslation()
  
  return (
    <footer className="bg-base-100">
      <div className="mx-auto py-8 px-4 overflow-hidden">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          {routes.map((item) => (
            <Link to={item.href} key={item.name}
              className={classNames(
                useMatch(item.href)
                  ? 'border-primary'
                  : 'border-transparent hover:border-base-300 text-faint hover:text-normal',
                'text-base-content border-b text-base px-2 py-1 mx-2 my-1',
              )}>
              {t(item.name)}
            </Link>
          ))}
          <a href="mailto:gps-demo-factory@google.com" rel="noopener" target="_blank"
            className="border-transparent hover:border-base-300 text-faint hover:text-normal text-base-content border-b text-base px-2 py-1 mx-2 my-1"
          >
            {t('link-contact-us')}
          </a>
        </nav>
      <p className="mt-4 text-center text-sm text-base-content">Google &copy; {new Date().getFullYear()}. {t('copyright')}</p>
    </div>
  </footer>
  )
}

export default Footer
