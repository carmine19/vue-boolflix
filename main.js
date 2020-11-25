var app = new Vue ({
    el: '#app',
    data: {
        cerca: '',
        films: [],
        serie: [],
        tutti_i_contenuti: [],
        lingua: ['it','br','ca','de','en','es','fr','hi','ja','ko','pt','ru','tr','zh'],
        grandezza_img:'w342'
    },
    methods: {
        cerco_film() {

            if (this.cerca.trim()) {
                axios.get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        api_key: '0d032082a99de17739cf29501eb868ad',
                        query: app.cerca,
                        language: 'it'
                    }
                })
                    .then((film) => {
                        this.films = film.data.results
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
                    });

                this.cerca = '';
            }
        }
    },
    mounted() {

            axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: '0d032082a99de17739cf29501eb868ad',
                    query: 'horror',
                    language: 'it'
                }
            })
            .then((risposta) => {
                for (let i = 0; i <risposta.data.results.length && i < 9 ; i++) {
                    let ele_corrente = risposta.data.results[i];

                    this.tutti_i_contenuti.push(ele_corrente)
                }

            });

    }











});