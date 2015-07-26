var fs = require("fs");
var _ = require('underscore');


//identify if each phoneme of passed-in 'word' is a syllable (always return either 1 or 0; 1 meaning phon is a syllable , comparing to 'array', a fixed array of pre-defined syllables.
function countSyl(array, word){
	var countNum = 0;
	array.forEach(function(a){
		//if the phoneme contains number (emphasize level), get rid of the number for accurate comparison.
		if(word.match(/\d/)){
		    var w = word.replace(/[0-9]/g, '');
			if(a === w){
				countNum++
			}
		}
		else{
		    if(a === word){
		        countNum++
		    }
		}
	});
	return countNum;
}

//store all words and how many syllables they contain in an array. 
//each stored element has format of [word, countOfSyllables].
var dic = [];

//fixed array of syllables. 
var syllables = ['AO', 'AA', 'IY', 'UW', 'EH', 'IH', 'UH', 'AH', 'AX', 'AE', 'EY', 'AY', 'OW', 'AW', 'OY'];

// open the cmu dictionary file for "reading" (the little r)
// cmudict_file = File.open('cmudict.txt', 'r')
fs.readFile('cmudict.txt', function(err, data) {

  if(err) {
    return console.log(err);
  }
  
  var len_l1 = 0;
  var len_l2 = 0;
  var len_l3 = 0;
  var length = 0;
  var lines = data.toString().split("\n")
  lines.forEach(function(line){
    line_split = line.split("  ");
    //if directly call split on line_split, throws TypeError: Cannot call method 'split' of undefined
    //this is the main reason of using underscore since it dooesn't trigger above error.
    _.each(line_split, function(symbols){
    	var phoneme = symbols.split(" ");
    	var count = 0;
    	phoneme.forEach(function(phon){
    		if(countSyl(syllables, phon) === 1){
    			count++;
    		}
    	})
    	if(count !== 0){
    		dic.push([line_split[0], count]);
    	}

    })
    
  });

//each time calling dic.length takes exceptionally long time
//storing this value into a seperate variable improved performance.
var range = dic.length - 1;

//random function generates a word element based on giving number of syllables
var random = function(numOfSyl){
	var word = dic[Math.floor(Math.random()*range)];
	//if word generated does not contain desired syllable count, recursively calling itself until it finds the word.
	if (word[1] != numOfSyl){
		return random(numOfSyl);
	}
	return word;
}


//function generate takes a nested array for any combination of haiku format. Then spits out the HAIKU!! 
var generate = function(array){
	var string = "";
	_.each(array, function(a){
		_.each(a, function(sylCount){
			string += random(sylCount)[0] + " ";
		})
		string += "\n";
	});
	console.log(string);
			
};

//generate([[2,3], [1,3,3], [3,2]]);
//generate([[1,3,1], [2,1,2,1,1], [1,2,1,1]]);

});

