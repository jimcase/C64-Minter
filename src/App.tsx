import React from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
// import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css'; // TODO enable *.css from webpack conf
// import '../assets/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import icon from '../assets/icon.svg';
import './App.global.css';
// import WalletInfo from './WalletInfo';
import Root from './layout/Root/Root';
import NavWrapper from './layout/NavWrapper/NavWrapper';
import Header from './layout/Header/Header';
import Content from './layout/Content/Content';

const Main: React.FC = () => (
  <Root>
    <NavWrapper>
      <Header />
      <Content />
    </NavWrapper>
  </Root>
);

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
}
