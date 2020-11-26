var app = new Vue ({
    el: '#app',
    data: {
        cerca: '',
        films: [],
        serie: [],
        tutti_i_contenuti: [],
        lingua: ['it','br','ca','de','en','es','fr','hi','ja','ko','pt','ru','tr','zh'],
        grandezza_img:'w342',
        ricerca: false,
        load: false,
    },
    methods: {

        cerco_film() {

            if (this.cerca.trim()) {

                this.ricerca = true;

                axios.get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        api_key: '0d032082a99de17739cf29501eb868ad',
                        query: app.cerca,
                        language: 'it'
                    }
                })
                    .then((film) => {
                        this.films = film.data.results
                        this.ricerca = false;
                    });

                //serie tv
                axios.get('https://api.themoviedb.org/3/search/tv', {
                    params: {
                        api_key: '0d032082a99de17739cf29501eb868ad',
                        query: app.cerca,
                        language: 'it'
                    }
                })
                    .then((serie) => {
                        this.serie = serie.data.results;
                        this.tutti_i_contenuti = [...this.films,...this.serie];
                        this.ricerca = false;
                    });

                this.cerca = '';
            }
        },

        film_base() {
            axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: '0d032082a99de17739cf29501eb868ad',
                    query: 'fantasy',
                    language: 'it'
                }
            })
            .then((risposta) => {
                for (let i = 0; i <risposta.data.results.length && i < 18 ; i++) {
                    let ele_corrente = risposta.data.results[i];

                    this.tutti_i_contenuti.push(ele_corrente)
                }

            });
        },

        tronco_stringa(str, num) {
          if(str.length > num) {
            return str.slice(0, num) + "...";
          } else {
            return str;
          }
        },

        scrollFunction() {

            let scrollpos = window.scrollY
              const header = document.getElementById("nav")
              const header_height = header.offsetHeight

              const add_class_on_scroll = () => header.classList.add("fade-in")
              const remove_class_on_scroll = () => header.classList.remove("fade-in")

              window.addEventListener('scroll', function() {
                scrollpos = window.scrollY;

                if (scrollpos >= header_height) { add_class_on_scroll() }
                else { remove_class_on_scroll() }

                console.log(scrollpos)
              })
        },

    },
    mounted() {
        this.load = true
        this.film_base()
        this.tronco_stringa(str, num)
        this.scrollFunction()


    }











});