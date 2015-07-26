#haiku_generator

This project is using words in cmudict to compose haikus in any combination of syllable formats. 

Haiku is usually formed with three lines, the first and last line contains words with total 5 syllables, the middle line contains words with total 7 syllables. 

However, you can generate any format as you like.  

Format example: [[2,3], [1,3,3], [3,2]].
Notice this nested array has three array elements which stands for three lines, and each array element contains numbers for how many syllables you want for each line of words. Add more lines or change the numbers to create your own format! 

Download this project, make sure you have nodeJS and underscore.js installed. In command line: 
<br node haiku.js generate[[2,3], [1,3,3], [3,2]] />

-> replace '[[2,3], [1,3,3], [3,2]]' with your format! Have fun (:
