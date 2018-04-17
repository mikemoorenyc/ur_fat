

import Cookies from 'js-cookie';
import { h, render, Component  } from 'preact';

import axios from "axios";

var {EventEmitter} = require('fbemitter');
global.emitter = new EventEmitter();


import LoginForm from './components/login-form';
import ItemForm from './components/item-form.jsx';
import List from './components/List.js';

import updateNoonces from './utils/update-noonce.js';
import { removeItem, addItem, replaceItem } from './utils/list-operations.js';

class App extends Component {
  constructor(props) {
      super();

      this.state = {
        logged_in : false,
        user: null,
        checked_login: false,
        login_noonce: null,
        day: 0,
        form_opened: false,
        add_item_noonce: null,
        today_posts: [],
        edit_noonces: []
      }
    this.newItem = this.newItem.bind(this);

  }
  componentDidMount() {

    axios.get(window.location.pathname+'api/check-login.php')
    .then(function (response) {

      this.setState({
        checked_login: true,
        logged_in: response.data.logged_in,
        login_noonce: response.data.login_noonce,
        add_item_noonce: response.data.add_item_noonce,
        today_posts: response.data.today_posts,
        edit_noonces: response.data.edit_noonces
      });
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });

    this.loginListen = global.emitter.addListener('login-status',function(status, user){
      if(status) {
        this.setState({logged_in: true});
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
      formdata.set('local_id',item.id);
      formdata.set('add_item_noonce',this.state.add_item_noonce);
      //ADD LOCALLY
      var local_id = item.id;
      this.setState({
        today_posts: addItem(this.state.today_posts,item)
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
  }
  newItem(e) {
   e.preventDefault();

   let item = {
    id: Date.now(),
    post_title: '',
    amount: '',
    notes: ''
   }
   global.emitter.emit('open-item-form', item,"ADD");
  }

  render(props, state) {
    let status = 'logged in';
    if( !state.checked_login) {
      return (<div>Loggin you in</div>);
    }
    if(!state.logged_in ) {
      return (<LoginForm login_noonce={this.state.login_noonce}/>);
    }

    return (
      <div>
        <button onClick={this.newItem}>New Item</button>
        <List
        today_posts={state.today_posts}
        />
        <ItemForm />
      </div>
    )

  }
}

render(<App dog={"house"} />, document.getElementById('app'));
