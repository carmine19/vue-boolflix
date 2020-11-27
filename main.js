var app = new Vue({
	el: '#app',
	data: {
		cerca: '',
		films: [],
		serie: [],
		tutti_i_contenuti: [],
		lingua: ['it', 'br', 'ca', 'de', 'en', 'es', 'fr', 'hi', 'ja', 'ko', 'pt', 'ru', 'tr', 'zh'],
		grandezza_img: 'w342',
		ricerca: false,
		load: false,
		scrolled: false,
		button: 'stop',
		icon_stop: 'far fa-stop-circle',
		audio_play: 'fas fa-volume-mute'
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
						this.tutti_i_contenuti = [...this.films, ...this.serie];
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
					for (let i = 0; i < risposta.data.results.length && i < 18; i++) {
						let ele_corrente = risposta.data.results[i];

						this.tutti_i_contenuti.push(ele_corrente)
					}

				});
		},

		tronco_stringa(str, num) {
			if (str.length > num) {
				return str.slice(0, num) + "...";
			} else {
				return str;
			}
		},

		autoplay() {
			var vid = document.getElementById("myVideo");
			if (vid.autoplay === true) {
				vid.autoplay = false
				this.button = 'stop'
				this.icon_stop = 'far fa-stop-circle'
				vid.load();
			} else if (vid.autoplay === false) {
				vid.autoplay = true
				this.button = 'riproduci'
				this.icon_stop = 'fas fa-play'
				vid.load();
			}
		},

		audio() {
			var vid = document.getElementById("myVideo");
			if (vid.muted === true) {
				vid.muted = false
				this.audio_play = 'fas fa-volume-up'
			} else if (vid.muted === false) {
				vid.muted = true
				this.audio_play = 'fas fa-volume-mute'
			}
		},

		isMobile() {
			if (screen.width <= 766) {
				return true;
			} else {
				return false;
			}
		},

		handleScroll() {
			this.scrolled = window.scrollY > 0;
		}

	},
	mounted() {
		this.load = true
		this.film_base()
		this.tronco_stringa(str, num)
		this.isMobile()
		this.audio()
	},

	created() {
		window.addEventListener('scroll', this.handleScroll);
	}

});