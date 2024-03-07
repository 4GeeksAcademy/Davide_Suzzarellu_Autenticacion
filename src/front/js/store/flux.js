const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			logged: false,
			user: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			setLogged: (value) =>{
				if (!value) {
                    localStorage.removeItem("accessToken");
                }
				setStore({ logged: value });	  
			},

			setUser: (value) => {
				setStore({ user: value})
			},

			getUser: async () => {
				const token = localStorage.getItem("accessToken");
				if (!token) {
					console.error("No access token found");
					return null;
				}
				const options = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
				const response = await fetch("https://studious-space-zebra-wr76g657jj4rf5xp9-3001.app.github.dev/api/protected", options);
				if (!response.ok) {
					console.error(`Error fetching protected data. HTTP Status: ${response.status}`);
					return null;
				}
				const data = await response.json();
				setStore({ user : data.user})
				getActions().setLogged(true)
				return data;
			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
