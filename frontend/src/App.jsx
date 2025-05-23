import { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import TodoApp from './components/TodoApp';

function App() {
  const [stage, setStage] = useState('signup'); // signup, login, todo
  const [userId, setUserId] = useState('');

  return (
    <div>
      {stage === 'signup' && <Signup setStage={setStage} />}
      {stage === 'login' && <Login setStage={setStage} setUserId={setUserId} />}
      {stage === 'todo' && <TodoApp userId={userId} setStage={setStage} setUserId={setUserId} />}

    </div>
  );
}

export default App;
