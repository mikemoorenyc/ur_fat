import { h, render, Component } from 'preact';
import DeleteBtn from '../components/DeleteBtn.js';
import UpdateBtn from '../components/UpdateBtn.js';

var Hammer = require('hammerjs');

export default class ListItem extends Component {
  constructor(props) {
    super();

    this.itemDOM = null;
    this.getItemDOM = function(element) {
      this.itemDOM = element;
    }.bind(this);

  }
  componentDidMount() {
    this.swipeDetector = new Hammer(this.itemDOM);

    this.swipeDetector.on('swipe',function(ev){
      if(ev.direction === 2) {
        global.emitter.emit('list-item-open', this.props.item.id);
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
   let amt = '';
   let of = '';
   let classList = "list-item ";
   if(props.openItem === props.item.id) {
    classList += 'opened';
   }
   if(props.item.post_amount && isNaN(props.item.post_amount)) {
     of = 'of '
   }
   if(props.item.post_amount) {
    amt =  <span><strong>{props.item.post_amount}</strong> {of} </span>
   }
   return(
    <div ref={this.getItemDOM} class={classList}>
       <div class="slider">
        <div class="post-title">{amt}{props.item.post_title}</div>
        <DeleteBtn id={props.item.id}/>
        <UpdateBtn item={props.item} />
       </div>
    </div>

   )


  }





}
