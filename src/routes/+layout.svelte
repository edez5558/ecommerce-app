<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<div></div>

		<div class="seccion">
			<h2>Servicio al cliente</h2>
			<ul>
				<li>Centro de Ayuda</li>
				<li>Reportar estafa</li>
				<li>Abrir caso</li>
				<li>Politicas y reglas</li>
			</ul>
		</div>

		<div class="seccion">
			<h2>Acerca</h2>
			<ul>
				<li>Acerca de Pir-Ata.com</li>
				<li>Terminos Legales</li>
			</ul>
		</div>

		<div class="seccion">
			<h2>Vender en Pir-Ata</h2>
			<ul>
				<li>Crear cuenta vendedor</li>
				<li>Centro de aprendizaje</li>
			</ul>
		</div>

		<div class="seccion">
			<h2>Servicios</h2>
			<ul>
				<li>Servicios de logistica</li>
			</ul>
		</div>


		<div></div>

	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		width: 100%;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: row;
		background-color: #454870;
		justify-content: center;
		align-items: flex-start;
		padding: 12px;
	}

	.seccion{
		height: 100%;
		color: white;
		border-right: 0.5em solid #9fa3da;
		padding: 0 0.5em;
	}

	div h2{
		font-weight: bold;
	}

	ul{
		padding: 0;
	}

	footer li {
		list-style-type: none;
		margin: 0.3em 0;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
