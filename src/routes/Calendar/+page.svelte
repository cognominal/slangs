<script>
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';

	let plugins = [TimeGrid];
	let options = {
		view: 'timeGridWeek',
		slotDuration: '00:30'
	};

	function updateOptions() {
		options.slotDuration = '01:00';
	}
</script>

<button on:click={updateOptions}>Change slot duration</button>
<Calendar {plugins} {options} />
