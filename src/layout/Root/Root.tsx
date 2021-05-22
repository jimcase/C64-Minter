import React, { useEffect, useState } from 'react';

import Media from 'react-media';

const BootrapBreakpoints = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
};

interface LayoutState {
  navAnimate: boolean;
  navBreakpoint: 'xs' | 'sm' | 'md' | 'lg';
  navOpen: boolean;
  navDocked: boolean;
  navWidth: number;
  contentSelected: string;

  setNavOpen: (open: boolean) => void;
  setNavDocked: (docked: boolean) => void;
  selectContent: (content: string) => void;
}

export const LayoutContext = React.createContext<LayoutState>({
  navAnimate: true,
  navBreakpoint: 'sm',
  navOpen: false,
  navDocked: true,
  navWidth: 120,
  contentSelected: 'Minter',
  selectContent: () => {},
  setNavOpen: () => {},
  setNavDocked: () => {},
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RootProps {}

// eslint-disable-next-line react/prop-types
const Root: React.FC<RootProps> = ({ children }) => {
  const navBreakpoint = 'sm';

  const startingWidth = window.innerWidth;
  const navStartsOpen = startingWidth > BootrapBreakpoints[navBreakpoint];

  const [navAnimate, setNavAnimate] = useState(false);
  const [navOpen, setNavOpen] = useState(navStartsOpen);
  const [navDocked, setNavDocked] = useState(true);
  const [contentSelected, selectContent] = useState('Menu');

  // Allow the sidebar to render without animated. By defualt, it
  // animates when it initially loads, making the page jump around with
  // every page load. This enables it to appear fully in instantly, but
  // then enables animations for menu interactions after the initial
  // load.
  useEffect(() => {
    const timer = setTimeout(() => {
      setNavAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Genereate desired Layout state here.
  const layout: LayoutState = {
    navAnimate,
    navBreakpoint: 'sm',
    navOpen,
    navDocked,
    navWidth: 120,
    contentSelected,
    selectContent,
    setNavOpen,
    setNavDocked,
  };

  return (
    <LayoutContext.Provider value={layout}>
      <Media
        query={{ minWidth: BootrapBreakpoints.sm }}
        onChange={(isLarge) => {
          setNavDocked(isLarge);
          setNavOpen(isLarge);
        }}
      />
      <div>{children}</div>
    </LayoutContext.Provider>
  );
};

export default Root;
