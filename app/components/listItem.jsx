import { h, render, Component } from 'preact';
import DeleteBtn from '../components/DeleteBtn.js';
import UpdateBtn from '../components/UpdateBtn.js';

export default class ListItem extends Component {
  constructor(props) {
    super();
  }
  
  
  render(props,state) {
   let amt = '';
   let classList = "list-item ";
   if(props.openItem === props.item.id) {
    classList += 'opened'; 
   }
   if(props.item.post_amount) {
    amt =  <span><strong>{props.item.post_amount}</strong> of </span>  
   }
   return(
    <div class={classList}>
       <h2>{amt}{props.item.post_title}</h2> 
       <div class="item-controls">
         <DeleteBtn id={props.item.id}/>
         <UpdateBtn item={props.item} />
       </div>
       
    </div>
   
   ) 
    
    
  }
  
  
  
  
  
}
