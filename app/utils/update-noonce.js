export default function updateNoonces(old_list, new_noonce, item_id) {
  var newNoonces = Object.assign({}, old_list);
  newNoonces['item_'+item_id] = new_noonce;
  return newNoonces;

}
