import { createContext, useState, useEffect } from 'react';

const User = createContext();
const {Consumer, Provider} = User;

export default function UserContext({children}) {
  const [register, setRegister] = useState(false);
  const [vote, setVote] = useState(false);

  return (
    <Provider value={{
      vote: vote,
      register: register
    }}>
      {children}
    </Provider>
  );
}

export { User, Consumer };