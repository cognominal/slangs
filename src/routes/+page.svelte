<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, ImagePlaceholder, Skeleton, TextPlaceholder } from 'flowbite-svelte';
    import {    Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
    import { ChevronDownOutline } from 'flowbite-svelte-icons';
    import { page } from '$app/stores';
    $: activeUrl = $page.url.pathname;

    
  </script>
  
  <div class="relative px-8">
    <div style="height:300px;" class="overflow-scroll pb-16">
      <Skeleton class="mt-16 mb-8" />
      <ImagePlaceholder class="my-8" />
      <TextPlaceholder class="my-8" />
    </div>
  </div>

  
  <Navbar>
    <NavBrand href="/">
      <img src="/images/flowbite-svelte-icon-logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span>
    </NavBrand>
    <NavHamburger />
    <NavUl {activeUrl}>
      <NavLi href="/">Home</NavLi>
      <NavLi class="cursor-pointer">
        Dropdown<ChevronDownOutline class="w-3 h-3 ms-2 text-primary-800 dark:text-white inline" />
      </NavLi>
      <Dropdown class="w-44 z-20">
        <DropdownItem href="/">Dashboard</DropdownItem>
        <DropdownItem href="/docs/components/navbar">Settings</DropdownItem>
        <DropdownItem href="/">Earnings</DropdownItem>
        <DropdownDivider />
        <DropdownItem href="/">Sign out</DropdownItem>
      </Dropdown>
      <NavLi href="/settings">Setting</NavLi>
      <NavLi href="/pricing">Pricing</NavLi>
      <NavLi href="/contact">Contact</NavLi>
    </NavUl>
  </Navbar>