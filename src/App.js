//Core
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./App.css";

//Redux
import { Provider } from "react-redux";
import store from "./redux/reducers/store";
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./redux/reducers/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

//Pages
import Nav from "./components/nav/nav";
import Home from "./pages/home";
import Login from "./pages/login";
import Footer from "./pages/footer";
import Signup from "./pages/signup";
import Contact from "./pages/contact";
import Settings from "./pages/settings";
import Calendar from "./components/calendars/Calendar.js";
import MyCalendar from "./components/calendars/MyCalendar.js";

//Auth
import AuthRoute from "./util/auth_route";
import axios from "axios";


const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    store.dispatch({ type: SET_UNAUTHENTICATED });
    window.location.href ="/login"
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());

  }
}

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="container">
        <Route component={Nav} />
        <div className="AppBody">
          <Switch>
            <Route path="/" exact component={Home} />
            <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/signup" component={Signup} />
            <Route  path="/mycalendar" component={MyCalendar} />
            <Route path="/settings" component={Settings} />
            <Route path="/contact" component={Contact} />
            <Route exact path="/calendar/:userid" component={Calendar} />
          </Switch>
        </div>
        <Route component={Footer} />
      </div>
    </Router>
    </Provider>
  );
}

export default App;


// /* src/App.js */
// import React, { useEffect, useState } from 'react'
// import Amplify, { API, graphqlOperation } from 'aws-amplify'
// import { createTodo } from './graphql/mutations'
// import { listTodos } from './graphql/queries'
// import { withAuthenticator } from '@aws-amplify/ui-react'


// import awsExports from "./aws-exports";
// Amplify.configure(awsExports);

// const initialState = { name: '', description: '' }

// const App = () => {
//   const [formState, setFormState] = useState(initialState)
//   const [todos, setTodos] = useState([])

//   useEffect(() => {
//     fetchTodos()
//   }, [])

//   function setInput(key, value) {
//     setFormState({ ...formState, [key]: value })
//   }

//   async function fetchTodos() {
//     try {
//       const todoData = await API.graphql(graphqlOperation(listTodos))
//       const todos = todoData.data.listTodos.items
//       setTodos(todos)
//     } catch (err) { console.log('error fetching todos') }
//   }

//   async function addTodo() {
//     try {
//       if (!formState.name || !formState.description) return
//       const todo = { ...formState }
//       setTodos([...todos, todo])
//       setFormState(initialState)
//       await API.graphql(graphqlOperation(createTodo, {input: todo}))
//     } catch (err) {
//       console.log('error creating todo:', err)
//     }
//   }

//   return (
//     <div style={styles.container}>
//       <h2>Amplify Todos</h2>
//       <input
//         onChange={event => setInput('name', event.target.value)}
//         style={styles.input}
//         value={formState.name} 
//         placeholder="Name"
//       />
//       <input
//         onChange={event => setInput('description', event.target.value)}
//         style={styles.input}
//         value={formState.description}
//         placeholder="Description"
//       />
//       <button style={styles.button} onClick={addTodo}>Create Todo</button>
//       {
//         todos.map((todo, index) => (
//           <div key={todo.id ? todo.id : index} style={styles.todo}>
//             <p style={styles.todoName}>{todo.name}</p>
//             <p style={styles.todoDescription}>{todo.description}</p>
//           </div>
//         ))
//       }
//     </div>
//   )
// }

// const styles = {
//   container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 20 },
//   todo: {  marginBottom: 15 },
//   input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
//   todoName: { fontSize: 20, fontWeight: 'bold' },
//   todoDescription: { marginBottom: 0 },
//   button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
// }

// export default withAuthenticator(App)