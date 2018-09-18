declare function require(name:string); // Make it possible to use require in TypeScript
    
const fs = require('fs');

class Book {

    // Properties of class Book
    title: string;
    file: string; // Where the file can be found
    isbn: string;

    // Constructor binds values to properties
    constructor(theTitle: string, theFile: string, theIsbn: string){

                    this.title = theTitle;
                    this.file = theFile;
                    this.isbn = theIsbn;
                }

    // Method to fetch the top 10 words
    public getTopTenWords(): void{
        
        let message: string = `Top ten words of the title ${this.title} ISBN: ${this.isbn}`;

        console.log(message);
        console.log(this.printSeparator(message));

        // Read File is a Node.js function
        fs.readFile(this.file, 'utf8', function(err, data) :void{ // Read all of the file content 
            if (err) throw err;

            // Split words into string Array
            let reg: RegExp = /\n| /;
            let split: string[] = data.split(reg);    

            // Removes all empty elements
            let clean: string[] = split.filter(element => element.length > 0);

            let count: object = {};

            for(let i of clean){

                count[i] = (count[i]||0) + 1;
            }

            let sorted: any = []; // Declare a new array

            for (let key in count){
                sorted.push([key, count[key]]); // Create a new array for use - sorted[word] = count;
            }

            sorted.sort(function (a:number, b:number): number { return a[1] - b[1] }); // Sort the array based on the second element (count)
            sorted.reverse(); // Reverse the result array    

            // Removes all elements except top 10
            sorted = sorted.slice(0,10);
            
            console.log(sorted);
        });  
    }

    // Creates a separator string long as the sentence before
    private printSeparator(message): string{

        let separator: string = "";

        for (let i = 0; i < message.length; i++) {
           separator += "=";
        }

        return separator;
    }
}

let hitch: Book = new Book("The Hitchhiker's Guide to the Galaxy", "hitch.txt", "0-330-25864-8");

hitch.getTopTenWords();

