
//tmdb api constant for api key
const api = "api_key=bb6037731082012bd9d849e2238e71a8";

//url constant(base)
const base_url = "https://api.themoviedb.org/3";
const banner_url = "https://image.tmdb.org/t/p/original";
const img_url = "https://image.tmdb.org/t/p/w185";

//Movie data requests
/*genere IDs
MOVIE
Action          28
Adventure       12
Animation       16
Comedy          35
Crime           80
Documentary     99
Drama           18
Family          10751
Fantasy         14
History         36
Horror          27
Music           10402
Mystery         9648
Romance         10749
Science Fiction 878
TV Movie        10770
Thriller        53
War             10752
Western         37 

*/
const requests = {
    fetchNetflixOriginals: `${base_url}/discover/tv?${api}&with_network=213`,
    fetchComedyMovies: `${base_url}/discover/movies?${api}&with_genres=35`,
    fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
    fetchRomanceMovies: `${base_url}/discover/movies?${api}&with_genres=10749`,
    fetchThrillerMovies: `${base_url}/discover/movies?${api}&with_genres=53`,
    fetchFantasyMovies: `${base_url}/discover/movies?${api}&with_genres=14`,
    fetchMysteryMovies: `${base_url}/discover/movies?${api}&with_genres=9648`,
};


//a new approach using async and await
//BANNER

// truncate function for shortining the description
function truncate(str,n){
    return str?.lenght > n ? str.substr(0, n-1) + "..." : str;
}

async function fetchTrending() {
    try {
        const response = await fetch(requests.fetchTrending);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Randomly fetch a movie from the results
        const setMovie = data.results[Math.floor(Math.random() * data.results.length - 1)];

        // Update banner elements
        var banner = document.getElementById("banner");
        var banner_title = document.getElementById("banner_title");
        var banner_desc = document.getElementById("banner_description");

        banner.style.backgroundImage = "url(" + banner_url + setMovie.backdrop_path + ")";
        banner_desc.innerText = truncate(setMovie.overview, 150);
        banner_title.innerText = setMovie.name;
    } catch (error) {
        console.error('Error fetching Trending:', error.message);
    }
}


// Call the fetchNetflixOrigionals function to initiate the async operations
fetchTrending();


/*
//for shorting the description, truncate function

function truncate(str,n) {
    return str?.lenght > n ? str.substr(0, n -1) + "..." : str;
}

 //fetch movies for banner

 fetch(requests.fetchNetflixOriginals)
   .then((res) => res.json())

   .then((data) => {
    //random fetching of movies for banner
    const setMovie = 
        data.results[Math.floor(Math.random() * data.results.lenght -1)];
    
        var banner = document.getElementById("banner");
        var banner_title = document.getElementById("banner_title");
        var banner_desc = document.getElementById("banner_description");

        banner.style.backgroundImage = 
        "url(" + banner_url + setMovie.backdrop_path +")";
        banner_desc.innerText = truncate(setMovie.overview, 150);
        banner_title.innerText = setMovie.name;
         
   });
*/
  

//ROWS

//netflix originals row with async and await
async function fetchNetflixOriginals() {
    try {
        const response = await fetch(requests.fetchNetflixOriginals);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const head_row = document.getElementById("head_row");
        const row = document.createElement("div");
        row.className = "row";
        row.classList.add("netflixRow");
        head_row.appendChild(row);

        const title = document.createElement("h2");
        title.className = "row_title";
        title.innerText = "NETFLIX ORIGINALS";
        row.appendChild(title);

        const row_posters = document.createElement("div");
        row_posters.className = "row_posters";
        row.appendChild(row_posters);

        data.results.forEach((movies) => {
            const poster = document.createElement("img");
            poster.className = "row_posterlarge";

            // Remove spaces from movie name for the poster id
            var s1 = movies.name.replace(/\s+/g, "");
            poster.id = s1;
            
            // Assuming img_url is defined somewhere in your code
            poster.src = img_url + movies.backdrop_path;

            row_posters.appendChild(poster);
        });
    } catch (error) {
        console.error('Error fetching and rendering Netflix Originals:', error.message);
    }
}

