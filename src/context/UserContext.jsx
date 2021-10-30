import { useHistory } from 'react-router-dom';
import { createContext, useState, useEffect } from 'react';
import { getAll, vote, register, winners } from 'services/SpookyAPI';
import SnackNotification from 'components/common/SnackNotification';
import DialogBox from 'components/common/Dialog';

const User = createContext();
const {Consumer, Provider} = User;

export default function UserContext({children}) {
  const [alreadyRegister, setAlreadyRegister] = useState(false);
  const [alreadyVote, setAlreadyVote] = useState(false);  
  const [snack, setSnack] = useState(false);
  const [info, setInfo] = useState({});
  const [dialog, setDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({});

  let history = useHistory();

  const closeSnack = () => setSnack(false);

  const closeDialog = () => setDialog(false);

  function openSnack(res, typeOfSnack) {
    let newSnack = {
      severity: typeOfSnack,
      message: res
    };
    setInfo(newSnack);
    setSnack(true);
  }

  function openDialog(item) {
    setDialogInfo(item);
    setDialog(true);
  }

  async function getAllCharacters() {
    try {
      let all = await getAll();
      return all;
    }
    catch(err) {
      openSnack(err.message, 'error');
    }
  }

  async function registerCharacter(data) {
    try {
      let res = await register(data);
      openSnack(res, 'success');
      setAlreadyRegister(true);
      localStorage.setItem('spooky-register', 'true');
      history.push('/');
    }
    catch(err) {
      openSnack(err.message, 'error');
    }
  }

  async function voteForThis(id) {
    try {
      let res = await vote(id);
      setDialog(false);
      openSnack(res, 'success');
      setAlreadyVote(true);
      localStorage.setItem('spooky-vote', 'true');
    }
    catch(err) {
      openSnack(err.message, 'error');
    }
  }

  async function getWinners() {
    try {
      let res = await winners();
      return res;
    }
    catch(err) {
      openSnack(err.message, 'error');
    }
  }

  useEffect(()=> {
    let localVote = localStorage.getItem('spooky-vote');
    setAlreadyVote(JSON.parse(localVote));
    let localRegister = localStorage.getItem('spooky-register');
    setAlreadyRegister(JSON.parse(localRegister));
  }, [alreadyVote, alreadyRegister]);

  return (
    <Provider value={{
      vote: alreadyVote,
      register: alreadyRegister,
      characters: getAllCharacters,
      registerCharacter: registerCharacter,
      openSnack: openSnack,
      voteForThis: voteForThis,
      openDialog: openDialog,
      winners: getWinners
    }}>
      {children}

      <SnackNotification 
        open={snack}
        closeSnack={closeSnack}
        info={info}
      />

      <DialogBox
        open={dialog}
        closeDialog={closeDialog}
        info={dialogInfo}
        action={voteForThis}
      />
    </Provider>
  );
}

export { User, Consumer };