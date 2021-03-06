import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PageNotFound from "./Pages/404Page";
import SignupForm from "./Components/container/SignupForm";
import SignupWizard from "./Components/container/SignupWizard";
import { ToastContainer } from "react-toastify";
import Button from "material-ui/Button";
import LoginForm from "./Components/container/LoginForm";
import SearchPanel from "./Components/container/SearchPanel";
import SearchResult from "./Components/container/SearchResult";

import { withStyles } from "material-ui/styles";
import BottomNavigation, {
  BottomNavigationButton
} from "material-ui/BottomNavigation";
import Home from "material-ui-icons/Home";

import Person from "material-ui-icons/Person";

// import WebFontLoader from "webfontloader";

import TripMain from "./Pages/TripMain";

import WishMain from "./Pages/WishMain";
import Story from "./Pages/Story";
import UserActivities from "./Pages/UserActivities";
import EditActivityPanel from "./Pages/EditActivityPanel";
import UserWishes from "./Pages/UserWishes";

import EditWishPanel from "./Pages/EditWishPanel";

import Wish from "./Components/container/Wish";

import OpenPage from "./Pages/OpenPage";
import Recommendation from "./Pages/Recommendation";

import MyAccount from "./Pages/MyAccount";
import PrivateBasicInfo from "./Pages/PrivateBasicInfo";
import PrivateFavorites from "./Pages/PrivateFavorites";

import RatingIndex from "./Pages/RatingIndex";

import AddActivity from "./Pages/AddActivity/AddActivity";
import AddWish from "./Pages/AddWish/AddWish";
import Activity from "./Pages/Activity";
import PublicProfile from "./Pages/PublicProfile";
import Message from "./Pages/Message";

import RequireAuth from "./HOC/RequireAuth";
import ActivityWishPanel from "./Pages/ActivityWishPanel";
import LocationSearch from "material-ui-icons/LocationSearching";
import Favorite from "material-ui-icons/FavoriteBorder";
import CardGiftcard from "material-ui-icons/CardGiftcard";
import ChatBubbleOutline from "material-ui-icons/ChatBubbleOutline";
import PropTypes from "prop-types";
import UserFavorite from "material-ui-icons/FavoriteBorder";
import Contacts from "material-ui-icons/Contacts";

import { connect } from "react-redux";
import * as actions from "./Actions";
import Badge from "material-ui/Badge";

const styleSheet = {
  root: {
    width: "100%",
    bottom: 0,
    inlineHeight: 1,
    position: "fixed",
    zIndex: 1000
    // border:"1px solid red",
  },
  icon: {
    display: "block"
  },
  broot: {
    minWidth: 60
  }
};
// WebFontLoader.load({
//   google: {
//     families: ["Roboto:300,400,500,700", "Material Icons"]
//   }
// });

class App extends Component {
  static propTypes = {
    // router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  state = {
    popup: false,
    sub_value: null,
    version: "CH",
    main_value: this.main_valueSetter(this.props.location.pathname) || 0
  };

  componentDidMount() {
    console.log("App did mount")
    if (localStorage.getItem("jwtToken")) {
      this.props.fetchMyMessages();
    }
  }

  main_valueSetter(pathname) {
    if (pathname.includes("/recommendation/")) {
      return 0;
    } else if (pathname.includes("/activity/")) {
      return 1;
    } else if (pathname.includes("/wish/")) {
      return 2;
    } else if (pathname.includes("/message")) {
      return 3;
    } else if (pathname.includes("/my/")) {
      return 4;
    }
  }

  handleMainChange(event, main_value) {
    this.setState({
      main_value
    });
    const { location: { pathname } } = this.props;
    let lan = pathname.includes("/EN") ? "/EN" : "/CH";
    if (main_value === 0) {
      this.props.history.push("/recommendation" + lan);
    } else if (main_value === 1) {
      this.props.history.push("/activity" + lan);
    } else if (main_value === 2) {
      this.props.history.push("/wish" + lan);
    } else if (main_value === 3) {
      this.props.history.push("/message");
    } else if (main_value === 4) {
      this.props.history.push("/my" + lan);
    }
  }

  handleSubChange(event, sub_value) {
    this.setState({ sub_value });
    if (sub_value === 0) {
      this.props.history.push("/myFavorites");
    } else if (sub_value === 1) {
    } else if (sub_value === 2) {
    } else if (sub_value === 3) {
    }
  }

