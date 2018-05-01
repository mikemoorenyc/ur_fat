

import Cookies from 'js-cookie';
import { h, render, Component  } from 'preact';

import axios from "axios";

var {EventEmitter} = require('fbemitter');
global.emitter = new EventEmitter();

var debounce = require('lodash.debounce');

import './styles/app.scss';

import LoginForm from './components/login-form.jsx';
import ItemForm from './components/item-form.jsx';
import List from './components/List.js';
import NavButton from './components/NavButton.jsx';

import updateNoonces from './utils/update-noonce.js';
import { removeItem, addItem, replaceItem } from './utils/list-operations.js';

class App extends Component {
  constructor(props) {
      super();
      let logged_in = false;
      if(props.previousLogin) {
        logged_in = true;
      }
      let start = new Date();
      start.setHours(0,0,0,0);
      let end = new Date();
      end.setHours(23,59,59,999);
      this.state = {
        logged_in : logged_in,
        user: null,
        checked_login: false,
        login_noonce: null,
        day: 0,
        form_opened: false,
        add_item_noonce: null,
        fetching_posts: true,
        today_posts: [],
        edit_noonces: [],
        top_threshold: Math.floor(end.getTime() / 1000),
        bottom_threshold: Math.floor(start.getTime() / 1000),
        editing: false,
        editItem: null,
        openItem: null
      }
    this.newItem = this.newItem.bind(this);
    this.logout = this.logout.bind(this);
    this.checkLogin = this.checkLogin.bind(this)
    this.getItems = this.getItems.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.windowListener = debounce(function(){
      this.setState({openItem: null});
    }.bind(this),200,{leading:true, trailing:false})
  }
  logout(e) {
    e.preventDefault();

    if(!confirm("Are you sure you want to log out? ")) {
      return false;
    }
    let current = window.location.href;
    window.location.href = current+'form-process-user-logout.php?re='+current;
  }
  cancelForm(e) {
    this.setState({
      editing: false,
      editItem: false
    });
  }
  getItems() {
    axios.get(window.location.pathname+'api/get-items.php')
    .then(function (response) {

      let d = response.data;
      this.setState({
        today_posts: d.items,
        bottom_threshold: d.bottom_threshold,
        top_threshold: d.top_threshold,
        fetching_posts: false,
        edit_noonces: d.edit_noonces
      });

      return false;
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }
  checkLogin() {
    axios.get(window.location.pathname+'api/check-login.php')
    .then(function (response) {

      this.setState({
        checked_login: true,
        logged_in: response.data.logged_in,
        login_noonce: response.data.login_noonce,
      });
      if(response.data.logged_in) {
        this.setState({
          add_item_noonce: response.data.add_item_noonce,
          user: response.data.user
        });
      }
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });

  }
  componentDidMount() {

    window.addEventListener('scroll',this.windowListener);

    if(this.state.logged_in) {
      this.checkLogin();
      /*if not logged in, will do nothing*/
      this.getItems();
    }
    //this.checkLogin();

    this.loginListen = global.emitter.addListener('login-status',function(status, user){
      console.log(status);
      if(status) {
        this.setState({logged_in: true, checked_login: true});
        /*To GET ADD ITEM NOONCE*/
        this.checkLogin();
        this.getItems();
      }
      if(user) {
        this.setState({user:user});
      }
    }.bind(this));

    this.updateListen = global.emitter.addListener('update-item',function(item){
      let formdata = new FormData();
      formdata.set('id',item.id);
      formdata.set('update_noonce',this.state.edit_noonces['item_'+item.id]);
      formdata.set('post_title',item.post_title);
      let update_key = this.state.today_posts.findIndex(function(e){
        return parseInt(e.id) === parseInt(item.id);
      });
      let old_post = this.state.today_posts['update_key'];
      this.setState({today_posts : replaceItem(this.state.today_posts,item.id,item)});

      axios({
        method: 'post',
        url: window.location.pathname+'api/update-item.php',
        config: { headers: {'Content-Type': 'multipart/form-data' }},
        data: formdata
      })
      .then(function (response) {

        let newItem = response.data.item;

        this.setState({
          today_posts: replaceItem(this.state.today_posts, newItem.id,newItem),
          edit_noonces: updateNoonces(this.state.edit_noonces,response.data.noonce,newItem.id)
        });

        return false;
      }.bind(this))
      .catch(function (error) {


        this.setState({
          today_posts: replaceItem(this.state.today_posts,old_post.id,old_post),
          edit_noonces: updateNoonces(this.state.edit_noonces,error.response.data.noonce,old_post.id)
        });

        return false;
      }.bind(this));

    }.bind(this))

    this.deleteListen = global.emitter.addListener('delete-item',function(id,noonce){
      let formdata = new FormData();
      formdata.set('id',id);
      formdata.set('delete_noonce',this.state.edit_noonces['item_'+id]);
      let del_key = this.state.today_posts.findIndex(function(e) {
          return parseInt(e.id) === parseInt(id);
      });
      let del_item = this.state.today_posts[del_key];

      this.setState({today_posts: removeItem(this.state.today_posts, id)});
      axios({
        method: 'post',
        url: window.location.pathname+'api/delete-item.php',
        config: { headers: {'Content-Type': 'multipart/form-data' }},
        data: formdata
      })
      .then(function (response) {
        return false;
      }.bind(this))
      .catch(function (error) {

        this.setState({
          edit_noonces: updateNoonces(this.state.edit_noonces, error.response.data.noonce),
          today_posts: addItem(this.state.today_posts,del_item)
        });

        return false;
      }.bind(this));
      return false;
    }.bind(this));

    this.newItemListen = global.emitter.addListener('add-item',function(item){
      let formdata = new FormData();
      formdata.set('post_title',item.post_title);
      formdata.set('post_amount',item.post_amount);
      formdata.set('local_id',item.id);
      formdata.set('add_item_noonce',this.state.add_item_noonce);
      //ADD LOCALLY
      var local_id = item.id;
      this.setState({
        today_posts: addItem(this.state.today_posts,item),
        editing: null,
        editItem: {}
      });

      axios({
        method: 'post',
        url: window.location.pathname+'api/add-item.php',
        config: { headers: {'Content-Type': 'multipart/form-data' }},
        data: formdata
      })
      .then(function (response) {
        let d = response.data;
        this.setState({
          today_posts: replaceItem(this.state.today_posts,local_id,d.new_item),
          add_item_noonce: d.add_item_noonce,
          edit_noonces: updateNoonces(this.state.edit_noonces,d.noonce,d.new_item.id)
        })

        return false;
      }.bind(this))
      .catch(function (error) {
        console.log(error);

        this.setState({
          today_posts : removeItem(this.state.today_posts, local_id),
          add_item_noonce: error.response.data.add_item_noonce
        })
        return false;
      }.bind(this));
    }.bind(this))

  }
  componentWillUnmount() {
   this.loginListen.remove();
   this.newItemListen.remove();
   this.deleteListen.remove();
   this.updateListen.remove();
   window.removeEventListener('scroll',this.windowListener);
  }
  newItem(e) {
   e.preventDefault();
   let now = Math.floor(Date.now() / 1000)
   let item = {
    id: now,
    post_title: '',
    post_amount: '',
    post_date: now
   }
   this.setState({editing: "ADD", editItem: item});
  }

  render(props, state) {
    let disableAdd = false,
        editForm = null;
    if(!state.add_item_noonce) {
       disableAdd = true;
    }
    if( ( !state.logged_in)) {
      return <div class="app"><LoginForm /></div>;
    }
    if(state.editing) {
     editForm =  <ItemForm cancelForm={this.cancelForm}  editState={state.editing} item={state.editItem} />
    }
    return (
      <div>
      <div class="app">
        <header>
          <h1>What you ate today</h1>
        </header>
        <main>
          <List
      fetching_posts={state.fetching_posts}
      today_posts={state.today_posts}
      openItem={state.openItem}
      />
        </main>
        <nav>
          <NavButton disabled={disableAdd} type={"new-item"} copy={"Add Item"} clickAction={this.newItem} />

          <NavButton type={"logout"} copy={"Log Out"} clickAction={this.logout} />
        </nav>
      </div>
      {editForm}
      </div>

    )

  }
}

render(<App

       previousLogin={Cookies.get('ur_fat_remember_me')} />, document.getElementById('root'));
