<script>
	import '../app.css';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		ImagePlaceholder,
		Skeleton,
		TextPlaceholder
	} from 'flowbite-svelte';
</script>

<Navbar class="px-2 sm:px-4 py-2.5 w-full z-20 top-0 start-0 border-b">
	<NavBrand href="/">
		<!-- <img src="/images/flowbite-svelte-icon-logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Slangs</span>
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/About">About</NavLi>
		<NavLi href="https://github.com/cognominal/slangs">
			<img src="github-mark/github-mark.svg" class="me-3 h-3 sm:h-6" alt="Flowbite Logo" />
		</NavLi>
		<!-- <NavLi href="/docs/components/navbar">Navbar</NavLi> -->
		<!-- <NavLi href="/pricing">Pricing</NavLi>
      <NavLi href="/contact">Contact</NavLi> -->
	</NavUl>
</Navbar>
<div class="relative px-8">
	<slot />
</div>
