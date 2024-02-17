<script lang="ts">
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, ImagePlaceholder, Skeleton, TextPlaceholder } from 'flowbite-svelte';
    import {    Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';
    import { ChevronDownOutline } from 'flowbite-svelte-icons';
    import { page } from '$app/stores';
    import CodeMirror from 'svelte-codemirror-editor';
    import { Splitpanes, Pane } from 'svelte-splitpanes';
	  // import { Breadcrumb, BreadcrumbItem, Button } from 'flowbite-svelte';
	  // import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from 'flowbite-    
    $: activeUrl = $page.url.pathname;

    let parsedText: string;
    let parseTreeText: string;

    
  </script>
  <hr/>
  <Navbar>
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
  <div class="full-height">
    <Splitpanes horizontal={false}>
      <Pane minSize={15}><CodeMirror bind:value={parsedText} /></Pane>
      <Pane><CodeMirror bind:value={parseTreeText} /></Pane>
    </Splitpanes>
  </div>
  