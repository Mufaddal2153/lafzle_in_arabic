select_five_letter_word = function(){
    var cat_list_rand = Math.floor(Math.random() * categories.length);
    for(i=0;i<categories[cat_list_rand].length;i++){
        if(categories[cat_list_rand][i].word.length == 5){
            return categories[cat_list_rand][i];
        }
    }
}