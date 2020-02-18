import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import MenuBar from './menu/MenuBar'
import Login from './login/Login'
import TableContainer from './anime-table/TableContainer'
import UserContainer from "./user/UsersContainer"
import AnimeListContainer from "./anime-list/AnimeListContainer"
import AnimeInfo from './anime-info/AnimeInfo'
import UserInfo from './user/UserInfo'
import history from '../history'
import UserStore from '../stores/UserStore'
import Actions from '../actions'
import AddAnimeForm from './add-anime/AddAnimeForm'

export default class App extends Component {
    state = {
        loggedInUser: null,
        users: null
    }

    componentDidMount() {
        Actions.getAllUsers("")
        UserStore.listen(this.onChange)
    }

    componentWillUnmount() {
        UserStore.unlisten(this.onChange)
    }

    onChange = store => {
        const { loggedInUser, users } = store
        this.setState({ loggedInUser, users })
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <Login>
                        <MenuBar loggedInUser={this.state.loggedInUser} />
                        <Switch>
                            <Route path="/home" exact component={TableContainer} />
                            <Route path="/add" exact component={AddAnimeForm} />
                            <Route path="/list" exact component={AnimeListContainer} />
                            <Route
                                path="/user"
                                exact
                                render={props => <UserContainer users={this.state.users} {...props} /> }
                            />
                            <Route
                                path="/userInfo/:id"
                                exact
                                render={props => <UserInfo users={this.state.users} {...props} />}
                            />
                            <Route
                                path="/animeInfo/:id"
                                exact
                                render={props => <AnimeInfo loggedInUser={this.state.loggedInUser} {...props} />}
                            />
                        </Switch>
                    </Login>
                </div>
            </Router>
        )
    }
}