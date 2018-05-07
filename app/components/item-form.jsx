import { h, render, Component  } from 'preact';
import linkState from 'linkstate';


export default class ItemForm extends Component {
  constructor(props) {
    super();
    let endpoint = (props.editState === "UPDATE") ? 'update-item' : "add-item";
    this.state = {
     id: props.item.id,
     title: props.item.post_title,
     amount: props.item.post_amount,
     date: props.item.post_date,
     method: props.editState,
     endpoint: endpoint,
     transState: '',
     nonce: null
    }
    this.resetForm = this.resetForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.autoFocus = null;
    this.getFocus = function(element) {
      this.autoFocus = element;
    }.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    if(!this.state.title) {
      return false;
    }

    let item = {
      id: this.state.id,
      post_title: this.state.title,
      post_amount: this.state.amount,
      post_date:this.state.date,
      noonce: this.state.noonce
    }
    global.emitter.emit(this.state.endpoint, item, this.state.nonce);
    this.resetForm(e);
  }
  resetForm(e) {
    e.preventDefault();
    this.setState({transState: 'translateX(100%)'});
    setTimeout(this.props.cancelForm,150)
  }
  componentDidMount() {
    this.setState({transState: 'translateX(0)'});
    if(this.autoFocus && this.state.method == "ADD") {
      this.autoFocus.focus();
    }
    let formdata = new FormData();
    let nonce_key = (this.state.endpoint === "update-item") ? 'edit_'+this.state.id+'_noonce' : "add_item_noonce";
 
    formdata.set('noonce_key',nonce_key);
    axios({
      method: 'post',
      url: window.location.pathname+'api/create-noonce.php',
      config: { headers: {'Content-Type': 'multipart/form-data' }},
      data: formdata
    })
    .then(function (response) {
      this.setState({nonce: response.data[nonce_key]});
      
    }.bind(this))
    .catch(function (error) {
      alert('Could not get a login noonce');
    })
  }
  render(props,state) {

   let submitText = "Add";
   if(state.method === "UPDATE") {
     submitText = "Save";
   }
   let disabled = false;
   if(state.title.length < 1 || !state.nonce) {
      disabled = true;
   }
   return (

     <div>
      <div class="item-form-overlay"></div>
      <div class="app item-form" style={{transform: state.transState}}>
        <header class="with-buttons">
          <div class="button-holder"><button type="reset" class="secondary" onClick={this.resetForm}>Cancel</button></div>
          <h1>MORE food?!</h1>
          <div class="button-holder"><button type="reset" disabled={disabled} onClick={this.submitForm}>{submitText}</button></div>
        </header>
        <main>
          <form onSubmit={this.submitForm} method="POST" action={this.state.endpoint}>
          <div class="form-row">
            <label>What did you eat?</label>
            <input ref={this.getFocus} type="text" value={state.title} onInput={linkState(this, 'title')} required class="input-text"/>
          </div>
          <div class="form-row">
            <label>How much did you eat?</label>
            <input type="text" value={state.amount} onInput={linkState(this, 'amount')}  class="input-text"/>
          </div>
            <button disabled={disabled} style={{width: 0, height: 0, display:"block", visibility:"hidden", fontSize: "0px"}} type="submit">{submitText}</button>
         </form>

        </main>
      </div>
     </div>

   )


  }




}
