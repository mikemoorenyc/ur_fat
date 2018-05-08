import { h, render, Component } from 'preact';
import DeleteBtn from '../components/DeleteBtn.js';
import UpdateBtn from '../components/UpdateBtn.js';
import axios from "axios";
var Hammer = require('hammerjs');

export default class ListItem extends Component {
  constructor(props) {
    super();
    this.state = {
     del_nonce : null
    }
    this.itemDOM = null;
    this.getItemDOM = function(element) {
      this.itemDOM = element;
    }.bind(this);
    this.getDelNonce = this.getDelNonce.bind(this);
  }
  getDelNonce() {
    let formdata = new FormData();
    let nonce_key =  'edit_'+this.props.item.id+'_noonce' ;

    formdata.set('noonce_key',nonce_key);
    axios({
      method: 'post',
      url: window.location.pathname+'api/create-noonce.php',
      config: { headers: {'Content-Type': 'multipart/form-data' }},
      data: formdata
    })
    .then(function (response) {
      this.setState({del_nonce: response.data[nonce_key]});

    }.bind(this))
    .catch(function (error) {
      alert('Could not get a login noonce');
    })

  }
  componentDidMount() {
    this.swipeDetector = new Hammer(this.itemDOM);

    this.swipeDetector.on('swipe',function(ev){
      if(ev.direction === 2) {
        global.emitter.emit('list-item-open', this.props.item.id);
        this.getDelNonce();
      }
      if(ev.direction == 4) {
        global.emitter.emit('list-item-open', null);
      }
    }.bind(this))
  }
  componentWillUnmount() {
    this.swipeDetector.destroy();
  }

  render(props,state) {
   let  of = (props.item.post_amount && isNaN(props.item.post_amount))? "of " : '',
        amt = (props.item.post_amount)? <span><strong>{props.item.post_amount}</strong> {of} </span> : '',
        classList = "list-item ";
   if(props.openItem === props.item.id) {
    classList += 'opened';
   }

   return(
    <div ref={this.getItemDOM} class={classList}>
       <div class="slider">
        <div class="post-title">{amt}{props.item.post_title}</div>
        <DeleteBtn del_nonce={state.del_nonce} id={props.item.id}/>
        <UpdateBtn item={props.item} />
       </div>
    </div>

   )


  }





}
