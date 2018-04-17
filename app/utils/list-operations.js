function sorter(list) {
  let newItems = list.slice();
  newItems.sort(function(a,b){
    return a.post_date - b.post_date;
  });
  newItems.reverse();
  return newItems;
}


function removeItem(old_list, id) {
  return old_list.filter(function(e,i){
    return parseInt(e.id) !== parseInt(id);
  });
}

function addItem(old_list, item) {
  let newItems = old_list.slice();
  newItems.push(item);
  return sorter(newItems);
}



function replaceItem(old_list, id, item) {
  let updatePosts = old_list.slice();
  var replace_index = updatePosts.findIndex(function(e) {
      return parseInt(e.id) === parseInt(id);
  });
  if(replace_index < 0) {
    return sorter(updatePosts);
  }
  updatePosts[replace_index] = item;
  return sorter(updatePosts);
}


export { removeItem, replaceItem, addItem };
