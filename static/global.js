console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}

// navLinks=$$("nav a");
// let currentLink = navLinks.find(a => a.host === location.host && a.pathname === location.pathname);
// currentLink?.classList.add("current");

// let pages = [
// 	{url: "", title: "Home"},
// 	{url: "contact/", title: "Contact"},
// 	{url: "projects/", title: "Projects"},
// 	{url: "resume/", title: "Resume"},
// 	{url: "https://github.com/olinaliva", title: "GitHub"},
// ];

// let nav = document.createElement("nav");
// document.body.prepend(nav);

// const ARE_WE_HOME = document.documentElement.classList.contains("home");

// for (let p of pages) {
// 	let url = p.url;
// 	let title = p.title;
// 	//url = !ARE_WE_HOME && !url.startsWith("http") ? ".." + url : url;
// 	//nav.insertAdjacentHTML("beforeend", `<a href="${ url }">${ title }</a>` );
// 	let a = document.createElement("a");
// 	a.href = url;
// 	a.textContent = title;
// 	nav.append(a);

// 	if (a.host === location.host && a.pathname === location.pathname) {
// 		a.classList.add("current");
// 	}
// 	if (a.host != location.host) {
// 		a.target = "_blank"
// 	}
// }

// document.body.insertAdjacentHTML("afterbegin", `
// 	<label class="color-scheme">
// 		Theme:
// 		<select>
// 		<option value="light dark">automatic</option>
// 		<option value="light">light</option>
// 		<option value="dark">dark</option>
// 		</select>
// 	</label>`
// );

// let select=document.querySelector("select")

// select.addEventListener("input", function (event) {
// 	console.log("color scheme changed to", event.target.value);
// 	document.documentElement.style.setProperty("color-scheme", event.target.value);
// 	localStorage.colorScheme = event.target.value
// });

if ("colorScheme" in localStorage) {
document.documentElement.style.setProperty("color-scheme", localStorage.colorScheme);
}