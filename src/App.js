import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import TragelMainPage from "./Pages/TravelMainPage";
import PageNotFound from "./Pages/404Page";
import UnitSinupPage from "./UnitTest/UnitSinupPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import MyUploader from "./Pages/TestPages";
import Travel from "./Pages/Travel";
import LoginForm from "./Components/container/LoginForm";
import TestMain from "./Pages/TestMain";
import CheckAuth from "./Utlity/checkAuth";
import TestMaterial from "./Pages/TestMaterial";
import "framework7/dist/css/framework7.material.min.css";
import "framework7/dist/css/framework7.material.colors.min.css";
import HomePageNew from "./Pages/HomePageNew";
import {
  View,
  Views,
  Pages,
  Page,
  Navbar,
  Toolbar,
  Tabs,
  Tab
} from "framework7-react";
import { withStyles } from "material-ui/styles";
import BottomNavigation, {
  BottomNavigationButton
} from "material-ui/BottomNavigation";
import Home from "material-ui-icons/Home";
import Flight from "material-ui-icons/Flight";
import Message from "material-ui-icons/Message";
import Person from "material-ui-icons/Person";
import AddCircle from 'material-ui-icons/AddCircle';

import WebFontLoader from "webfontloader";
import Tab1Content from "./Pages/tab1content";
import { getFramework7 } from "./index";
import TripMain from "./Pages/TripMain";
import WishMain from "./Pages/WishMain";
import StoryMain from "./Pages/StoryMain";
import MyAccount from "./Pages/MyAccount";
import MyMessage from "./Pages/MyMessage";
import Discovery from "./Pages/Discovery";
import MyRoute from "./Pages/MyRoute";
import AddRoute from "./Pages/AddRoute";
import AddRouteReview from "./Pages/AddRouteReview";

import LocationSearch from "material-ui-icons/LocationSearching";
import Favorite from "material-ui-icons/FavoriteBorder";
import Toys from "material-ui-icons/Toys";
import ChatBubbleOutline from "material-ui-icons/ChatBubbleOutline";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const styleSheet = {
  root: {
    width: "100%",
    bottom: 0,
    inlineHeight: 1,
    position: "fixed",
    zIndex: 1000
  },
  icon: {
    display: "block"
  },
  broot: {
    minWidth: 60
  }
};
WebFontLoader.load({
  google: {
    families: ["Roboto:300,400,500,700", "Material Icons"]
  }
});

class App extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      main_value: 0,
      my_value: 0,
      popup: false
    };
  }

  handleMainChange(event, main_value) {
    this.setState({ main_value });
    if (main_value == 0) {
      this.props.history.push("/");
    } else if (main_value == 1) {
      this.props.history.push("/wish");
    } else if (main_value == 2) {
      this.props.history.push("/story");
    } else if (main_value == 3) {
      this.props.history.push("/message");
    } else if (main_value == 4) {
      this.props.history.push("/my");
    }
  }

  handleSubChange(event, sub_value) {
    this.setState({ sub_value });
    if (sub_value == 0) {
      this.props.history.push("/discovery");
    }else if (sub_value == 1) {
      this.props.history.push("/myRoute");
    } else if (sub_value == 2) {
      this.props.history.push("/addRoute");
    } else if (sub_value == 3) {
      this.props.history.push("/message");
    } else if (sub_value == 4) {
      this.props.history.push("/my");
    }
  }
  testdir() {
    console.log("change dir");
    alert("change dir");
    //   getFramework7().mainView.router.loadPage('/home/');
  }

  renderBottomNav() {
    const main_value = this.state.main_value;
    const sub_value = this.state.sub_value;
    const classes = this.props.classes;
    if (this.props.location.pathname == "/my" || this.props.location.pathname == '/myRoute') {
      return (
        <BottomNavigation
          value={sub_value}
          onChange={this.handleSubChange.bind(this)}
          showLabels
        >
          <BottomNavigationButton
            style={{ marginLeft: 5 }}
            classes={{ icon: classes.icon, root: classes.broot }}
            label="发现"
            icon={<Home />}
          />
          <BottomNavigationButton
            classes={{ icon: classes.icon, root: classes.broot }}
            label="行程"
            icon={<Flight />}
          />
          <BottomNavigationButton
            classes={{ icon: classes.icon, root: classes.broot }}

            icon={<AddCircle />}
          />
          <BottomNavigationButton
            classes={{ icon: classes.icon, root: classes.broot }}
            label="消息"
            icon={<Message />}
          />
          <BottomNavigationButton
            classes={{ icon: classes.icon, root: classes.broot }}
            label="我的"
            icon={<Person />}
          />
        </BottomNavigation>
      );
    }

    if (this.props.location.pathname == "/addRoute") {
      return
    }
    return (
      <BottomNavigation
        value={main_value}
        onChange={this.handleMainChange.bind(this)}
        showLabels
      >
        <BottomNavigationButton
          style={{ marginLeft: 5 }}
          classes={{ icon: classes.icon, root: classes.broot }}
          label="找活动"
          icon={<LocationSearch />}
        />
        <BottomNavigationButton
          classes={{ icon: classes.icon, root: classes.broot }}
          label="心愿单"
          icon={<Favorite />}
        />
        <BottomNavigationButton
          classes={{ icon: classes.icon, root: classes.broot }}
          label="故事"
          icon={<Toys />}
        />
        <BottomNavigationButton
          classes={{ icon: classes.icon, root: classes.broot }}
          label="消息"
          icon={<ChatBubbleOutline />}
        />
        <BottomNavigationButton
          classes={{ icon: classes.icon, root: classes.broot }}
          label="我"
          icon={<Person />}
        />
      </BottomNavigation>
    );
  }

  render() {
    const classes = this.props.classes;
    const path = this.props.location.pathname;
    const value = this.state.value > 0 ? this.state.value : value;
    {
      this.testdir.bind(this);
    }
    return (
      <div>
        <Views>
          <View id="main-view" main>
            <Pages>
              <Page style={{ position: "fixed" }}>
                <div>
                  <Switch>
                    <Route exact path="/" component={TripMain} />
                    <Route exact path="/trip" component={Home} />
                    <Route exact path="/test" component={Travel} />
                    <Route exact path="/tr/test" component={MyUploader} />
                    <Route exact path="/maintest" component={TestMain} />
                    <Route
                      exact
                      path="/testmaterial"
                      component={TestMaterial}
                    />
                    <Route exact path="/home" component={TripMain} />
                    <Route exact path="/wish" component={WishMain} />
                    <Route exact path="/story" component={StoryMain} />
                    <Route exact path="/my" component={MyAccount} />
                    <Route exact path="/message" component={MyMessage} />
                    <Route exact path="/discovery" component={Discovery} />
                    <Route exact path="/myRoute" component={MyRoute} />
                    <Route exact path="/addRoute" component={AddRoute} />


                    {/*unit test used below, production will check env.production to disable*/}
                    <Route path="/signup" component={UnitSinupPage} />
                    <Route path="/login" component={LoginForm} />
                    <Route path='/review' component={AddRouteReview} />
                    <Route component={PageNotFound} />
                  </Switch>
                </div>
                <ToastContainer />
              </Page>
              <div className={classes.root}>{this.renderBottomNav()}</div>
            </Pages>
          </View>
        </Views>
      </div>
    );
  }
}

export default withStyles(styleSheet)(withRouter(App));