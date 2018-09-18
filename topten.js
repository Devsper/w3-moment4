var fs = require('fs');
var Book = /** @class */ (function () {
    // Constructor binds values to properties
    function Book(theTitle, theFile, theIsbn) {
        this.title = theTitle;
        this.file = theFile;
        this.isbn = theIsbn;
    }
    // Method to fetch the top 10 words
    Book.prototype.getTopTenWords = function () {
        var message = "Top ten words of the title " + this.title + " ISBN: " + this.isbn;
        console.log(message);
        console.log(this.printSeparator(message));
        // Read File is a Node.js function
        fs.readFile(this.file, 'utf8', function (err, data) {
            if (err)
                throw err;
            // Split words into string Array
            var reg = /\n| /;
            var split = data.split(reg);
            // Removes all empty elements
            var clean = split.filter(function (element) { return element.length > 0; });
            var count = {};
            for (var _i = 0, clean_1 = clean; _i < clean_1.length; _i++) {
                var i = clean_1[_i];
                count[i] = (count[i] || 0) + 1;
            }
            var sorted = []; // Declare a new array
            for (var key in count) {
                sorted.push([key, count[key]]); // Create a new array for use - sorted[word] = count;
            }
            sorted.sort(function (a, b) { return a[1] - b[1]; }); // Sort the array based on the second element (count)
            sorted.reverse(); // Reverse the result array    
            // Removes all elements except top 10
            sorted = sorted.slice(0, 10);
            console.log(sorted);
        });
    };
    // Creates a separator string long as the sentence before
    Book.prototype.printSeparator = function (message) {
        var separator = "";
        for (var i = 0; i < message.length; i++) {
            separator += "=";
        }
        return separator;
    };
    return Book;
}());
var hitch = new Book("The Hitchhiker's Guide to the Galaxy", "hitch.txt", "0-330-25864-8");
hitch.getTopTenWords();
