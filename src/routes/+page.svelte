
<svelte:head>
	<title>Quick Contact</title>
</svelte:head>

<div id="quickcontact-main">
	<p id="label">Quick Contact</p>

	<input
		id="email-input"
		type="email"
		placeholder="Your email"
	/>

	<textarea
		id="textarea-input"
		placeholder="Message must be longer than 10 words and shorter than 5000 words, you can send 1 message per minute"
	></textarea>

	<button id="send-button">Send</button>
</div>

<script lang="ts">
	import { onMount } from "svelte";
	import { initSender } from "../scripts/sender";

	onMount(() => {
		initSender();
	});
</script>

<style>
	:global(body) {
		background-color: rgb(61, 61, 61);
		font-family:
			Inter,
			-apple-system,
			BlinkMacSystemFont,
			"Segoe UI",
			Roboto,
			Helvetica,
			Arial,
			sans-serif;
		font-weight: 400;
		color: white;
		margin: 0;
	}

	#quickcontact-main {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		margin-top: 5vh;
	}

	#label {
		font-size: 2.8rem;
		font-weight: 600;
		letter-spacing: -0.03em;
		margin: 0 0 2rem 0;
		text-align: center;
	}

	#email-input {
		width: min(80%, 700px);
		height: 45px;
		padding: 0 1rem;
		box-sizing: border-box;
		margin-top: 5vh;
		margin-bottom: 1.5rem;

		border: none;
		border-radius: 8px;
		outline: none;

		background-color: rgb(45, 45, 45);
		color: white;

		font-family: inherit;
		font-size: 1rem;
		font-weight: 400;

		transition: outline 0.2s ease;
	}

	#email-input:focus {
		outline: 2px solid rgb(100, 150, 255);
	}

	#email-input::placeholder {
		color: rgb(160, 160, 160);
	}

	textarea {
		width: min(80%, 700px);
		height: 50vh;
		padding: 1rem;
		box-sizing: border-box;

		border: none;
		border-radius: 12px;
		outline: none;

		background-color: rgb(45, 45, 45);
		color: white;

		font-family: inherit;
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;

		resize: none;

		transition: outline 0.2s ease;
	}

	textarea:focus {
		outline: 2px solid rgb(100, 150, 255);
	}

	textarea::placeholder {
		color: rgb(160, 160, 160);
	}

	#send-button {
		margin-top: 2rem;
		padding: 0.8rem 2rem;

		border: none;
		border-radius: 8px;

		background-color: rgb(245, 165, 60);
		color: white;

		font-family: inherit;
		font-size: 1rem;
		font-weight: 600;

		cursor: pointer;

		transition:
			transform 0.2s ease,
			background-color 0.2s ease,
			color 0.2s ease;
	}

	#send-button:hover {
		background-color: white;
		color: rgb(245, 165, 60);
	}

	#send-button:active {
		transform: translateY(0);
	}
</style>