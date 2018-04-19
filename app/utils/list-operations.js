function sorter(list,top,bottom) {
  let newItems = list.slice();
  newItems = newItems.filter(function(e){
    return e.post_date <= top && e.post_date >= bottom;
  });
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

function addItem(old_list, item, top_threshold, bottom_threshold) {
  let newItems = old_list.slice();
  newItems.push(item);
  return sorter(newItems,top_threshold,bottom_threshold);
}



function replaceItem(old_list, id, item, top_threshold, bottom_threshold) {
  let updatePosts = old_list.slice();
  var replace_index = updatePosts.findIndex(function(e) {
      return parseInt(e.id) === parseInt(id);
  });
  if(replace_index < 0) {
    return sorter(updatePosts,top_threshold,bottom_threshold);
  }
  updatePosts[replace_index] = item;
  
  return sorter(updatePosts,top_threshold,bottom_threshold);
}


export { removeItem, replaceItem, addItem };
