$(document).ready(function () {
    const $carousel = $(".movie-carousel");
    const $overlay = $("#transition-overlay");
    const $container = $("#trailer-container");
    const $frame = $("#trailer-frame");
    const $suggestionsBox = $("#search-suggestions");

    let currentTrailerUrl = "";

    // Fade out initial overlay after page loads
    $("#transition-overlay2").fadeOut(2000);

    // List of movie data used throughout the site
    const movieData = [
        {
            slug: "gundala",
            title: "Gundala",
            meta: "2019 | 16+ | 1 Season | Superhero",
            description: "Saat para pemimpin tidak peduli pada rakyat, seorang pahlawan muncul dari rakyat biasa. Gundala hadir melawan ketidakadilan dan korupsi.",
            poster: "gundala_poster.jpg",
            trailer: "https://www.youtube.com/embed/RyP4VidA_4o",
        },
        {
            slug: "avenger",
            title: "Avengers: Endgame",
            meta: "2019 | 13+ | 3h 1min | Action",
            description: "Para Avengers berkumpul kembali untuk mengalahkan Thanos dan mengembalikan alam semesta.",
            poster: "avenger_poster.jpg",
            trailer: "https://www.youtube.com/embed/TcMBFSGVi1c",
        },
        {
            slug: "venom",
            title: "Venom",
            meta: "2018 | 13+ | 1h 52min | Sci-Fi",
            description: "Seorang jurnalis mendapatkan kekuatan super dari alien simbiont dan menjadi Venom.",
            poster: "venom_poster.jpg",
            trailer: "https://www.youtube.com/embed/u9Mv98Gr5pY",
        },
        {
            slug: "deadpool2",
            title: "Deadpool 2",
            meta: "2018 | 17+ | 2h | Action/Comedy",
            description: "Deadpool kembali dengan humor gelap dan tim mutan baru untuk menyelamatkan dunia.",
            poster: "deadpool2_poster.png",
            trailer: "https://www.youtube.com/embed/D86RtevtfrA",
        },
        {
            slug: "joker",
            title: "Joker",
            meta: "2019 | 17+ | 2h 2min | Drama/Thriller",
            description: "Seorang pria terpinggirkan berubah menjadi simbol kekacauan dalam kota Gotham.",
            poster: "joker_poster.jpg",
            trailer: "https://www.youtube.com/embed/zAGVQLHvwOY",
        },
        {
            slug: "spidermannowayhome",
            title: "Spider-Man: No Way Home",
            meta: "2021 | 13+ | 2h 28min | Superhero",
            description: "Identitas Peter Parker terungkap, dan ia harus menghadapi multiverse yang kacau.",
            poster: "spidermannowayhome_poster.jpg",
            trailer: "https://www.youtube.com/embed/JfVOs4VSpmA",
        },
        {
            slug: "blackpanther",
            title: "Black Panther",
            meta: "2018 | 13+ | 2h 14min | Action",
            description: "T’Challa kembali ke Wakanda untuk menjadi raja, tapi musuh lama mengancam kedamaian.",
            poster: "blackpanther_poster.jpg",
            trailer: "https://www.youtube.com/embed/xjDjIWPwcPU",
        },
        {
            slug: "interstellar",
            title: "Interstellar",
            meta: "2014 | 13+ | 2h 49min | Sci-Fi/Drama",
            description: "Para penjelajah luar angkasa mencari planet baru untuk menyelamatkan umat manusia.",
            poster: "interstellar_poster.jpg",
            trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
        },
    ];

    // Populate the carousel with movie posters

    movieData.forEach((movie) => {
        $carousel.append(`
            <div>
                <img src="assets/img/${movie.poster}" alt="${movie.title}" data-slug="${movie.slug}" />
            </div>
        `);
    });

    // Handle movie poster click
    $(".movie-carousel img").on("click", function () {
        // Get the index based on Slick carousel's data
        const slug = $(this).data("slug");
        const movie = movieData.find((m) => m.slug === slug);
        // const movie = movieData[index];
        console.log(movie);
        currentTrailerUrl = movie.trailer;

        // Show transition overlay and reset trailer
        $overlay.addClass("show");
        $container.addClass("d-none");
        $frame.attr("src", "");

        // Update movie information and background after delay
        setTimeout(() => {
            $(".movie-hero-text h1").text(movie.title);
            $(".movie-hero-text .movie-meta").text(movie.meta);
            $(".movie-hero-text .movie-description").text(movie.description);

            $("body").css("background", `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('assets/img/${movie.slug}.jpg') no-repeat center center/cover`);
        }, 600);

        // Hide transition overlay after change
        setTimeout(() => {
            $overlay.removeClass("show");
        }, 1000);
    });

    // Set default movie info on first load
    const defaultMovie = movieData[3];
    currentTrailerUrl = defaultMovie.trailer;

    $(".movie-hero-text h1").text(defaultMovie.title);
    $(".movie-hero-text .movie-meta").text(defaultMovie.meta);
    $(".movie-hero-text .movie-description").text(defaultMovie.description);
    $("body").css("background", `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('assets/img/${defaultMovie.slug}.jpg') no-repeat center center/cover`);

    // Determine number of slides based on screen width
    let slidesToShow;
    if (window.innerWidth < 768) {
        slidesToShow = 3;
    } else if (window.innerWidth < 992) {
        slidesToShow = 6;
    } else {
        slidesToShow = 4;
    }

    // Initialize Slick carousel if not on mobile
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
        $carousel.slick({
            infinite: true,
            slidesToShow: slidesToShow,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 10000,
        });
    } else {
        // Just add class so CSS knows it's ready
        $carousel.addClass("slick-initialized");
    }

    // Enable scroll wheel navigation on desktop
    if (window.innerWidth > 768) {
        let resumeTimer;

        $carousel.on("wheel", function (e) {
            e.preventDefault();

            $carousel.slick("slickPause"); // pause autoplay
            clearTimeout(resumeTimer); // clear any previous timers

            // Scroll direction
            if (e.originalEvent.deltaY < 0) {
                $carousel.slick("slickPrev");
            } else {
                $carousel.slick("slickNext");
            }

            // Resume autoplay after 5 seconds
            resumeTimer = setTimeout(() => {
                $carousel.slick("slickPlay");
            }, 5000);
        });
    }

    // Handle "Watch Trailer" button click
    $("#watch-trailer-btn").on("click", function () {
        if ($container.hasClass("d-none")) {
            // If hidden → show and load trailer
            if (currentTrailerUrl) {
                $frame.attr("src", currentTrailerUrl);
                $container.removeClass("d-none");

                $("html, body").animate(
                    {
                        scrollTop: $container.offset().top - 100,
                    },
                    600
                );
            }
        } else {
            // If already visible → hide and stop trailer
            $container.addClass("d-none");
            $frame.attr("src", "");
        }
    });

    // Search input listener
    $("#search-input").on("input", function () {
        const query = $(this).val().toLowerCase().trim();
        $suggestionsBox.empty();

        // Filter results based on query or show all if empty
        const results = query.length === 0 ? movieData : movieData.filter((movie) => movie.title.toLowerCase().includes(query));

        if (results.length > 0) {
            results.forEach((movie) => {
                $suggestionsBox.append(`
                    <div class="search-item" data-title="${movie.title}">
                        <img src="assets/img/${movie.poster}" alt="${movie.title}" />
                        <div>
                            <div class="title">${movie.title}</div>
                            <div class="meta">${movie.meta}</div>
                        </div>
                    </div>
                `);
            });
            $suggestionsBox.removeClass("d-none").addClass("show");
        } else {
            $suggestionsBox.removeClass("show").addClass("d-none");
        }
    });

    // Handle search result click
    $(document).on("click", ".search-item", function () {
        const selectedTitle = $(this).data("title");
        $("#search-input").val(selectedTitle);
        $suggestionsBox.addClass("d-none");

        // Find the movie data that matches the selected title
        const movie = movieData.find((m) => m.title === selectedTitle);
        if (!movie) return;

        currentTrailerUrl = movie.trailer;

        // Trigger overlay and hide trailer container
        $overlay.addClass("show");
        $container.addClass("d-none");
        $frame.attr("src", "");

        // Change movie info and background
        setTimeout(() => {
            $(".movie-hero-text h1").text(movie.title);
            $(".movie-hero-text .movie-meta").text(movie.meta);
            $(".movie-hero-text .movie-description").text(movie.description);

            $("body").css("background", `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('assets/img/${movie.slug}.jpg') no-repeat center center/cover`);
        }, 600);

        // Hide overlay after transition
        setTimeout(() => {
            $overlay.removeClass("show");
        }, 1000);
    });

    // Hide suggestions when clicking outside
    $(document).on("click", function (e) {
        if (!$(e.target).closest("#search-input, #search-suggestions").length) {
            $suggestionsBox.addClass("d-none");
        }
    });
});
