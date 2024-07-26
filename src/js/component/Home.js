import React, { useEffect, useState } from "react";

const Home = () => {
	const [todos, setTodos] = useState([]);
	const count = todos.length
	const [hoverMouse, setHoverMouse] = useState(null);
	const urlTodosAPI = "https://playground.4geeks.com/todo"

	useEffect(() => {
			newList();
			createUser();
	}, []);

	function newList() {
		fetch(urlTodosAPI + "/users/SilviaMoraga", {
			method: "GET",
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				setTodos(data.todos || []);
			})
			.catch(err => console.error(err));
	}

	function addTodo(newTodo) {
		fetch(urlTodosAPI + "/todos/SilviaMoraga", {
			method: "POST",
			body: JSON.stringify({
				"label": newTodo,
				"is_done": false
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				newList();
			})
			.catch(err => console.error(err));
	}

	function deleteTodos(id) {
		fetch(urlTodosAPI + "/todos/" + id, {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => {
				if (response.ok) {
					newList();
					response.json();
				}
			})
			.then((data) => {
				console.log(data);
			})
			.catch(err => console.error(err));
	};

	function deleteTodosTodos() {
		fetch(urlTodosAPI + "/users/SilviaMoraga", {
			method: "DELETE",
		})
			.then(response => {
				if (response.ok) {
					createUser();
					newList();
				}
				response.json();
			})
			.then((data) => {
				console.log(data);
				setTodos([]);
			})
			.catch(err => console.error(err));

	}

	function createUser() {
		fetch(urlTodosAPI + "/users/SilviaMoraga", {
			method: "POST",
			body: JSON.stringify({}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
			})
			.catch(err => console.error(err));
	}

	return (
		<>
			<div className="text-center container mt-5">
				<div className="mb-3">
					<h2 className="form-label" style={{ marginBottom: '15px' }}>Daily Tasks</h2>
					<button className="btn btn-danger mb-3" onClick={() => deleteTodosTodos()}>Delete todos</button>
					<input className="form-control" id="inputTodos"
						placeholder="What needs to be done?"
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								addTodo(e.target.value);
								e.target.value = '';
							}
						}} />

					<ul className="list-group shadow">
						{todos.map((todo, index) => {
							return (
								<li className="list-group-item d-flex justify-content-between align-items-center" key={index}
									onMouseEnter={() => setHoverMouse(todo)}
									onMouseLeave={() => setHoverMouse(null)}>
									{todo.label}
									<i className="fa-solid fa-xmark" style={{ border: 'none', background: 'none', color: hoverMouse === todo ? 'black' : 'white' }}
										onClick={() => deleteTodos(todo.id)}
									/>
								</li >
							)
						})}
						<div className="list-group-item d-flex align-items-start">
							<p className="fw-light"> {count? count : 0} task{count ? (count != 1 ? 's' : '') : ''}</p>
						</div>
					</ul>
				</div>
			</div>

			<div className="container position-absolute bottom-0">
				<footer className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4">
					<p>&copy; Made by Silvia Moraga with <i className="fa-regular fa-heart" style={{ color: '#eaa9de' }} /> !  2024</p>
				</footer>
			</div>

		</>
	);
};

export default Home;
