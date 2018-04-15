import { h, render, Component  } from 'preact';
import linkState from 'linkstate';

import DeleteBtn from '../components/DeleteBtn.js';


export default class List extends Component {
  constructor(props) {
    super();

  }


  render(props,state) {
    if(!props.today_posts.length) {
      return false;
    }

    let items = props.today_posts.map(function(e,i){
      return (

        <div className="item" key={e.id} data-id={e.id}>{e.post_title} <b>{e.id}</b>
          <br/>
          <DeleteBtn id={e.id} noonce={e.delete_noonce} />
          <br/><br/>
        </div>
      );
    }.bind(this));
    return (
      <div className="items">
      {items}
      </div>
    )
  }
}
