import { useHistory } from 'react-router-dom';
import { createContext, useState, useReducer } from 'react';
import { getAll, vote, register, winners } from 'services/SpookyAPI';
import SnackNotification from 'components/common/SnackNotification';
import DialogBox from 'components/common/Dialog';

const User = createContext();
const {Consumer, Provider} = User;

const initialUser = {
  alreadyVote: false,
  alreadyRegister: false
};

const initialSnack = {
  isOpen: false,
  severity: '',
  message: ''
};

const initialDialog = {
  isOpen: false,
  _id: '',
  name: ''
};

let localUser = JSON.parse(localStorage.getItem('spooky-vote'));

export default function UserContext({children}) {
  const [user, userDispatch] = useReducer(userReducer, localUser ? localUser : initialUser);
  const [snack, setSnack] = useState(initialSnack);
  const [dialog, setDialog] = useState(initialDialog);

  let history = useHistory();

  function userReducer(state, action) {
    switch (action.type) {
      case 'vote': {
        let newData = {
          ...state,
          alreadyVote: true
        };
        localStorage.setItem('spooky-vote', JSON.stringify(newData));
        return newData;
      }
      case 'register': {
        let newData = {
          ...state,
          alreadyRegister: true
        };
        localStorage.setItem('spooky-vote', JSON.stringify(newData));
        return newData;
      }
      default: return state;
    }
  }

  function snackConfig(type, severity, message) {
    setSnack(() => {
      if (type === 'open') {
        return {
          isOpen: true,
          severity: severity,
          message: message
        }
      } else {
        return initialSnack;
      }
    });
  }

  function dialogConfig(type, item) {
    setDialog(() => {
      if (type === 'open') {
        return {
          isOpen: true,
          _id: item._id,
          name: item.name
        }
      } else {
        return initialDialog;
      }
    });
  }

  async function getAllCharacters() {
    try {
      let all = await getAll();
      return all;
    }
    catch(err) {
      snackConfig('open', 'error', err.message);
    }
  }

  async function registerCharacter(data) {
    try {
      let res = await register(data);
      userDispatch({type: 'register'});
      snackConfig('open', 'success', res);
      history.push('/');
    }
    catch(err) {
      snackConfig('open', 'error', err.message);
    }
  }

  async function voteForThis(id) {
    try {
      let res = await vote(id);
      dialogConfig('close');
      userDispatch({type: 'vote'});
      snackConfig('open', 'success', res);
    }
    catch(err) {
      snackConfig('open', 'error', err.message);
    }
  }

  async function getWinners() {
    try {
      let res = await winners();
      return res;
    }
    catch(err) {
      snackConfig('open', 'error', err.message);
    }
  }

  return (
    <Provider value={{
      vote: user.alreadyVote,
      register: user.alreadyRegister,
      characters: getAllCharacters,
      registerCharacter: registerCharacter,
      openSnack: snackConfig,
      voteForThis: voteForThis,
      openDialog: dialogConfig,
      winners: getWinners
    }}>
      {children}
      <button onClick={registerCharacter}>register</button>
      <button onClick={voteForThis}>vote</button>
      <SnackNotification 
        snack={snack}
        closeSnack={() => snackConfig('close')}
      />

      <DialogBox
        dialog={dialog}
        closeDialog={() => dialogConfig('close')}
        action={voteForThis}
      />
    </Provider>
  );
}

export { User, Consumer };