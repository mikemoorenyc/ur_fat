import { h, render, Component  } from 'preact';
import linkState from 'linkstate';
import axios from 'axios';


export default class ItemForm extends Component {
  constructor(props) {
    super();
    this.state = {
     opened: false,
     item: {},
     method: null
    }
    this.resetForm = this.resetForm.bind(this);
  }
  
  componentDidMount() {
    this.openItemListener = global.emitter.addListener('open-item-form',function(item, method){
      this.setState({
        item: item,
        method: method,
        opened: true
      });
    }.bind(this))
    
  }
  componentWillUnmount() {
   this.openItemListener.remove();
  }
  resetForm() {
   this.setState({
    item: {},
    method: null,
    opened: false
   }); 
  }
  render(props,state) {
   if(!state.opened) {
    return null; 
   }
   let submitText = "Add";
   if(state.method === "UPDATE") {
     submitText = "Save";
   }
   <div>
      
      <button onClick={this.resetForm}>Cancel</button>   
      <button>{submitText}</button>
   </div>
    
    
  }
  
  
  
  
}
