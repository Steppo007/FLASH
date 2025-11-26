import { useState } from 'react';
import KText from '@root/src/components/misc/ktext';
import KAppWithSideNav from '@root/src/components/misc/kappwithsidenav';
import { ExampleWrapper } from '@sbook/utils';

// the following imports work with vite-plugin-svgr
import LanguageGlobe from '@root/assets/svgs/icons/languageGlobe.svg?react';
import Telephone from '@root/assets/svgs/icons/telephone.svg?react';
import Folder from '@root/assets/svgs/icons/folder.svg?react';
import { KSideNavItem } from '@root/src/components/menu/ksidenav';

// if you define the navigation model inside
// your component, we recommend you memo-ize it.
export const navigationModel: KSideNavItem[] = [
  {
    label: 'Files',
    id: 'files',
    icon: <Folder />,
    items: [
      { label: 'Pending', id: 'pending' },
      { label: 'Paid', id: 'paid' },
      { label: 'Clients', id: 'clients' },
      { label: 'Logos', id: 'logos' },
    ],
  },
  {
    label: 'Cloud',
    icon: <LanguageGlobe />,
    id: 'cloud',
    items: [
      { label: 'Upload', id: 'upload' },
      { label: 'Download', id: 'download' },
      { label: 'Sync', id: 'sync' },
    ],
  },
  {
    label: 'Devices',
    icon: <Telephone />,
    id: 'devices',
  },
];

export default function KSideNavExample(props: { productTitle: string }) {
  const [currentPage, setCurrentPage] = useState('pending');

  const Page = (props: { currentPage: string }) => {
    return (
      <div className="flex h-full items-center justify-center">
        <KText>{`Current Page: ${props.currentPage}`}</KText>
      </div>
    );
  };

  return (
    <ExampleWrapper>
      <KAppWithSideNav
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        navigationModel={navigationModel}
        productTitle={props.productTitle}
        className="border-border-default h-96 w-120 border"
      >
        <Page currentPage={currentPage} />
      </KAppWithSideNav>
    </ExampleWrapper>
  );
}
