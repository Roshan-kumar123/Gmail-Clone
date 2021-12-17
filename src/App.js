import React, { useEffect } from 'react';
import './App.css';
import Header from './component/header';
import Sidebar from './component/sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Mail from './component/mail';
import EmailList from './component/emailList';
import SendMail from './component/sendMail';
import { useDispatch, useSelector } from 'react-redux';
import { selectSendMessageIsOpen } from './redux/features/mailSlice';
import { login, selectUser } from './redux/features/userSlice';
import Login from './login';
import { auth } from './firebase';

function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // user is logged in
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      } else {
        // user is logged out
      }
    });
  }, [dispatch]);

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className={'app'}>
          <Header />
          <div className={'app-body'}>
            <Sidebar />

            <Switch>
              <Route path='/mail'>
                <Mail />
              </Route>
              <Route path='/'>
                <EmailList />
              </Route>
            </Switch>
          </div>

          {sendMessageIsOpen && <SendMail />}
        </div>
      )}
    </Router>
  );
}

export default App;
