<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">
<img width="1792" height="1024" alt="Repo_Logo" src="https://github.com/user-attachments/assets/2e11a863-8917-4c09-9a12-b34da3c87bea" />

# CMPS3390-PROJECT-2

<em>Empowering Seamless Innovation for Future-Ready Solutions</em>

<!-- BADGES -->
<img src="https://img.shields.io/github/last-commit/ChristianRodriguez46/CMPS3390-Project-2?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
<img src="https://img.shields.io/github/languages/top/ChristianRodriguez46/CMPS3390-Project-2?style=flat&color=0080ff" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/ChristianRodriguez46/CMPS3390-Project-2?style=flat&color=0080ff" alt="repo-language-count">

<em>Built with the tools and technologies:</em>

<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/Markdown-000000.svg?style=flat&logo=Markdown&logoColor=white" alt="Markdown">
<img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" alt="npm">
<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style=flat&logo=Autoprefixer&logoColor=white" alt="Autoprefixer">
<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat&logo=PostCSS&logoColor=white" alt="PostCSS">
<br>
<img src="https://img.shields.io/badge/Svelte-FF3E00.svg?style=flat&logo=Svelte&logoColor=white" alt="Svelte">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" alt="Vite">

</div>
<br>

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Testing](#testing)
- [Features](#features)
- [Project Structure](#project-structure)
    - [Project Index](#project-index)

---

## Overview

CMPS3390-Project-2 is a full-stack web application framework built with SvelteKit, TypeScript, and TailwindCSS, designed to facilitate the development of modern, scalable web apps. It emphasizes clean architecture, secure user management, and efficient data handling.

**Why CMPS3390-Project-2?**

This project aims to streamline the development of a library inventory system with features like user authentication, book management, and loan tracking. The core features include:

- 🛠️ **🔧 Configuration & Build:** Extends SvelteKit with strict TypeScript and JavaScript settings for consistent code quality.
- 🎨 **💅 Styling & UI:** Integrates TailwindCSS for responsive, maintainable front-end design.
- 🔐 **🔑 Authentication & Security:** Implements server-side user verification, secure cookies, and session management.
- 📦 **📚 Data Models:** Defines schemas and models for users, books, and loans, ensuring data integrity.
- ⚙️ **⚙️ Workflow Automation:** Provides commands for setup, testing, and deployment, simplifying the development lifecycle.
- 🗃️ **🗄️ Database Management:** Uses SQLite with seeded data for immediate usability and reliable data operations.

---

## Features

|      | Component            | Details                                                                                     |
| :--- | :------------------- | :------------------------------------------------------------------------------------------ |
| ⚙️  | **Architecture**     | <ul><li>Client-side rendered with Svelte</li><li>Uses Vite as build tool</li><li>Modular components with clear separation</li></ul> |
| 🔩 | **Code Quality**     | <ul><li>TypeScript for type safety</li><li>Consistent code style with ESLint (implied via dependencies)</li><li>Uses Svelte's reactive features for clean state management</li></ul> |
| 📄 | **Documentation**    | <ul><li>Basic README with project overview</li><li>Uses inline comments in code</li><li>Potential jsdoc annotations (not explicitly confirmed)</li></ul> |
| 🔌 | **Integrations**      | <ul><li>Tailwind CSS for styling</li><li>PostCSS for CSS processing</li><li>UUID for unique identifiers</li><li>Better-sqlite3 for database interactions</li><li>Bcryptjs for password hashing</li><li>Vite plugins for Svelte and Tailwind</li></ul> |
| 🧩 | **Modularity**        | <ul><li>Component-based architecture in Svelte</li><li>Separation of concerns between UI, logic, and data handling</li><li>Uses separate config files (jsconfig.json, package.json)</li></ul> |
| 🧪 | **Testing**           | <ul><li>Testing tools not explicitly listed; likely minimal or manual testing</li><li>Potential use of svelte-check for type and syntax validation</li></ul> |
| ⚡️  | **Performance**       | <ul><li>Vite provides fast hot module replacement</li><li>Tailwind CSS for optimized styling</li><li>Uses better-sqlite3 for efficient database access</li></ul> |
| 🛡️ | **Security**          | <ul><li>Bcryptjs for password hashing</li><li>Potential security considerations in database handling (not detailed)</li></ul> |
| 📦 | **Dependencies**      | <ul><li>Core: typescript, svelte, javascript, html</li><li>Build: vite, @sveltejs/vite-plugin-svelte, @sveltejs/adapter-auto</li><li>Styling: tailwindcss, postcss, autoprefixer</li><li>Utilities: uuid, bcryptjs, better-sqlite3</li></ul> |

---

## Project Structure

```sh
└── CMPS3390-Project-2/
    ├── README.md
    ├── doc.md
    ├── jsconfig.json
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── app.css
    │   ├── app.d.ts
    │   ├── app.html
    │   ├── controllers
    │   ├── hooks.server.js
    │   ├── lib
    │   ├── models
    │   └── routes
    ├── svelte.config.js
    └── vite.config.js
```

---

### Project Index

<details open>
	<summary><b><code>CMPS3390-PROJECT-2/</code></b></summary>
	<!-- __root__ Submodule -->
	<details>
		<summary><b>__root__</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ __root__</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/jsconfig.json'>jsconfig.json</a></b></td>
					<td style='padding: 8px;'>- Defines project-wide TypeScript and JavaScript configuration settings, ensuring consistent type checking, module resolution, and code quality across the codebase<br>- It extends the SvelteKit-specific configuration, facilitating seamless integration and development within the Svelte ecosystem while maintaining strict type safety and compatibility standards.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/README.md'>README.md</a></b></td>
					<td style='padding: 8px;'>- Facilitates the development and deployment of a web application by providing commands for setup, development, and production builds<br>- It ensures seamless installation of dependencies, local testing, and optimization for deployment, supporting the overall architecture of a modern, client-server web project built with Svelte<br>- This file streamlines the workflow from development to production readiness.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>- Defines the core configuration and dependencies for the library-inventory-tracker project, establishing the build, development, and testing workflows<br>- It ensures seamless integration of SvelteKit, TailwindCSS, and TypeScript, while managing essential runtime libraries like bcryptjs, better-sqlite3, and uuid<br>- This setup supports a scalable, modular architecture for tracking and managing inventory data efficiently.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/vite.config.js'>vite.config.js</a></b></td>
					<td style='padding: 8px;'>- Configures the build environment for a SvelteKit project integrated with Tailwind CSS, ensuring seamless styling and development workflows<br>- It orchestrates the Vite bundler to incorporate essential plugins, facilitating efficient development and optimized production builds within the overall architecture<br>- This setup supports a modern, responsive, and maintainable front-end framework.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/doc.md'>doc.md</a></b></td>
					<td style='padding: 8px;'>- Defines the core data structures and database schema for managing users, books, and loan relationships within the library inventory system<br>- Facilitates persistent storage, user authentication, and book loan tracking, forming the backbone for data operations across the application’s features such as browsing, borrowing, and user profile management.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/svelte.config.js'>svelte.config.js</a></b></td>
					<td style='padding: 8px;'>- Defines the SvelteKit project configuration, orchestrating the build process and environment setup<br>- It specifies preprocessing tools for styling and component handling, selects the deployment adapter, and establishes path aliases for streamlined module imports<br>- This configuration ensures a flexible, organized, and environment-aware architecture supporting scalable development and deployment workflows.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- src Submodule -->
	<details>
		<summary><b>src</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ src</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/app.d.ts'>app.d.ts</a></b></td>
					<td style='padding: 8px;'>- Defines global TypeScript interfaces for SvelteKit to enhance type safety and IntelliSense<br>- It specifies the structure of server-side local data, particularly user information, and the data returned to pages and layouts<br>- This setup ensures consistent handling of user context across the application, supporting robust development and improved developer experience within the overall architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/hooks.server.js'>hooks.server.js</a></b></td>
					<td style='padding: 8px;'>- Establishes user authentication context by retrieving and verifying user information based on cookie data during server-side request handling<br>- Integrates user data into the request lifecycle, enabling personalized and secure interactions across the application<br>- This middleware ensures user state is consistently available throughout the server-side processing within the overall architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/app.html'>app.html</a></b></td>
					<td style='padding: 8px;'>- Defines the foundational HTML structure for the web application, establishing the document type, language, metadata, and linking essential assets<br>- It integrates SvelteKits dynamic head and body content, ensuring seamless rendering and hydration of the app across devices<br>- Serves as the core template that orchestrates the overall layout and initial load behavior within the project architecture.</td>
				</tr>
			</table>
			<!-- controllers Submodule -->
			<details>
				<summary><b>controllers</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.controllers</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/controllers/auth.controller.js'>auth.controller.js</a></b></td>
							<td style='padding: 8px;'>- Provides core authentication logic, enabling user registration and login processes by validating inputs, managing password security through hashing, and interfacing with user data models<br>- Facilitates secure user account creation and credential verification, serving as the backbone for authentication workflows within the overall application architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/controllers/loan.controller.js'>loan.controller.js</a></b></td>
							<td style='padding: 8px;'>- Provides core loan management functionalities by validating user and book identifiers, delegating business logic to models for checking out and returning books, and retrieving active loans for users<br>- Facilitates seamless integration between user interactions and underlying data operations, ensuring proper validation and error handling within the librarys loan workflow.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/controllers/book.controller.js'>book.controller.js</a></b></td>
							<td style='padding: 8px;'>- Provides a streamlined interface for managing book data by normalizing inputs, selecting appropriate model functions, and handling errors<br>- Facilitates listing all books, filtering the library with various criteria, and retrieving individual book details, thereby serving as a crucial layer that connects user requests with underlying data operations within the overall architecture.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- models Submodule -->
			<details>
				<summary><b>models</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.models</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/models/user.model.js'>user.model.js</a></b></td>
							<td style='padding: 8px;'>- Defines the user data access layer, handling all database interactions related to user information<br>- Facilitates user creation, retrieval, and validation by providing functions for inserting new users, fetching user details by ID, username, or email, and verifying credentials during login<br>- Ensures consistent data shapes and isolates database logic from application controllers, supporting a clean, maintainable architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/models/book.model.js'>book.model.js</a></b></td>
							<td style='padding: 8px;'>- Provides core data retrieval functions for the library system, enabling fetching all books, filtering by title, author, or genres, and retrieving individual books by ID<br>- Facilitates seamless integration between the database and user interface by standardizing data formats and supporting complex filtering logic within the overall application architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/models/loan.model.js'>loan.model.js</a></b></td>
							<td style='padding: 8px;'>- Provides core database interactions for managing book loans within the application<br>- Facilitates checking loan status, processing checkouts and returns, retrieving active loans for users, and maintaining overall loan data integrity<br>- Serves as the central data layer ensuring consistent and simplified access to loan-related information across the system.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- routes Submodule -->
			<details>
				<summary><b>routes</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.routes</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/routes/+page.server.js'>+page.server.js</a></b></td>
							<td style='padding: 8px;'>- Establishes initial navigation flow by redirecting users from the root URL to the authentication page, ensuring users land on the login or sign-up interface first<br>- This setup guides the user experience and prepares the application for future enhancements, such as redirecting authenticated users directly to the dashboard, aligning with the overall routing and user onboarding architecture.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/routes/+layout.svelte'>+layout.svelte</a></b></td>
							<td style='padding: 8px;'>- Defines the root layout for the application, establishing the overall page structure and styling with Tailwind CSS<br>- It manages the rendering of nested route content, serving as the foundational component that orchestrates the display of different pages within the app<br>- This layout ensures a consistent visual framework while allowing dynamic content to be injected based on routing.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/routes/+page.svelte'>+page.svelte</a></b></td>
							<td style='padding: 8px;'>- Facilitates initial routing logic by serving as a placeholder for the root URL, which immediately redirects users to the authentication page<br>- Ensures seamless navigation flow within the application architecture, maintaining a clean separation between the root route and authentication process, and supporting the overall user onboarding experience.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/routes/+layout.server.js'>+layout.server.js</a></b></td>
							<td style='padding: 8px;'>- Facilitates user data propagation across the applications layout by providing user authentication status during each request<br>- Integrates seamlessly into the overall architecture to ensure consistent user context, enabling personalized experiences and future authentication enhancements within the server-rendered framework.</td>
						</tr>
					</table>
					<!-- logout Submodule -->
					<details>
						<summary><b>logout</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.routes.logout</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/routes/logout/+server.js'>+server.js</a></b></td>
									<td style='padding: 8px;'>- Handles user logout by deleting the authentication cookie and redirecting to the login page, ensuring secure session termination within the applications architecture<br>- Integrates seamlessly with the authentication flow, maintaining a clear separation of concerns and supporting a smooth user experience across the overall system.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- (app) Submodule -->
					<details>
						<summary><b>(app)</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.routes.(app)</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/routes/(app)/+layout.svelte'>+layout.svelte</a></b></td>
									<td style='padding: 8px;'>- Establishes the primary layout for authenticated sections of the application, providing a consistent user interface with a header and footer across protected routes such as dashboard, books, and settings<br>- It manages the rendering of nested page content within this layout, ensuring a cohesive experience for logged-in users while excluding public routes like authentication pages.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/routes/(app)/+layout.server.js'>+layout.server.js</a></b></td>
									<td style='padding: 8px;'>- Enforces user authentication by redirecting unauthenticated users to the login page, ensuring secure access to protected routes within the application<br>- Integrates seamlessly into the overall architecture by managing user session validation at the layout level, thereby maintaining consistent access control across the applications protected sections.</td>
								</tr>
							</table>
							<!-- book Submodule -->
							<details>
								<summary><b>book</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.routes.(app).book</b></code>
									<!-- [id] Submodule -->
									<details>
										<summary><b>[id]</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ src.routes.(app).book.[id]</b></code>
											<table style='width: 100%; border-collapse: collapse;'>
											<thead>
												<tr style='background-color: #f8f9fa;'>
													<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
													<th style='text-align: left; padding: 8px;'>Summary</th>
												</tr>
											</thead>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/routes/(app)/book/[id]/+page.server.js'>+page.server.js</a></b></td>
													<td style='padding: 8px;'>- Facilitates book detail retrieval and manages user interactions for checking out and returning books within the application<br>- It determines the availability and loan status of a specific book, enabling appropriate UI actions, and handles server-side processing of checkout and check-in requests to maintain accurate loan records.</td>
												</tr>
												<tr style='border-bottom: 1px solid #eee;'>
													<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/routes/(app)/book/[id]/+page.svelte'>+page.svelte</a></b></td>
													<td style='padding: 8px;'>- Displays detailed information about a specific book, including cover image, title, author, genres, and abstract, within the library management system<br>- Facilitates user interactions for checking out or returning the book, updating the interface dynamically based on user actions and system responses<br>- Integrates seamlessly into the broader application architecture to support book management workflows.</td>
												</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<!-- books Submodule -->
							<details>
								<summary><b>books</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.routes.(app).books</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/routes/(app)/books/+page.server.js'>+page.server.js</a></b></td>
											<td style='padding: 8px;'>- Handles server-side logic for the books page by processing URL filters, retrieving filtered or complete book lists, and computing user-specific loan action flags<br>- Facilitates book search, filtering, and loan management, integrating user authentication and loan state to support an interactive library interface within the overall application architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/routes/(app)/books/+page.svelte'>+page.svelte</a></b></td>
											<td style='padding: 8px;'>- Displays a comprehensive library view by integrating filtering options and a responsive grid of book cards, showcasing titles, authors, genres, and abstracts<br>- Connects to server-provided data to present an organized, user-friendly interface for browsing and discovering books within the application’s architecture.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- settings Submodule -->
							<details>
								<summary><b>settings</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.routes.(app).settings</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/routes/(app)/settings/+page.server.js'>+page.server.js</a></b></td>
											<td style='padding: 8px;'>- Facilitates user profile updates by handling form submissions to modify specific user data fields<br>- Integrates with the broader settings management system to ensure seamless, server-side processing of user-initiated changes, maintaining data consistency and integrity within the applications architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/routes/(app)/settings/+page.svelte'>+page.svelte</a></b></td>
											<td style='padding: 8px;'>- Provides a user interface for updating account settings within the Library Tracker application<br>- It enables users to select specific profile options such as username, email, or password, and submit new values<br>- This component integrates into the broader user management system, facilitating seamless profile customization and ensuring user preferences are easily modifiable.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- dashboard Submodule -->
							<details>
								<summary><b>dashboard</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.routes.(app).dashboard</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/routes/(app)/dashboard/+page.server.js'>+page.server.js</a></b></td>
											<td style='padding: 8px;'>- Fetches user-specific loan data during server-side page rendering to support personalized dashboard views<br>- Integrates with the loan controller to retrieve current loan information based on the authenticated users ID, enabling dynamic content delivery and enhancing user experience within the applications architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/routes/(app)/dashboard/+page.svelte'>+page.svelte</a></b></td>
											<td style='padding: 8px;'>- Provides a user-centric dashboard interface for a library tracking application, enabling users to view their current loans, access the full library catalog, and modify account settings<br>- It dynamically displays a list of borrowed books upon interaction, integrating key navigation and personalized content to enhance user engagement within the overall application architecture.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- (public) Submodule -->
					<details>
						<summary><b>(public)</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.routes.(public)</b></code>
							<!-- auth Submodule -->
							<details>
								<summary><b>auth</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.routes.(public).auth</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/routes/(public)/auth/+page.server.js'>+page.server.js</a></b></td>
											<td style='padding: 8px;'>- Defines server-side authentication actions for user registration and login, managing form data processing, credential verification, and session management via secure cookies<br>- Facilitates secure user onboarding and authentication flow within the application, enabling seamless transition to protected areas like the dashboard while maintaining session security and integrity.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/routes/(public)/auth/+page.svelte'>+page.svelte</a></b></td>
											<td style='padding: 8px;'>- Provides a user authentication interface for the Library Tracker application, enabling users to seamlessly switch between login and signup modes<br>- Manages form state, displays relevant success or error messages, and maintains input persistence, thereby supporting secure and user-friendly account access within the overall application architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/routes/(public)/auth/+server.js'>+server.js</a></b></td>
											<td style='padding: 8px;'>- Handles user logout by deleting the uid cookie and redirecting to the authentication page<br>- Integrates with the overall authentication flow, ensuring secure session termination and seamless user experience within the application's routing architecture<br>- This server-side logic maintains session integrity and supports user authentication management across the platform.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<!-- lib Submodule -->
			<details>
				<summary><b>lib</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.lib</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/lib/db.js'>db.js</a></b></td>
							<td style='padding: 8px;'>- The <code>src/lib/db.js</code> file establishes and manages the applications core database layer for the library system<br>- It initializes a SQLite database, creating the necessary storage and tables upon first run, and enforces data integrity through foreign key constraints<br>- Additionally, it seeds essential data such as an administrative user and initial book and genre records, facilitating immediate usability<br>- This module serves as the foundational data access point, enabling consistent and reliable interactions with the database across the entire codebase.</td>
						</tr>
					</table>
					<!-- components Submodule -->
					<details>
						<summary><b>components</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.lib.components</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/lib/components/Header.svelte'>Header.svelte</a></b></td>
									<td style='padding: 8px;'>- Provides a responsive, accessible header component that facilitates navigation across the application<br>- It dynamically highlights active links, adapts layout for desktop and mobile views, and manages menu toggling and route changes seamlessly<br>- Enhances user experience by ensuring consistent navigation, branding, and user greeting, forming a central part of the applications overall architecture and user interface.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/lib/components/Footer.svelte'>Footer.svelte</a></b></td>
									<td style='padding: 8px;'>- Provides a footer component that enhances user navigation and interaction by linking to the projects GitHub repository and offering a logout button<br>- It maintains consistent styling and layout across the application, contributing to a cohesive user interface and facilitating easy access to project resources and session management within the overall architecture.</td>
								</tr>
							</table>
							<!-- books Submodule -->
							<details>
								<summary><b>books</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.lib.components.books</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/lib/components/books/Filter.svelte'>Filter.svelte</a></b></td>
											<td style='padding: 8px;'>- Provides a user interface for filtering books based on title, author, and genres, with options to specify genre matching criteria<br>- Integrates into the overall application to enable dynamic search capabilities, enhancing user experience by allowing precise content discovery within the book collection<br>- Facilitates seamless interaction between user inputs and backend data queries.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='https://github.com/ChristianRodriguez46/CMPS3390-Project-2/blob/master/src/lib/components/books/Library.svelte'>Library.svelte</a></b></td>
											<td style='padding: 8px;'>- Provides a dynamic, user-friendly interface for browsing and managing a collection of books<br>- Enables seamless checkout and check-in actions with real-time UI updates, error handling, and visual cues<br>- Facilitates an engaging experience by displaying book details, cover images, and genre information, supporting efficient library management within the overall application architecture.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---

## Getting Started

### Prerequisites

This project requires the following dependencies:

- **Programming Language:** JavaScript
- **Package Manager:** Npm

### Installation

Build CMPS3390-Project-2 from the source and install dependencies:

1. **Clone the repository:**

    ```sh
    ❯ git clone https://github.com/bestrada134/CMPS3390-Project-2.git
    ```

2. **Navigate to the project directory:**

    ```sh
    ❯ cd CMPS3390-Project-2
    ```

3. **Install the dependencies:**

**Using [npm](https://www.npmjs.com/):**

```sh
❯ npm install
```

### Usage

Run the project with:

**Using [npm](https://www.npmjs.com/):**

```sh
npm run dev
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

---

<div align="left"><a href="#top">⬆ Return</a></div>

---