// Call the fetchNetflixOriginals function to initiate the async operations
fetchNetflixOriginals();

/*
//netflix originals
fetch(requests.fetchNetflixOriginals)
.then((res) => res.json())

    .then((data) =>{
        const head_row = document.getElementById("head_row");
        const row = document.createElement("div");
        row.className = "row";
        row.classList.add("netflixRow");
        head_row.appendChild(row);

        const title = document.createElement("h2");
        title.className = "row_title";
        title.innerText = "Netflix Originals";
        row.appendChild(title);

        const row_posters = document.createElement("div");
        row_posters.className = "row_posters";
        row.appendChild(row_posters);


        data.results.foreach((movies) =>{

            const poster = document.createElement("img");
            poster.className = "row_posterlarge";

            var s = movies.name.replace(/\s+/g, "");
            //var s = movies.id;
            poster.id = s;
            poster.src = img_url + movies.backdrop_path;
            row_posters.appendChild(poster);

        }
        );
    });
*/


//comedy
fetch(requests.fetchComedyMovies)
.then((res) => res.json())

.then((data) =>{
    const head_row = document.getElementById("head_row");
    const row = document.createElement("div");
    row.className = "row";
    head_row.appendChild(row);

    const title = document.createElement("h2");
    title.className = "row_title";
    title.innerText = "Comedy movies";
    row.appendChild(title);

    const row_posters = document.createElement("div");
    row_posters.className = "row_posters";
    row.appendChild(row_posters);


    data.results.foreach((movies) =>{
        console.log(movies);
        const poster = document.createElement("img");
        poster.className = "row_poster";

        var s2 = movies.name.replace(/\s2+/g, "");
        //var s = movies.id;
        poster.id = s2;
        poster.src = img_url + movies.backdrop_path;
        row_posters.appendChild(poster);

    }
    );
    
});
//async await for comedy
async function fetchComedyMovies() {
    try {
        const response = await fetch(requests.fetchComedyMovies);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const head_row = document.getElementById("head_row");
        const row = document.createElement("div");
        row.className = "row";
        row.classList.add("comedyRow"); // Adjust the class name for comedy movies row
        head_row.appendChild(row);

        const title = document.createElement("h2");
        title.className = "row_title";
        title.innerText = "COMEDY MOVIES"; // Adjust the title
        row.appendChild(title);

        const row_posters = document.createElement("div");
        row_posters.className = "row_posters";
        row.appendChild(row_posters);

        data.results.forEach((movies) => {
            const poster = document.createElement("img");
            poster.className = "row_posterlarge";

            // Remove spaces from movie name for the poster id
            var s2 = movies.name.replace(/\s+/g, "");
            poster.id = s2;
            
            // Assuming img_url is defined somewhere in your code
            poster.src = img_url + movies.backdrop_path;

            row_posters.appendChild(poster);
        });
    } catch (error) {
        console.error('Error fetching and rendering Comedy Movies:', error.message);
    }
}

// Call the fetchComedyMovies function to initiate the async operations
fetchComedyMovies();


//trending now
fetch(requests.fetchTrending)
.then((res) => res.json())

.then((data) =>{
    const head_row = document.getElementById("head_row");
    const row = document.createElement("div");
    row.className = "row";
    head_row.appendChild(row);

    const title = document.createElement("h2");
    title.className = "row_title";
    title.innerText = "Trending Now";
    row.appendChild(title);

    const row_posters = document.createElement("div");
    row_posters.className = "row_posters";
    row.appendChild(row_posters);


    data.results.foreach((movies) =>{
        console.log(movies);
        const poster = document.createElement("img");
        poster.className = "row_posterlarge";

        var s2 = movies.name.replace(/\s2+/g, "");
        //var s = movies.id;
        poster.id = s2;
        poster.src = img_url + movies.backdrop_path;
        row_posters.appendChild(poster);

    }
    );
    
});


//romance
fetch(requests.fetchRomanceMovies)
.then((res) => res.json())