  renderBottomNav(props) {
    const { sub_value, main_value } = this.state;

    const { classes, history: { location: { pathname } }, unread } = this.props;
    if (
      pathname.includes("/editActivity/") ||
      pathname.includes("/editWish/") ||
      pathname.includes("/openPage") ||
      pathname.includes("/login") ||
      pathname.includes("/signup") ||
      pathname.includes("/ratingIndex")
    ) {
      return null;
    }

    if (
      pathname.match(/\/activity\/[0-9]/) ||
      pathname.match(/\/wish\/[0-9]/)
    ) {
      return null;
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
          label="推荐"
          icon={<CardGiftcard />}
        />

        <BottomNavigationButton
          style={{ marginLeft: 5 }}
          classes={{ icon: classes.icon, root: classes.broot }}
          label="找活动"
          icon={<LocationSearch />}
        />

        <BottomNavigationButton
          classes={{ icon: classes.icon, root: classes.broot }}
          label="找心愿"
          icon={<UserFavorite />}
        />
        <BottomNavigationButton
          classes={{ icon: classes.icon, root: classes.broot }}
          label="消息"
          icon={
            unread === 0 ? (
              <ChatBubbleOutline />
            ) : (
              <Badge badgeContent={unread} color="primary">
                <ChatBubbleOutline />
              </Badge>
            )
          }
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
    const { classes } = this.props;
    let value = this.state.value > 0 ? this.state.value : value;
    let { version } = this.state;
    return (
      <div>
        <div>
          <Switch>
            <Route exact path="/" component={RequireAuth(Recommendation)} />
            <Route exact path="/openPage/:version" component={OpenPage} />
            <Route exact path="/login/:version" component={LoginForm} />
            <Route path="/signup/:version" component={SignupForm} />
            <Route
              exact
              path="/recommendation/:version"
              component={RequireAuth(Recommendation)}
            />

            <Route exact path="/message" render={() => <Message />} />
            <Route
              exact
              path="/activity/:version"
              component={RequireAuth(TripMain)}
            />

            <Route
              exact
              path="/wish/:version"
              component={RequireAuth(WishMain)}
            />
            <Route
              exact
              path="/activity/:activityId/:version"
              component={RequireAuth(Activity)}
            />
            <Route
              exact
              path="/wish/:wishId/:version"
              component={RequireAuth(Wish)}
            />
            <Route
              exact
              path="/my/:version"
              component={RequireAuth(MyAccount)}
            />

            <Route
              exact
              path="/myBasicInfo"
              component={RequireAuth(PrivateBasicInfo)}
            />
            <Route
              exact
              path="/myFavorites"
              component={RequireAuth(PrivateFavorites)}
            />

            <Route
              exact
              path="/addActivity/:version"
              component={RequireAuth(AddActivity)}
            />
            <Route exact path="/addWish" component={RequireAuth(AddWish)} />

            <Route
              exact
              path="/searchPanel/:version"
              component={RequireAuth(SearchPanel)}
            />
            <Route
              exact
              path="/searchResult/:version"
              component={RequireAuth(SearchResult)}
            />

            <Route exact path="/story/:userId" component={RequireAuth(Story)} />
            <Route
              exact
              path="/userActivities/:userId/:version"
              component={RequireAuth(UserActivities)}
            />
            <Route
              exact
              path="/editActivity/:activityId/"
              component={RequireAuth(EditActivityPanel)}
            />

            <Route
              exact
              path="/userWishes/:userId"
              component={RequireAuth(UserWishes)}
            />
            <Route
              exact
              path="/editWish/:wishId"
              component={RequireAuth(EditWishPanel)}
            />

            <Route
              exact
              path="/activityWish/:version"
              component={RequireAuth(ActivityWishPanel)}
            />

            <Route
              exact
              path="/user/:userId"
              component={RequireAuth(PublicProfile)}
            />
            <Route
              exact
              path="/ratingIndex/:activityId"
              component={RequireAuth(RatingIndex)}
            />

            <Route
              path="/completeUserProfile/:version"
              component={RequireAuth(SignupWizard)}
            />

            <Route component={PageNotFound} />
          </Switch>
        </div>
        <ToastContainer />
        <div className={classes.root}>{this.renderBottomNav(this.props)}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log("App-unread", state.MessageReducer.unread);
  return {
    unread: state.MessageReducer.unread
  };
};
export default withStyles(styleSheet)(
  withRouter(connect(mapStateToProps, actions)(App))
);