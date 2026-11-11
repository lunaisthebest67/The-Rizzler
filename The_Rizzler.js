
/* ========================================
   THE RIZZLER
   JAVASCRIPT
======================================== */


/* ========================================
   SLANG DATABASE
======================================== */
async function parseCsvFile(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      download:true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error)
    });
  });
}


const definitionfilepath = "newdefs.csv";

const parse_results = await parseCsvFile(definitionfilepath);

function convert_parse_results_to_slang_dictionary(results) {
    const return_value = {};
    for (const result of results) {
        const key = result.word;
        const value = {
            "type" : result.type,
            "definition" : result.definition,
            "example" : result.example
        };

        return_value[key] = value;
    }
    return return_value;
}

// console.log(parse_results);
const slangDictionary = convert_parse_results_to_slang_dictionary(parse_results);
console.log(slangDictionary);



/* ========================================
   HOMEPAGE SEARCH
======================================== */

const searchForm =
    document.getElementById("searchForm");


if (searchForm) {

    searchForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const input =
                document.getElementById("searchInput");


            const word =
                input.value.trim();


            if (word === "") {
                return;
            }


            /*
                Send the user to the
                SEPARATE results page.
            */

            window.location.href =
                `The_Results.html?word=${encodeURIComponent(word)}`;

        }
    );

}


/* ========================================
   RANDOM WORD
======================================== */

const randomButton =
    document.getElementById("randomButton");


if (randomButton) {

    randomButton.addEventListener(
        "click",
        function() {

            const words =
                Object.keys(slangDictionary);


            const randomIndex =
                Math.floor(
                    Math.random() * words.length
                );


            const randomWord =
                words[randomIndex];


            window.location.href =
                `The_Results.html?word=${encodeURIComponent(randomWord)}`;

        }
    );

}


/* ========================================
   RESULTS PAGE
======================================== */

const wordResult =
    document.getElementById("wordResult");


if (wordResult) {


    /* ------------------------------------
       GET WORD FROM URL
    ------------------------------------ */

    const parameters =
        new URLSearchParams(
            window.location.search
        );


    const searchedWord =
        parameters.get("word");


    const noResult =
        document.getElementById("noResult");


    const searchInput =
        document.getElementById(
            "resultsSearchInput"
        );


    /* ------------------------------------
       PUT SEARCHED WORD IN SEARCH BAR
    ------------------------------------ */

    if (searchedWord) {

        searchInput.value =
            searchedWord;

    }


    /* ------------------------------------
       NORMALIZE WORD
    ------------------------------------ */

    const normalizedWord =
        searchedWord
            ?.trim()
            .toLowerCase();


    /* ------------------------------------
       FIND WORD
    ------------------------------------ */

    const entry =
        slangDictionary[normalizedWord];


    /* ====================================
       WORD FOUND
    ==================================== */

    if (entry) {


        document
            .getElementById("wordTitle")
            .textContent = normalizedWord;


        document
            .getElementById("wordType")
            .textContent = entry.type;


        document
            .getElementById("wordDefinition")
            .textContent = entry.definition;


        document
            .getElementById("wordExample")
            .textContent =
                `"${entry.example}"`;


        wordResult
            .classList
            .remove("hidden");


        noResult
            .classList
            .add("hidden");

    }


    /* ====================================
       WORD NOT FOUND
    ==================================== */

    else {


        wordResult
            .classList
            .add("hidden");


        noResult
            .classList
            .remove("hidden");


        document
            .getElementById("searchedWord")
            .textContent =
                `"${searchedWord}"`;

    }

    /* ====================================
    SUBMIT SLANG BUTTON
    ==================================== */

    const submitSlangButton =
        document.getElementById("submitSlangButton");

    if (submitSlangButton) {
        submitSlangButton.addEventListener("click", function() {
            window.open(
                "https://forms.gle/XjCcrU3XhhdH6YcZ8",
                "_blank"
            );

        });

}


    /* ====================================
       SEARCH AGAIN
    ==================================== */

    const resultsSearchForm =
        document.getElementById(
            "resultsSearchForm"
        );


    resultsSearchForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const newWord =
                searchInput.value.trim();


            if (newWord === "") {
                return;
            }


            window.location.href =
                `The_Results.html?word=${encodeURIComponent(newWord)}`;

        }
    );

}