.then((data) =>{
    const head_row = document.getElementById("head_row");
    const row = document.createElement("div");
    row.className = "row";
    head_row.appendChild(row);

    const title = document.createElement("h2");
    title.className = "row_title";
    title.innerText = "Romance movies";
    row.appendChild(title);

    const row_posters = document.createElement("div");
    row_posters.className = "row_posters";
    row.appendChild(row_posters);


    data.results.foreach((movies) =>{

        const poster = document.createElement("img");
        poster.className = "row_posterlarge";

        var s3 = movies.name.replace(/\s+/g, "");
        //var s = movies.id;
        poster.id = s3 ;
        poster.src = img_url + movies.backdrop_path;
        row_posters.appendChild(poster);

    }
    );
});

//thiller movies
fetch(requests.fetchThrillerMovies)
.then((res) => res.json())

.then((data) =>{
    const head_row = document.getElementById("head_row");
    const row = document.createElement("div");
    row.className = "row";
    head_row.appendChild(row);

    const title = document.createElement("h2");
    title.className = "row_title";
    title.innerText = "Thiller Movies";
    row.appendChild(title);

    const row_posters = document.createElement("div");
    row_posters.className = "row_posters";
    row.appendChild(row_posters);


    data.results.foreach((movies) =>{

        const poster = document.createElement("img");
        poster.className = "row_posterlarge";

        var s = movies.name.replace(/\s+/g, "");
        //var s = movies.id;
        poster.id = s;
        poster.src = img_url + movies.backdrop_path;
        row_posters.appendChild(poster);

    }
    );
});

//fantasy movies
fetch(requests.fetchFantasyMovies)
.then((res) => res.json())

.then((data) =>{
    const head_row = document.getElementById("head_row");
    const row = document.createElement("div");
    row.className = "row";
    head_row.appendChild(row);

    const title = document.createElement("h2");
    title.className = "row_title";
    title.innerText = "Fantasy Movies";
    row.appendChild(title);

    const row_posters = document.createElement("div");
    row_posters.className = "row_posters";
    row.appendChild(row_posters);


    data.results.foreach((movies) =>{

        const poster = document.createElement("img");
        poster.className = "row_posterlarge";

        var s = movies.name.replace(/\s+/g, "");
        //var s = movies.id;
        poster.id = s;
        poster.src = img_url + movies.backdrop_path;
        row_posters.appendChild(poster);

    }
    );
});


//mystery movies

fetch(requests.fetchMysteryMovies)
.then((res) => res.json())

.then((data) =>{
    const head_row = document.getElementById("head_row");
    const row = document.createElement("div");
    row.className = "row";
    head_row.appendChild(row);

    const title = document.createElement("h2");
    title.className = "row_title";
    title.innerText = "Mystery Movies";
    row.appendChild(title);

    const row_posters = document.createElement("div");
    row_posters.className = "row_posters";
    row.appendChild(row_posters);


    data.results.foreach((movies) =>{

        const poster = document.createElement("img");
        poster.className = "row_posterlarge";

        var s = movies.name.replace(/\s+/g, "");
        //var s = movies.id;
        poster.id = s;
        poster.src = img_url + movies.backdrop_path;
        row_posters.appendChild(poster);

    }
    );
});


/*
async function fetchMysteryMovies() {
    try {
        const response = await fetch(requests.fetchMysteryMovies);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const head_row = document.getElementById("head_row");
        const row = document.createElement("div");
        row.className = "row";
        head_row.appendChild(row);

        const title = document.createElement("h2");
        title.className = "row_title";
        title.innerText = "Mystery Movies";
        row.appendChild(title);

        const row_posters = document.createElement("div");
        row_posters.className = "row_posters";
        row.appendChild(row_posters);

        data.results.forEach(async (movies) => {
            const poster = document.createElement("img");
            poster.className = "row_posterlarge";

            var s = movies.id;
            poster.id = s;
            
            // Assuming img_url is defined somewhere in your code
            poster.src = img_url + movies.backdrop_path;

            row_posters.appendChild(poster);
        });
    } catch (error) {
        console.error('Error fetching and rendering Mystery Movies:', error.message);
    }
}

// Call the fetchMysteryMovies function to initiate the async operations
fetchMysteryMovies();
*/


