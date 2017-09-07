import React,{Component} from 'react'
import '../CSS/main.css'
import { withStyles, createStyleSheet } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import Home from 'material-ui-icons/Home';
import Flight from 'material-ui-icons/Flight';
import Message from 'material-ui-icons/Message';
import Person from 'material-ui-icons/Person';
import WebFontLoader from 'webfontloader';
import BannerSlider from '../Components/container/mainBannerSlider'

import NowPlayingCard from '../Components/container/MaterialCard'
import SearchBar from '../Components/container/searchBar'
import TabSelect from '../Components/container/tabSelect'
import {Page} from 'framework7-react'
import {Popup, Button, Link,Navbar, View,Toolbar, Tab, ContentBlock,Tabs} from 'framework7-react'
import PopupSearch from '../Components/container/popupSearch'
import Typography from 'material-ui/Typography';
import TLogo from '../Assets/Images/logo.jpg'
import HotTab from '../Components/container/hotTab'
import HotMaterialCard from '../Components/container/hotMaterialCard'
import RButton from 'material-ui/Button';
import {getFramework7} from '../index';
import FPageHome from './FPageHome'

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

const styleSheet = createStyleSheet({
  root:{
    width: "100%",
    bottom: 0,
  //  inlineHeight: 1,
    position: 'fixed',
    zIndex: 1000
  },
  icon:{
    display:'block'
  }
});

class HomePageNew extends Component
{
  constructor()
  {
    super();
    this.state = {
    value: 0,
    popup: false
  };
  }
  handleChange = (event, value) => {
   this.setState({ value });
   if(value==0)
   {
     getFramework7().mainView.router.loadPage('/tabbar/');
   }
   else if(value==1)
   {
     getFramework7().mainView.router.loadPage('/tabbar/tab-2');
   }
   else
   {
     getFramework7().mainView.router.loadPage('/tabbar/tab-3');
   }
 };

 clicklink()
 {
   getFramework7().mainView.router.loadPage('/test/');
   console.log(getFramework7().mainView.router)
 }


    render(){
       const classes = this.props.classes;
      return(

        <div>
        <Popup tabletFullscreen style={{zIndex:10600}}>
          <PopupSearch />
        </Popup>
          <Page name='home' style={{position:'fixed'}} infiniteScroll={90} infiniteScrollDistance={100} dataDistance={100} pullToRefresh>

          <Tabs>
        <Tab routeTabId="tab1" id="tab1" />
        <Tab routeTabId="tab1" id="tab2" />
        <Tab routeTabId="tab1" id="tab3" />
        </Tabs>

              </Page>

        </div>

      )
    }
}


export default withStyles(styleSheet)(HomePageNew)