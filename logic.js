var group1 = ['a', 'e', 'i', 'o', 'u'];
var group2 = ['c', 'g', 'j', 'k', 'q', 's', 'x', 'y', 'z'];
var group3 = ['b', 'f', 'p', 'v', 'w'];
var group4 = ['d', 't'];
var group5 = ['m', 'n'];
var groups = [group1,group2, group3, group4, group5];
var wordsList = ['angel','brave','Braev','Don','Engel','go','goal','son','sunny','Tom','Tooonnnnyyyy'];
$("#list").val(wordsList.join("\n"));
var formatedList = [];
function formatWordList(wordsList){
  temp = [];
  $.each(wordsList, function(index,val){
    temp.push(formatWord(val));
  });
  formatedList = temp;
};

$("#name").val("brief");
function formatWord(inputWord){
  //1st non alfabetic letter must be ignored and there wont be any difference in case of upper case or lower case letters
  inputWord = inputWord.toLocaleLowerCase().replace(/[^a-z]/g,"");

  //2st I need to remove any A, E, I, H, O, U, W, Y. from the input word in case it isnt the first letter
  inputWord = inputWord.substring(1,0)+inputWord.substring(1).replace(/([aeiou])*/g, "");

  //remove consecutive letters
  inputWord = inputWord.replace(/([a-z])\1+/g, function (str, match) {
    return match[0];
  });

  //finally, display the result on the screen
  return inputWord;
}
function phoneticSearch(targetWord){
  var result = [];
  $.each(formatedList, function(index,listItem){ //for each word of the list
    for (var x=0;x<listItem.length;x++){ //for each word type by the user
      //listItem[x]   // letter of the words of the list
      //targetWord[x]  //letter of the word written by the user
      var count = 0;   //if it gets to 2 its gonna be phonetic equal
      for (var t=0;t<groups.length -1;t++){
        if ( groups[t].join("").indexOf(listItem[x]) > -1 && groups[t].join("").indexOf(targetWord[x]) > -1 ){
          count++;
          t = -1; //I need to check every group again
          if (count == 2){ //it found!!!!
            result.push(wordsList[index]);  //I need to add from the original array of words 
            return;  //two consecutive words is enough. 
          }
        }
      }
    } 
  });
  return result.join(", ");
}
$(".btn").click(function(){
  var formatedWord, result = "";
  var wordsToSearch = $("#name").val().split(" "); // get all the values to search
  wordsList = $("#list").val().split("\n");
  formatWordList(wordsList);  //get all the values of the list and then put it in a array and then format
  $.each(wordsToSearch, function(ind,word){
    formatedWord = formatWord(word);
    result += word + ": " +phoneticSearch(formatedWord)+'<br>';
  });
  $(".result").html(result);
});