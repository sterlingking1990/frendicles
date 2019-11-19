import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import './styles/styles.scss';
import {BrowserRouter,Route,Switch,Link,NavLink} from 'react-router-dom'


const IndexPage=()=>(
  <div>
    <h1>Welcome to friendicle</h1>
  </div>
)
//admin pages

const AdminDashboard = () => (
  <div>
    <p>This is admin's dashboard</p>
  </div>
)

const CreatePlace=()=>(
  <div>
    <p>This is a place to create places for friendicle</p>
  </div>
)

const EditPlace=()=>(
  <div>
    <p>This is page to edit place for friendicle</p>
  </div>
)

//users specific paged

const Dashboard=()=>(
  <div>
    <p>This is users dashboard</p>
  </div>
)

const CreateHook=()=>(
  <div>
    <h1>This is a page to create your own hook</h1>
  </div>
)

const ViewHookHistory=()=>(
  <div>
    <p>This is page to view specific hook info from list of hooks joined</p>
  </div>
)

const HooksByHosts=()=>(
  <div>
    <p>This is page to view all hosts for a particular friendicle hook selected</p>
  </div>
)

const ErrorPage=()=>(
  <div>
    <p>Page not found</p>
  </div>
)

//Navigation Link for routes
const ClientHeader=()=>(
  <header>
    <h1>friendicle</h1>
    <NavLink to="/dashboard" activeClassName="is-active">Dashboard</NavLink>
    <NavLink to="/create-hook" activeClassName="is-active">Host a Hook</NavLink>
    <NavLink to="/hooks-joined" activeClassName="is-active">Hook History</NavLink>
    <NavLink to="/hooks-by-hosts" activeClassName="is-active">Hooks to Join</NavLink>
  </header>
)

const AdminHeader = () => (
  <header>
    <h1>friendicle</h1>
    <NavLink to="/admin-dashboard">Admin</NavLink>
    <NavLink to="/create-place">Create Place</NavLink>
    <NavLink to="/edit-place">Edit Place</NavLink>
  </header>
)

const GuestHeader =()=>(
  <header>
    <h1>friendicle</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
  </header>
)

const HOCHeader=(Component1,Component2,Component3)=>{
  return (props)=>(
    <div>
    {props.user==='admin'&&<Component1/>}
    {props.user==='user'&&<Component2/>}
      {props.user === 'guest' && <Component3 />}
    </div>
  )

}

const Header=HOCHeader(AdminHeader,ClientHeader,GuestHeader)


const routes= (
  <BrowserRouter>
    <div>
    <Header user="guest"/>
    <Switch>
      <Route path="/" component={IndexPage} exact={true}/>
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route path="/create-place" component={CreatePlace}/>
      <Route path="/edit-place" component={EditPlace} />
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/create-hook" component={CreateHook} />
      <Route path="/hooks-joined" component={ViewHookHistory} />
      <Route path="/hooks-by-hosts" component={HooksByHosts} />
      <Route component={ErrorPage} />
    </Switch>
    </div>
    </BrowserRouter>
)

export default routes;
