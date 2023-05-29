<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/logo.png';
	import profile from '$lib/images/profile.png';
</script>

<header>
	<div class="corner">
		<a href="/">
			<img src={logo} alt="SvelteKit" />
			<p> Pir-Ata.com</p>
		</a>
	</div>


	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a class="small-font" href="/">Inicio</a>
			</li>
			<li aria-current={$page.url.pathname === '/products/all?page=0' ? 'page' : undefined}>
				<a  class="small-font" href="/products/all?page=0">Productos</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner">
		<a href="/account">
			<img src={profile} alt="profile" class="profile-img"/>
		</a>
	</div>
</header>

<style>

	h2{
		text-align: center;
		background-color: red;
	}
	header {
		display: flex;
		justify-content: space-between;
		width: 100vw;
	}

	.corner {
		width: 15em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner p {
		padding-left: 1em;
		font-size: 1.2em;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}

  @media (max-width: 500px){
		a{
			font-size: 10px;
		}

		.small-font{
			font-size: 10px;
		}

		svg{
			width: 0;
			height: 0;
			margin: 0;
		}


	}
</style>
