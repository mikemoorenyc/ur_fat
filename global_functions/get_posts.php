<?php
function get_posts($from=null,$to=null,$user_id=null,$limit=null,$page=null) {
  global $db_conn;
 $where_queries = [];
 if($user_id) {
  $where_queries[] = 'author ='.intval($user_id);
 }
 if($from) {
  $where_queries[] = "post_date >=".intval($from);
 }
 if($to) {
  $where_queries[] = "post_date <=".intval($to);
 }
 if($limit && intval($limit) > 0) {
   $limit_query = "LIMIT ".intval($limit)." ";
 }

 if(!empty($where_queries)) {
  $where_query = 'WHERE '.implode(' AND ', $where_queries)." ";
 }


 if($page && intval($page) > 0) {
   $offset_query = "OFFSET ".((intval($page) - 1) * intval($limit))." ";
 }

 $post_query = "SELECT * FROM posts ".$where_query."ORDER BY post_date DESC ".$limit_query.$offset_query;

 $db_posts = mysqli_query($db_conn, $post_query);
 if($db_posts) {
  if($db_posts->num_rows < 1) {
   return array();
  }
  while ($row = $db_posts->fetch_assoc()) {
    $rows[] = $row;
  }
  return $rows;

 } else {
  return false;
 }




}
