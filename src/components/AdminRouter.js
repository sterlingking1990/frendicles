import React from 'react';
import {Switch,Route} from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import CreatePlace from '../components/CreatePlace';
import EditPlace from '../components/EditPlace';
import CreateHook from '../components/CreateHook';
import EditHook from '../components/EditHook';
import HooksPage from '../components/HooksPage';
import ErrorPage from '../components/ErrorPage';
import PlacesPage from '../components/PlacesPage';
const AdminRouter = () => (
            <Switch>
                <Route exact path="/" component={AdminDashboard} />
                <Route exact path="/create-place" component={CreatePlace}  />
                <Route exact path="/edit-place/:id" component={EditPlace}  />
                <Route exact path="/create-hook" component={CreateHook}  />
                <Route exact path="/hooks-page" component={HooksPage} />
                <Route exact path="/places-page" component={PlacesPage} />
                <Route exact path="/edit-hook/:id" component={EditHook}  />
                <Route exact component={ErrorPage} />
            </Switch>
)

export default AdminRouter