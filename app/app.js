

import Cookies from 'js-cookie';
import { h, render, Component  } from 'preact';

import axios from "axios";

var {EventEmitter} = require('fbemitter');
global.emitter = new EventEmitter();


import LoginForm from './components/login-form';
import ItemForm from './components/item-form.jsx';
import List from './components/List.js';

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
        today_posts: []
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
        today_posts: response.data.today_posts
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
    }.bind(this))

    this.deleteListen = global.emitter.addListener('delete-item',function(id,noonce){
      let formdata = new FormData();
      formdata.set('id',id);
      formdata.set('delete_noonce',noonce);
      let del_key = this.state.today_posts.findIndex(function(e) {
          return parseInt(e.id) === parseInt(id);
      });
      let del_item = this.state.today_posts[del_key];
      let updated_posts = this.state.today_posts.filter(function(e,i){
        return parseInt(e.id) !== parseInt(id);
      });
      this.setState({today_posts: updated_posts});
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
        updated_posts.push(del_item);

        updated_posts.sort(function(a,b){
          return a.post_date - b.post_date;
        });
        updated_posts.reverse();
        this.setState({today_posts: updated_posts});
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
      let newItems = this.state.today_posts.slice();
      var local_id = item.id;
      newItems.push(item);

      newItems.sort(function(a,b){
        return a.post_date - b.post_date;
      });
      newItems.reverse();

      this.setState({
        today_posts: newItems
      });


      axios({
        method: 'post',
        url: window.location.pathname+'api/add-item.php',
        config: { headers: {'Content-Type': 'multipart/form-data' }},
        data: formdata
      })
      .then(function (response) {
        let updatePosts = this.state.today_posts.slice();
        var replace_index = updatePosts.findIndex(function(e) {
            return parseInt(e.id) === parseInt(local_id);
        });
        updatePosts[replace_index] = response.data.new_item;
        this.setState({
          today_posts: updatePosts,
          add_item_noonce: response.data.add_item_noonce
        });
        return false;
      }.bind(this))
      .catch(function (error) {
        let updatePosts = this.state.today_posts.filter(function(e,i){
          return parseInt(e.id) !== parseInt(local_id);
        });
        this.setState({
          today_posts : updatePosts,
          add_item_noonce: error.response.data.add_item_noonce
        })
      }.bind(this));
    }.bind(this))

  }
  componentWillUnmount() {
   this.loginListen.remove();
   this.newItemListen.remove();
  }
  newItem(e) {
   e.preventDefault();

   let item = {
    id: Date.now(),
    title: '',
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
