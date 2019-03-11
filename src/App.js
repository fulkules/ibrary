import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import routes from './routes';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
import { updateUser, clearUser, setUserData } from './ducks/actions';
import getAllUserData from './common/getUtils';


class App extends Component {
  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const { id } = this.props;
    if (!id) {
      try {
        let res = await axios.get('/api/current');
        this.props.updateUser(res.data)
        const allUserData = await getAllUserData()
        this.props.setUserData(allUserData)
        // console.log(res)
      } catch (err) {
        console.log(err)
        this.props.history.push('/')
      }
    }
  }
  render() {
    return (
        <HashRouter>
          <div className="App">
            {routes}
          </div>
        </HashRouter>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState
}

const mapDispatchToProps = {
  updateUser,
  clearUser,
  setUserData
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
