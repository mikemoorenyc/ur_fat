import { h, render } from 'preact';
import linkState from 'linkstate';

import ListItem from '../components/listItem.jsx';

export default function List(props) {
  if(!props.today_posts.length) {
      return false;
    }
    let loadingClass = (props.fetching_posts && !props_today_posts.length)? "loading" : '';
    let emptyState = (!props.fetching_posts && !props_today_posts.length) <div className="empty">You haven&rsquo;t eaten anything today.</div> : false;
    let items = props.today_posts.map(function(e,i){

      return (
        <ListItem key={e.id} item={e} openItem={props.openItem} />
      );
    }.bind(this));
    return (
      <div className={"list-items "+loadingClass}>
      {emptyState}
      {items}
      </div>
    )

}
