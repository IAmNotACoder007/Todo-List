import React, { Component } from 'react';
import './App.css';
import HeaderContainer from './containers/headerContainer';
import FooterContainer from './containers/footerContainer';
import TodosContainer from './containers/todosContainer';
import GlobalItemsContainer from './containers/globalItemsContainer';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

class App extends Component {
  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          light: '#90CAF9',
          main: '#2196F3',
          dark: '#1E88E5',
          contrastText: '#fff',
        }

      }
    });
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <HeaderContainer></HeaderContainer>
          <TodosContainer></TodosContainer>
          <FooterContainer></FooterContainer>
          <GlobalItemsContainer></GlobalItemsContainer>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
