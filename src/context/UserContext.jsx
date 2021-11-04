import { useHistory } from 'react-router-dom';
import { createContext, useState, useReducer } from 'react';
import { getAll, vote, register, getWinners } from 'services/SpookyAPI';
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

const initialData = {
  loading: true,
  data: []
};

export default function UserContext({children}) {
  const [user, userDispatch] = useReducer(userReducer, localUser ? localUser : initialUser);
  const [characters, charDispatch] = useReducer(dataReducer, initialData);
  const [winners, winnersDispatch] = useReducer(dataReducer, initialData);
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
          alreadyRegister: true,
          data: {...action.user}
        };
        localStorage.setItem('spooky-vote', JSON.stringify(newData));
        return newData;
      }
      default: return initialUser;
    }
  }
  
  function dataReducer(state, action) {
    switch (action.type) {
      case 'fetch': {
        return {
          loading: false,
          data: action.data
        }
      }
      default: return initialData;
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
      let res = await getAll();
      charDispatch({type: 'fetch', data: res});
    }
    catch(err) {
      snackConfig('open', 'error', err.message);
    }
  }

  async function registerCharacter(data) {
    try {
      let res = await register(data);
      userDispatch({type: 'register', user: res.user});
      snackConfig('open', 'success', res.message);
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

  async function getAllWinners() {
    try {
      let res = await getWinners();
      winnersDispatch({type: 'fetch', data: res});
    }
    catch(err) {
      snackConfig('open', 'error', err.message);
    }
  }

  return (
    <Provider value={{
      user: user.data,
      vote: user.alreadyVote,
      register: user.alreadyRegister,
      characters: characters,
      winners: winners,
      getCharacters: getAllCharacters,
      getWinners: getAllWinners,
      registerCharacter: registerCharacter,
      openSnack: snackConfig,
      voteForThis: voteForThis,
      openDialog: dialogConfig
    }}>
      {children}
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